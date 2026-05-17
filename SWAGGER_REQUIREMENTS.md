# Swagger/OpenAPI Specification Requirements

This document defines all endpoints that the backend must implement for the frontend application to operate correctly. The frontend uses environment-driven mock/backend switching at the repository layer, so all endpoint contracts must match these specifications exactly for seamless integration.

---

## Table of Contents

1. [Response Envelope Format](#response-envelope-format)
2. [Authentication API](#authentication-api)
3. [Courses API](#courses-api)
4. [FAQ API](#faq-api)
5. [Dashboard API](#dashboard-api)
6. [Notifications API](#notifications-api)
7. [Profile API](#profile-api)
8. [Teachers API](#teachers-api)
9. [Students API](#students-api)
10. [Attendance API](#attendance-api)
11. [Error Handling](#error-handling)
12. [RBAC Roles & Permissions](#rbac-roles--permissions)

---

## Response Envelope Format

**ALL API responses must follow this standardized envelope format** for consistency with the frontend's `ApiResponse<T>` contract:

```json
{
  "success": boolean,
  "data": T | null,
  "pagination": {
    "page": number,
    "pageSize": number,
    "total": number,
    "totalPages": number
  },
  "meta": {
    "traceId": string,
    "timestamp": string,
    [key: string]: any
  },
  "errors": [
    {
      "code": string,
      "field": string | null,
      "message": string
    }
  ]
}
```

### Response Rules

- **success**: `true` when HTTP 2xx, `false` when 4xx/5xx
- **data**: The actual response payload (null on error)
- **pagination**: Only include for list endpoints; omit for single-record endpoints
- **meta**: Always include `traceId` (UUID) and `timestamp` (ISO 8601); use for debugging
- **errors**: Empty array on success; populate with detailed error info on failure

### Example Success Response (List)

```json
{
  "success": true,
  "data": [
    { "id": 1, "title": "React Basics" }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 50,
    "totalPages": 5
  },
  "meta": {
    "traceId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-05-17T10:30:00Z"
  },
  "errors": []
}
```

### Example Success Response (Single Record)

```json
{
  "success": true,
  "data": { "id": 1, "email": "user@example.com", "role": "student" },
  "meta": {
    "traceId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-05-17T10:30:00Z"
  },
  "errors": []
}
```

### Example Error Response

```json
{
  "success": false,
  "data": null,
  "meta": {
    "traceId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-05-17T10:30:00Z"
  },
  "errors": [
    {
      "code": "INVALID_EMAIL",
      "field": "email",
      "message": "Email format is invalid"
    },
    {
      "code": "PASSWORD_TOO_SHORT",
      "field": "password",
      "message": "Password must be at least 8 characters"
    }
  ]
}
```

---

## Authentication API

### Common Types

```typescript
AuthUser {
  id: string (UUID)
  fullName: string
  email: string
  avatarUrl: string (URL)
  authMethod: "email" | "github"
  isVerified: boolean
  role?: "admin" | "teacher" | "student" | "parent"
  permissions?: ("manage_students" | "manage_teachers" | "view_dashboard" | "manage_attendance" | "manage_courses" | "manage_notifications")[]
}

AuthSessionSnapshot {
  user: AuthUser
  accessToken: string (JWT, HS256/RS256)
  refreshToken?: string (JWT)
  expiresAt: number (Unix timestamp, seconds)
}
```

### POST /auth/login

**Purpose**: Authenticate user with email and password

**Authentication**: No (public endpoint)

**Request Body**:
```json
{
  "email": "user@example.com",
  "password": "hashedPassword123"
}
```

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "message": "Login successful",
    "session": {
      "user": {
        "id": "uuid-1",
        "fullName": "John Doe",
        "email": "user@example.com",
        "avatarUrl": "https://example.com/avatar.jpg",
        "authMethod": "email",
        "isVerified": true,
        "role": "teacher",
        "permissions": ["view_dashboard", "manage_attendance", "manage_courses"]
      },
      "accessToken": "eyJhbGciOiJIUzI1NiIs...",
      "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
      "expiresAt": 1716031200
    }
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **400 Bad Request**: Missing email/password fields
  - Code: `MISSING_CREDENTIALS`
- **401 Unauthorized**: Invalid email or password
  - Code: `INVALID_CREDENTIALS`
- **403 Forbidden**: User not verified
  - Code: `USER_NOT_VERIFIED`

---

### POST /auth/register

**Purpose**: Register new user with email and password

**Authentication**: No (public endpoint)

**Request Body**:
```json
{
  "fullName": "John Doe",
  "email": "newuser@example.com",
  "password": "SecurePassword123!",
  "confirmPassword": "SecurePassword123!"
}
```

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "message": "Registration successful. OTP sent to email.",
    "verificationId": "verify-uuid-123",
    "expiresAt": 1716031200,
    "debugOtp": "123456"
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **400 Bad Request**: Validation errors
  - Code: `INVALID_EMAIL` (field: "email")
  - Code: `PASSWORD_TOO_SHORT` (field: "password", min 8 chars)
  - Code: `PASSWORDS_MISMATCH` (field: "confirmPassword")
  - Code: `INVALID_FULLNAME` (field: "fullName")
- **409 Conflict**: Email already registered
  - Code: `EMAIL_ALREADY_EXISTS`

---

### POST /auth/verify-otp

**Purpose**: Verify OTP code sent during registration or login

**Authentication**: No (public endpoint)

**Request Body**:
```json
{
  "email": "newuser@example.com",
  "code": "123456",
  "verificationId": "verify-uuid-123",
  "purpose": "register"
}
```

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "message": "OTP verified successfully",
    "user": {
      "id": "uuid-2",
      "fullName": "John Doe",
      "email": "newuser@example.com",
      "avatarUrl": "",
      "authMethod": "email",
      "isVerified": true,
      "role": "student",
      "permissions": ["view_dashboard"]
    }
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **400 Bad Request**: Invalid OTP
  - Code: `INVALID_OTP`
- **401 Unauthorized**: OTP expired
  - Code: `OTP_EXPIRED`
- **404 Not Found**: Verification not found
  - Code: `VERIFICATION_NOT_FOUND`

---

### POST /auth/refresh-session

**Purpose**: Refresh access token using refresh token

**Authentication**: Optional (can pass old session in body)

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-1",
      "fullName": "John Doe",
      "email": "user@example.com",
      "avatarUrl": "https://example.com/avatar.jpg",
      "authMethod": "email",
      "isVerified": true,
      "role": "teacher",
      "permissions": ["view_dashboard", "manage_attendance", "manage_courses"]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": 1716031200
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **401 Unauthorized**: Invalid or expired refresh token
  - Code: `INVALID_REFRESH_TOKEN`

---

### GET /auth/session

**Purpose**: Get current user session from server (for page reloads)

**Authentication**: Bearer token required (Authorization header)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-1",
      "fullName": "John Doe",
      "email": "user@example.com",
      "avatarUrl": "https://example.com/avatar.jpg",
      "authMethod": "email",
      "isVerified": true,
      "role": "teacher",
      "permissions": ["view_dashboard", "manage_attendance", "manage_courses"]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": 1716031200
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **401 Unauthorized**: Missing or invalid token
  - Code: `UNAUTHORIZED`

---

### POST /auth/restore-session

**Purpose**: Restore session from stored credentials (on app startup)

**Authentication**: Optional (cookie or Authorization header)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "user": { ... },
    "accessToken": "...",
    "refreshToken": "...",
    "expiresAt": 1716031200
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **401 Unauthorized**: No valid session found
  - Code: `NO_SESSION`

---

### POST /auth/logout

**Purpose**: Invalidate current session

**Authentication**: Bearer token required

**Response** (`success: true`):
```json
{
  "success": true,
  "data": { "message": "Logout successful" },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /auth/revoke-session

**Purpose**: Revoke all active sessions for user (security feature)

**Authentication**: Bearer token required

**Response** (`success: true`):
```json
{
  "success": true,
  "data": { "message": "All sessions revoked" },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /auth/prepare-session-rotation

**Purpose**: Prepare for session token rotation (multi-device security)

**Authentication**: Bearer token required

**Request Body**:
```json
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
}
```

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "refreshToken": "eyJhbGciOiJIUzI1NiIs..."
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### GET /auth/github/callback

**Purpose**: Handle GitHub OAuth callback (query params from GitHub redirect)

**Authentication**: No (public endpoint)

**Query Parameters**:
- `code`: OAuth authorization code from GitHub
- `state`: State parameter for CSRF protection (optional)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid-3",
      "fullName": "Jane Smith",
      "email": "jane@github.com",
      "avatarUrl": "https://avatars.githubusercontent.com/u/123456",
      "authMethod": "github",
      "isVerified": true,
      "role": "student",
      "permissions": ["view_dashboard"]
    },
    "accessToken": "eyJhbGciOiJIUzI1NiIs...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIs...",
    "expiresAt": 1716031200
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **400 Bad Request**: Missing or invalid code
  - Code: `INVALID_GITHUB_CODE`
- **401 Unauthorized**: GitHub verification failed
  - Code: `GITHUB_VERIFICATION_FAILED`

---

## Courses API

### Common Types

```typescript
Lesson {
  id: number
  title: string
  duration: string (format: "HH:MM:SS")
  description?: string | string[] (plain text or array of paragraphs)
  codeSnippet?: string (markdown code block)
}

Course {
  id: number
  title: string
  description: string
  icon: string (emoji or URL)
  lessons: Lesson[]
}
```

### GET /courses

**Purpose**: List all available courses

**Authentication**: Bearer token required

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 10

**Allowed Roles**: All (admin, teacher, student, parent)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "React Basics",
      "description": "Learn React fundamentals",
      "icon": "⚛️",
      "lessons": [
        {
          "id": 1,
          "title": "Introduction to React",
          "duration": "00:45:30",
          "description": "Overview of React and JSX",
          "codeSnippet": "```jsx\nfunction App() {\n  return <h1>Hello</h1>;\n}\n```"
        }
      ]
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 10,
    "total": 25,
    "totalPages": 3
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### GET /courses/:id

**Purpose**: Get single course by ID

**Authentication**: Bearer token required

**Allowed Roles**: All

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "React Basics",
    "description": "Learn React fundamentals",
    "icon": "⚛️",
    "lessons": [
      {
        "id": 1,
        "title": "Introduction to React",
        "duration": "00:45:30",
        "description": "Overview of React and JSX",
        "codeSnippet": "..."
      }
    ]
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **404 Not Found**: Course not found
  - Code: `COURSE_NOT_FOUND`

---

### POST /courses

**Purpose**: Create new course (admin/teacher only)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Request Body**:
```json
{
  "title": "Advanced React",
  "description": "Master React patterns",
  "icon": "⚛️",
  "lessons": [
    {
      "title": "Hooks Deep Dive",
      "duration": "01:30:00",
      "description": "Understanding React hooks",
      "codeSnippet": "..."
    }
  ]
}
```

**Response** (`success: true`): Returns created Course object

**Error Cases**:
- **400 Bad Request**: Validation error
  - Code: `INVALID_COURSE_DATA`
- **403 Forbidden**: User lacks manage_courses permission
  - Code: `PERMISSION_DENIED`

---

### PUT /courses/:id

**Purpose**: Update course (admin/teacher only)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher (or course creator)

**Request Body**: Same as POST /courses

**Response** (`success: true`): Returns updated Course object

**Error Cases**:
- **403 Forbidden**: User lacks manage_courses permission
  - Code: `PERMISSION_DENIED`
- **404 Not Found**: Course not found
  - Code: `COURSE_NOT_FOUND`

---

## FAQ API

### Common Types

```typescript
FaqItem {
  id: number
  question: string
  answer: string
}
```

### GET /faq

**Purpose**: List all FAQ items

**Authentication**: Bearer token required (optional, can be public)

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Allowed Roles**: All (or public)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "question": "How do I reset my password?",
      "answer": "Go to login page and click 'Forgot Password'"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 15,
    "totalPages": 1
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### GET /faq/:id

**Purpose**: Get single FAQ item

**Authentication**: Optional

**Allowed Roles**: All (or public)

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": 1,
    "question": "How do I reset my password?",
    "answer": "Go to login page and click 'Forgot Password'"
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /faq

**Purpose**: Create new FAQ item (admin only)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Request Body**:
```json
{
  "question": "What is the refund policy?",
  "answer": "We offer 30-day money-back guarantee"
}
```

**Response** (`success: true`): Returns created FaqItem

**Error Cases**:
- **403 Forbidden**: User lacks admin role
  - Code: `ADMIN_ONLY`

---

### PUT /faq/:id

**Purpose**: Update FAQ item (admin only)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Request Body**: Same as POST

**Response** (`success: true`): Returns updated FaqItem

---

### DELETE /faq/:id

**Purpose**: Delete FAQ item (admin only)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Response** (`success: true`):
```json
{
  "success": true,
  "data": { "message": "FAQ item deleted" },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

## Dashboard API

### Common Types

```typescript
DashboardSummary {
  students: number
  teachers: number
  attendanceRate: number (0-100)
  announcements: number
}
```

### GET /dashboard/summary

**Purpose**: Get dashboard summary statistics

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher, student, parent

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "students": 156,
    "teachers": 12,
    "attendanceRate": 92.5,
    "announcements": 8
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **401 Unauthorized**: Missing token
  - Code: `UNAUTHORIZED`

---

### GET /dashboard/students

**Purpose**: List students (with pagination)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "fullName": "Alice Johnson",
      "email": "alice@example.com",
      "role": "student"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 156,
    "totalPages": 8
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **403 Forbidden**: User lacks manage_students permission
  - Code: `PERMISSION_DENIED`

---

### GET /dashboard/teachers

**Purpose**: List teachers (with pagination)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-2",
      "fullName": "Mr. Smith",
      "email": "smith@example.com",
      "role": "teacher"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 12,
    "totalPages": 1
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### GET /dashboard/attendance

**Purpose**: Get attendance statistics

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Query Parameters**:
- `startDate` (optional): ISO 8601 date (e.g., 2026-05-01)
- `endDate` (optional): ISO 8601 date
- `page` (optional): Page number

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "date": "2026-05-17",
      "presentCount": 145,
      "absentCount": 8,
      "rate": 94.8
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 30,
    "total": 250,
    "totalPages": 9
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

## Notifications API

### Common Types

```typescript
NotificationItem {
  id: string (UUID)
  title: string
  read: boolean
  createdAt?: string (ISO 8601)
}
```

### GET /notifications

**Purpose**: List user notifications

**Authentication**: Bearer token required

**Allowed Roles**: All

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "title": "New assignment: React Hooks",
      "read": false,
      "createdAt": "2026-05-17T10:30:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 8,
    "totalPages": 1
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### PUT /notifications/:id/mark-read

**Purpose**: Mark notification as read

**Authentication**: Bearer token required

**Allowed Roles**: All

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "title": "New assignment: React Hooks",
    "read": true,
    "createdAt": "2026-05-17T10:30:00Z"
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### DELETE /notifications/:id

**Purpose**: Delete notification

**Authentication**: Bearer token required

**Allowed Roles**: All

**Response** (`success: true`):
```json
{
  "success": true,
  "data": { "message": "Notification deleted" },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

## Profile API

### Common Types

```typescript
Profile {
  id: string (UUID)
  role: string
  firstName: string
  lastName: string
  email?: string
  avatarUrl?: string
}
```

### GET /profile

**Purpose**: Get current user profile

**Authentication**: Bearer token required

**Allowed Roles**: All

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "role": "teacher",
    "firstName": "John",
    "lastName": "Doe",
    "email": "john@example.com",
    "avatarUrl": "https://example.com/avatar.jpg"
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **401 Unauthorized**: Missing token
  - Code: `UNAUTHORIZED`

---

### PUT /profile

**Purpose**: Update current user profile

**Authentication**: Bearer token required

**Allowed Roles**: All (users can only update their own profile)

**Request Body**:
```json
{
  "firstName": "John",
  "lastName": "Smith",
  "avatarUrl": "https://example.com/new-avatar.jpg"
}
```

**Response** (`success: true`): Returns updated Profile object

**Error Cases**:
- **400 Bad Request**: Validation error
  - Code: `INVALID_PROFILE_DATA`

---

## Teachers API

### Common Types

```typescript
Teacher {
  id: string (UUID)
  fullName: string
  email: string
  specialization: string
  courseCount: number
  studentCount: number
}
```

### GET /teachers

**Purpose**: List all teachers

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher, student (read-only for students)

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "fullName": "Dr. Sarah Wilson",
      "email": "sarah@example.com",
      "specialization": "React & TypeScript",
      "courseCount": 3,
      "studentCount": 87
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 12,
    "totalPages": 1
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### GET /teachers/:id

**Purpose**: Get single teacher details

**Authentication**: Bearer token required

**Allowed Roles**: All

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "fullName": "Dr. Sarah Wilson",
    "email": "sarah@example.com",
    "specialization": "React & TypeScript",
    "courseCount": 3,
    "studentCount": 87
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /teachers

**Purpose**: Create new teacher (admin only)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Request Body**:
```json
{
  "fullName": "Prof. Johnson",
  "email": "johnson@example.com",
  "specialization": "Python & Data Science"
}
```

**Response** (`success: true`): Returns created Teacher object

**Error Cases**:
- **403 Forbidden**: User lacks admin role
  - Code: `ADMIN_ONLY`
- **409 Conflict**: Email already exists
  - Code: `EMAIL_ALREADY_EXISTS`

---

### PUT /teachers/:id

**Purpose**: Update teacher (admin only)

**Authentication**: Bearer token required

**Allowed Roles**: admin

**Request Body**: Same as POST

**Response** (`success: true`): Returns updated Teacher object

---

## Students API

### Common Types

```typescript
Student {
  id: string (UUID)
  fullName: string
  email: string
  enrolledCourses: string[] (course IDs)
  joinDate: string (ISO 8601)
  status: "active" | "inactive"
}
```

### GET /students

**Purpose**: List all students

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Query Parameters**:
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 20

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "fullName": "Alice Johnson",
      "email": "alice@example.com",
      "enrolledCourses": ["1", "2"],
      "joinDate": "2026-01-15T00:00:00Z",
      "status": "active"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 20,
    "total": 156,
    "totalPages": 8
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

**Error Cases**:
- **403 Forbidden**: User lacks manage_students permission
  - Code: `PERMISSION_DENIED`

---

### GET /students/:id

**Purpose**: Get single student details

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "id": "uuid-1",
    "fullName": "Alice Johnson",
    "email": "alice@example.com",
    "enrolledCourses": ["1", "2"],
    "joinDate": "2026-01-15T00:00:00Z",
    "status": "active"
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /students

**Purpose**: Create new student (admin/teacher)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Request Body**:
```json
{
  "fullName": "Bob Smith",
  "email": "bob@example.com",
  "enrolledCourses": ["1"]
}
```

**Response** (`success: true`): Returns created Student object

---

### PUT /students/:id

**Purpose**: Update student (admin/teacher)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Request Body**: Same as POST

**Response** (`success: true`): Returns updated Student object

---

## Attendance API

### Common Types

```typescript
AttendanceRecord {
  id: string (UUID)
  studentId: string (UUID)
  date: string (ISO 8601 date, YYYY-MM-DD)
  status: "present" | "absent" | "late"
  markedBy: string (teacher UUID)
  markedAt: string (ISO 8601)
}
```

### GET /attendance

**Purpose**: List attendance records

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Query Parameters**:
- `studentId` (optional): Filter by student
- `date` (optional): Filter by date (YYYY-MM-DD)
- `startDate` (optional): Date range start
- `endDate` (optional): Date range end
- `page` (optional): Page number, default 1
- `pageSize` (optional): Items per page, default 50

**Response** (`success: true`):
```json
{
  "success": true,
  "data": [
    {
      "id": "uuid-1",
      "studentId": "uuid-student-1",
      "date": "2026-05-17",
      "status": "present",
      "markedBy": "uuid-teacher-1",
      "markedAt": "2026-05-17T09:00:00Z"
    }
  ],
  "pagination": {
    "page": 1,
    "pageSize": 50,
    "total": 1560,
    "totalPages": 32
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

### POST /attendance

**Purpose**: Mark attendance (create attendance record)

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Request Body**:
```json
{
  "studentId": "uuid-student-1",
  "date": "2026-05-17",
  "status": "present"
}
```

**Response** (`success: true`): Returns created AttendanceRecord

**Error Cases**:
- **400 Bad Request**: Invalid status value
  - Code: `INVALID_STATUS`
- **409 Conflict**: Attendance already marked for this date
  - Code: `ATTENDANCE_ALREADY_MARKED`

---

### PUT /attendance/:id

**Purpose**: Update attendance record

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Request Body**:
```json
{
  "status": "late"
}
```

**Response** (`success: true`): Returns updated AttendanceRecord

---

### GET /attendance/stats

**Purpose**: Get attendance statistics

**Authentication**: Bearer token required

**Allowed Roles**: admin, teacher

**Query Parameters**:
- `studentId` (optional): Filter by student
- `startDate` (optional): Date range start
- `endDate` (optional): Date range end

**Response** (`success: true`):
```json
{
  "success": true,
  "data": {
    "studentId": "uuid-student-1",
    "totalDays": 180,
    "presentDays": 165,
    "absentDays": 10,
    "lateDays": 5,
    "attendanceRate": 91.67
  },
  "meta": { "traceId": "...", "timestamp": "..." },
  "errors": []
}
```

---

## Error Handling

### HTTP Status Codes

| Code | Meaning | Usage |
|------|---------|-------|
| 200 | OK | Successful request |
| 201 | Created | Resource successfully created |
| 400 | Bad Request | Validation or request format error |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Authenticated but lacks permission |
| 404 | Not Found | Resource does not exist |
| 409 | Conflict | Resource already exists (duplicate) |
| 422 | Unprocessable Entity | Semantic error (business logic) |
| 429 | Too Many Requests | Rate limit exceeded |
| 500 | Internal Server Error | Unexpected server error |

### Standard Error Response

All error responses follow this format:

```json
{
  "success": false,
  "data": null,
  "meta": {
    "traceId": "550e8400-e29b-41d4-a716-446655440000",
    "timestamp": "2026-05-17T10:30:00Z"
  },
  "errors": [
    {
      "code": "ERROR_CODE",
      "field": "fieldName" or null,
      "message": "Human-readable error message"
    }
  ]
}
```

### Common Error Codes

| Code | HTTP | Meaning |
|------|------|---------|
| `UNAUTHORIZED` | 401 | Missing or invalid authentication token |
| `PERMISSION_DENIED` | 403 | User lacks required role/permission |
| `NOT_FOUND` | 404 | Requested resource does not exist |
| `VALIDATION_ERROR` | 400 | Request body validation failed |
| `DUPLICATE_RESOURCE` | 409 | Resource already exists |
| `INVALID_REQUEST` | 400 | Malformed request |
| `RATE_LIMIT_EXCEEDED` | 429 | Too many requests from this IP/user |
| `INTERNAL_ERROR` | 500 | Unexpected server error |

---

## RBAC Roles & Permissions

### User Roles

| Role | Description |
|------|-------------|
| **admin** | Full system access |
| **teacher** | Can manage courses, students, attendance |
| **student** | Can view dashboard and own profile |
| **parent** | Can view student progress |
| **guest** | No authenticated features |

### Permission Matrix

| Permission | Admin | Teacher | Student | Parent | Guest |
|------------|-------|---------|---------|--------|-------|
| `manage_students` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `manage_teachers` | ✅ | ❌ | ❌ | ❌ | ❌ |
| `view_dashboard` | ✅ | ✅ | ✅ | ✅ | ❌ |
| `manage_attendance` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `manage_courses` | ✅ | ✅ | ❌ | ❌ | ❌ |
| `manage_notifications` | ✅ | ✅ | ❌ | ❌ | ❌ |

### How RBAC is Enforced

1. **At authentication**: Backend returns `user.role` and `user.permissions[]` in `AuthSessionSnapshot`
2. **At request time**: Frontend sends `Authorization: Bearer <token>` header
3. **At backend validation**: 
   - Server validates token and extracts user role/permissions
   - For endpoints requiring specific permissions, verify user has required permission
   - Return `403 Forbidden` with code `PERMISSION_DENIED` if lacking permission
4. **At UI level**: Frontend wraps routes with `RoleRoute` / `PermissionRoute` guards (optional, backend validation is authoritative)

---

## Pagination Standards

For list endpoints that support pagination:

**Query Parameters**:
- `page` (optional, default: 1): Page number (1-indexed)
- `pageSize` (optional, default: 10-50 depending on endpoint): Items per page

**Response Pagination Object**:
```json
{
  "page": 1,
  "pageSize": 10,
  "total": 250,
  "totalPages": 25
}
```

**Calculation**: `totalPages = Math.ceil(total / pageSize)`

---

## Authentication Header Format

All authenticated endpoints require:

```
Authorization: Bearer <accessToken>
```

Where `<accessToken>` is a JWT returned by login/register/refresh endpoints.

**Optional**: Backend can also accept cookies if httpOnly cookies are configured:
```
Cookie: sessionId=<value>; Path=/; HttpOnly; Secure; SameSite=Strict
```

---

## Rate Limiting (Optional but Recommended)

Suggest implementing rate limiting:

- **Per-user rate limit**: 1000 requests per hour
- **Per-IP rate limit**: 10000 requests per hour
- **Response header**: `X-RateLimit-Remaining: <number>`
- **Error response**: 429 Too Many Requests with code `RATE_LIMIT_EXCEEDED`

---

## Implementation Checklist for Backend Team

- [ ] All endpoints return standardized `ApiResponse<T>` envelope
- [ ] All timestamps in ISO 8601 format (UTC)
- [ ] All IDs are UUIDs (not integers) except where noted (course/lesson IDs can be integers)
- [ ] All error codes match the documented values
- [ ] RBAC roles enforced at endpoint level
- [ ] Pagination implemented for all list endpoints
- [ ] traceId included in every response meta for debugging
- [ ] Session refresh tokens properly rotate
- [ ] OTP codes expire after 10 minutes
- [ ] Rate limiting configured (if needed)
- [ ] CORS headers allow frontend domain
- [ ] Unit tests cover error scenarios for each endpoint
- [ ] API documentation matches this spec before frontend integration

---

## Notes for Frontend-Backend Integration

1. **Mock-to-Backend Transition**: Replace mock gateways at repository layer only. No UI changes needed when switching endpoints.
2. **Query Keys**: Frontend uses TanStack Query with keys like `['courses', 'list']`. Backend implementation can be stateless.
3. **Session Strategy**: Current frontend uses cookie adapter but is backend-agnostic. Backend can use httpOnly cookies or JWT tokens.
4. **Testing**: Mock gateways will switch off when `VITE_USE_MOCK=false` environment variable is set.
5. **Schema Generation**: Use `orval` codegen tool to auto-generate TypeScript types from OpenAPI spec once backend publishes Swagger URL.

