# Developer Guide - My Courses

A comprehensive step-by-step guide for developers working on the My Courses project.

---

## Table of Contents

1. [Project Setup](#project-setup)
2. [Understanding the Architecture](#understanding-the-architecture)
3. [How Authentication Works](#how-authentication-works)
4. [Adding a New Feature](#adding-a-new-feature)
5. [Adding a New Entity](#adding-a-new-entity)
6. [Creating Services](#creating-services)
7. [Creating Repositories](#creating-repositories)
8. [Adding Mock Data](#adding-mock-data)
9. [Connecting to Swagger/OpenAPI](#connecting-to-swaggeropenapi)
10. [Adding E2E Tests](#adding-e2e-tests)
11. [Creating Dashboard Modules](#creating-dashboard-modules)
12. [Troubleshooting](#troubleshooting)

---

## Project Setup

### 1. Initial Environment Setup

**Clone and install:**

```bash
# Clone repository
git clone <repository-url>
cd my-courses

# Install dependencies
npm install

# Create .env.local
cp .env.example .env.local
```

**`.env.local` template:**

```env
# Use mock data for development
VITE_USE_MOCK=true

# API URL (when VITE_USE_MOCK=false)
VITE_API_URL=http://localhost:3000/api

# Optional: GitHub OAuth (handled by backend)
# VITE_GITHUB_CLIENT_ID=your_client_id
```

### 2. Running the Project

**Development mode:**

```bash
npm run dev
# Opens http://localhost:5173
```

**Type checking:**

```bash
npm run typecheck
```

**All checks before committing:**

```bash
npm run typecheck  # Check types
npm run test       # Run unit tests
npm run test:e2e   # Run E2E tests
```

### 3. IDE Setup

**VS Code Extensions (recommended):**
- ESLint
- Prettier
- Tailwind CSS IntelliSense
- TypeScript Vue Plugin
- Playwright Test for VSCode

**VS Code Settings (.vscode/settings.json):**

```json
{
  "editor.defaultFormatter": "esbenp.prettier-vscode",
  "editor.formatOnSave": true,
  "editor.codeActionsOnSave": {
    "source.fixAll.eslint": "explicit"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```

---

## Understanding the Architecture

### Quick Mental Model

Think of the application as **layers** that build on top of each other:

```
Page (what user sees)
    ↓
Widget (reusable UI pieces)
    ↓
Feature (business logic for a domain)
    ↓
Hook (encapsulates feature logic)
    ↓
Service (business rules)
    ↓
Repository (where does data come from?)
    ↓
Mock Data OR Backend API
```

### Key Principle: The Contract

**Every layer has a contract with the layer below it.**

Example: Pages contract with features

```typescript
// Page expects this from useAuth hook
const { user, login, logout, status } = useAuth();

// Hook must return exactly this shape
// Whether data comes from mock or API!
```

This means:
- ✅ Write pages once
- ✅ Test with mocks
- ✅ Switch to backend later
- ✅ Zero page changes needed

### File Organization

Every feature follows this pattern:

```
features/auth/
├── api/                 ← Low-level API calls
├── components/          ← Auth-specific UI
├── hooks/              ← useAuth, useLogin, etc
├── repository/         ← Data access layer
├── store/              ← Zustand state (if needed)
├── types/              ← TypeScript interfaces
├── utils/              ← Helper functions
└── constants/          ← Feature constants
```

---

## How Authentication Works

### Auth Flow Overview

```
User fills login form
    ↓
LoginForm calls useAuth hook
    ↓
Hook calls authRepository.login()
    ↓
Repository checks VITE_USE_MOCK:
    ├─ true → mockAuthRepository.login()
    └─ false → apiAuthRepository.login()
    ↓
Returns: { success, data: { user, token }, errors }
    ↓
Hook updates Zustand store
    ↓
App redirects to dashboard
```

### Implementation: Auth Feature Structure

**1. Types (src/features/auth/types/auth.types.ts):**

```typescript
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  permissions?: UserPermission[];
  avatar?: string;
}

export type UserRole = 'admin' | 'teacher' | 'student' | 'parent';

export type UserPermission =
  | 'manage_students'
  | 'manage_teachers'
  | 'manage_courses'
  | 'manage_attendance'
  | 'manage_notifications'
  | 'view_dashboard';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface LoginResult {
  user: User;
  token: string;
  refreshToken?: string;
}
```

**2. Repository Interface (src/features/auth/repository/auth.repository.ts):**

```typescript
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<ApiResponse<LoginResult>>;
  register(data: RegisterData): Promise<ApiResponse<RegisterResult>>;
  logout(): Promise<ApiResponse<void>>;
  restoreSession(): Promise<ApiResponse<User>>;
  refreshToken(token: string): Promise<ApiResponse<{ token: string }>>;
  verify(code: string): Promise<ApiResponse<LoginResult>>;
}

export const authRepository: IAuthRepository =
  import.meta.env.VITE_USE_MOCK === 'true'
    ? mockAuthRepository
    : apiAuthRepository;
```

**3. Mock Repository (src/features/auth/repository/auth.repository.mock.ts):**

```typescript
const MOCK_USER: User = {
  id: '1',
  email: 'teacher@school.com',
  name: 'John Teacher',
  role: 'teacher',
  permissions: ['view_dashboard', 'manage_courses'],
};

export const mockAuthRepository: IAuthRepository = {
  async login(credentials) {
    await delay(500); // Simulate network
    
    if (credentials.email === MOCK_USER.email) {
      return {
        success: true,
        data: { user: MOCK_USER, token: 'mock-token-123' },
        errors: [],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-123' },
      };
    }
    
    return {
      success: false,
      data: null,
      errors: [
        {
          code: 'INVALID_CREDENTIALS',
          message: 'Invalid email or password',
        },
      ],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-124' },
    };
  },

  async logout() {
    await delay(300);
    return {
      success: true,
      data: null,
      errors: [],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-125' },
    };
  },

  async restoreSession() {
    await delay(500);
    // Check mock stored token
    const token = localStorage.getItem('auth_token');
    if (token) {
      return {
        success: true,
        data: MOCK_USER,
        errors: [],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-126' },
      };
    }
    return {
      success: false,
      data: null,
      errors: [{ code: 'NO_SESSION', message: 'No session found' }],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-127' },
    };
  },

  // ... other methods
};
```

**4. API Repository (src/features/auth/repository/auth.repository.api.ts):**

```typescript
export const apiAuthRepository: IAuthRepository = {
  async login(credentials) {
    const response = await httpClient.post<ApiResponse<LoginResult>>(
      '/auth/login',
      credentials
    );
    return response.data;
  },

  async logout() {
    const response = await httpClient.post<ApiResponse<void>>('/auth/logout');
    return response.data;
  },

  async restoreSession() {
    const response = await httpClient.get<ApiResponse<User>>(
      '/auth/session'
    );
    return response.data;
  },

  // ... other methods
};
```

**5. Zustand Store (src/features/auth/store/auth.store.ts):**

```typescript
export interface AuthStore {
  // State
  user: User | null;
  status: 'idle' | 'authenticated' | 'unauthenticated';
  initialized: boolean;

  // Actions
  setUser: (user: User) => void;
  setStatus: (status: AuthStore['status']) => void;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  status: 'idle',
  initialized: false,

  setUser: (user) => set({ user, status: 'authenticated' }),
  setStatus: (status) => set({ status }),

  logout: () => {
    set({ user: null, status: 'unauthenticated' });
    localStorage.removeItem('auth_token');
  },

  restoreSession: async () => {
    try {
      const response = await authRepository.restoreSession();
      if (response.success && response.data) {
        set({ user: response.data, status: 'authenticated', initialized: true });
      } else {
        set({ status: 'unauthenticated', initialized: true });
      }
    } catch {
      set({ status: 'unauthenticated', initialized: true });
    }
  },
}));
```

**6. Custom Hook (src/features/auth/hooks/useAuth.ts):**

```typescript
export function useAuth() {
  const { user, status, setUser, logout: storeLogout } = useAuthStore();
  
  const { mutate: login, isPending: isLoggingIn } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const response = await authRepository.login(credentials);
      if (!response.success) {
        throw new Error(response.errors[0]?.message || 'Login failed');
      }
      return response;
    },
    onSuccess: (response) => {
      if (response.data) {
        setUser(response.data.user);
        localStorage.setItem('auth_token', response.data.token);
      }
    },
  });

  return {
    user,
    status,
    isAuthenticated: status === 'authenticated',
    isLoading: isLoggingIn,
    login,
    logout: storeLogout,
  };
}
```

**7. Usage in Component (src/features/auth/components/LoginForm.tsx):**

```typescript
export function LoginForm() {
  const { login, isLoading } = useAuth();
  const { register, handleSubmit } = useForm<LoginCredentials>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginCredentials) => {
    login(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('email')} placeholder="Email" />
      <input {...register('password')} type="password" placeholder="Password" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Logging in...' : 'Login'}
      </button>
    </form>
  );
}
```

### Session Restoration on App Boot

```typescript
// src/app/providers/AppProviders.tsx
export function AppProviders({ children }: { children: ReactNode }) {
  const [isBootstrapComplete, setIsBootstrapComplete] = useState(false);

  useEffect(() => {
    // Restore session on app boot
    useAuthStore.getState().restoreSession().finally(() => {
      setIsBootstrapComplete(true);
    });
  }, []);

  if (!isBootstrapComplete) {
    return <LoadingScreen />;
  }

  return (
    <AuthContext.Provider value={{ isBootstrapComplete }}>
      {children}
    </AuthContext.Provider>
  );
}
```

---

## Adding a New Feature

Let's create a **Courses Management** feature as an example.

### Step 1: Create Types

**File: `src/features/courses/types/courses.types.ts`**

```typescript
export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  students: number;
  image?: string;
  createdAt: string;
}

export interface CreateCourseInput {
  title: string;
  description: string;
  instructor: string;
}

export interface CoursesResponse {
  courses: Course[];
  total: number;
}
```

### Step 2: Create Repository Interface

**File: `src/features/courses/repository/courses.repository.ts`**

```typescript
export interface ICoursesRepository {
  getCourses(): Promise<ApiResponse<Course[]>>;
  getCourseById(id: string): Promise<ApiResponse<Course>>;
  createCourse(course: CreateCourseInput): Promise<ApiResponse<Course>>;
  updateCourse(id: string, course: Partial<Course>): Promise<ApiResponse<Course>>;
  deleteCourse(id: string): Promise<ApiResponse<void>>;
}

export const coursesRepository: ICoursesRepository =
  import.meta.env.VITE_USE_MOCK === 'true'
    ? mockCoursesRepository
    : apiCoursesRepository;
```

### Step 3: Mock Implementation

**File: `src/features/courses/repository/courses.repository.mock.ts`**

```typescript
const MOCK_COURSES: Course[] = [
  {
    id: '1',
    title: 'Mathematics 101',
    description: 'Basic mathematics',
    instructor: 'John Teacher',
    students: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: '2',
    title: 'English Literature',
    description: 'British literature classics',
    instructor: 'Jane Smith',
    students: 30,
    createdAt: new Date().toISOString(),
  },
];

export const mockCoursesRepository: ICoursesRepository = {
  async getCourses() {
    await delay(500);
    return {
      success: true,
      data: MOCK_COURSES,
      errors: [],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-courses-1' },
    };
  },

  async getCourseById(id) {
    await delay(300);
    const course = MOCK_COURSES.find((c) => c.id === id);
    if (!course) {
      return {
        success: false,
        data: null,
        errors: [{ code: 'NOT_FOUND', message: 'Course not found' }],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-courses-2' },
      };
    }
    return {
      success: true,
      data: course,
      errors: [],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-courses-3' },
    };
  },

  async createCourse(course) {
    await delay(500);
    const newCourse: Course = {
      ...course,
      id: String(MOCK_COURSES.length + 1),
      students: 0,
      createdAt: new Date().toISOString(),
    };
    MOCK_COURSES.push(newCourse);
    return {
      success: true,
      data: newCourse,
      errors: [],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-courses-4' },
    };
  },

  // ... other methods
};
```

### Step 4: API Implementation

**File: `src/features/courses/repository/courses.repository.api.ts`**

```typescript
export const apiCoursesRepository: ICoursesRepository = {
  async getCourses() {
    const response = await httpClient.get<ApiResponse<Course[]>>(
      '/courses'
    );
    return response.data;
  },

  async getCourseById(id) {
    const response = await httpClient.get<ApiResponse<Course>>(
      `/courses/${id}`
    );
    return response.data;
  },

  async createCourse(course) {
    const response = await httpClient.post<ApiResponse<Course>>(
      '/courses',
      course
    );
    return response.data;
  },

  // ... other methods
};
```

### Step 5: Create Custom Hook

**File: `src/features/courses/hooks/useCourses.ts`**

```typescript
export function useCourses() {
  const { data: courses = [], isLoading, refetch } = useQuery({
    queryKey: ['courses'],
    queryFn: async () => {
      const response = await coursesRepository.getCourses();
      if (!response.success) {
        throw new Error(response.errors[0]?.message || 'Failed to fetch courses');
      }
      return response.data || [];
    },
  });

  return { courses, isLoading, refetch };
}

export function useCourseById(id: string) {
  const { data: course, isLoading } = useQuery({
    queryKey: ['course', id],
    queryFn: async () => {
      const response = await coursesRepository.getCourseById(id);
      if (!response.success) {
        throw new Error(response.errors[0]?.message || 'Failed to fetch course');
      }
      return response.data;
    },
  });

  return { course, isLoading };
}

export function useCreateCourse() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: coursesRepository.createCourse,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['courses'] });
    },
  });

  return { createCourse: mutate, isLoading: isPending };
}
```

### Step 6: Create Components

**File: `src/features/courses/components/CourseForm.tsx`**

```typescript
interface CourseFormProps {
  onSubmit: (data: CreateCourseInput) => void;
  isLoading?: boolean;
}

export function CourseForm({ onSubmit, isLoading }: CourseFormProps) {
  const { register, handleSubmit } = useForm<CreateCourseInput>({
    resolver: zodResolver(createCourseSchema),
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('title')} placeholder="Course title" />
      <textarea {...register('description')} placeholder="Description" />
      <input {...register('instructor')} placeholder="Instructor name" />
      <button type="submit" disabled={isLoading}>
        {isLoading ? 'Creating...' : 'Create Course'}
      </button>
    </form>
  );
}
```

### Step 7: Create Page

**File: `src/pages/courses/CoursesPage.tsx`**

```typescript
export default function CoursesPage() {
  const { courses, isLoading, refetch } = useCourses();
  const { createCourse, isLoading: isCreating } = useCreateCourse();

  const handleCreateCourse = (data: CreateCourseInput) => {
    createCourse(data, {
      onSuccess: () => {
        refetch();
      },
    });
  };

  return (
    <div>
      <h1>Courses</h1>
      <CourseForm onSubmit={handleCreateCourse} isLoading={isCreating} />
      {isLoading ? (
        <div>Loading courses...</div>
      ) : (
        <CourseListWidget courses={courses} />
      )}
    </div>
  );
}
```

### Step 8: Add Route

**File: `src/app/routes.ts`**

```typescript
route('/courses', 'pages/courses/CoursesPage.tsx'),
route('/courses/:courseId', 'pages/courses/CourseDetailPage.tsx'),
```

### Step 9: Protect Route (if needed)

```typescript
<PermissionRoute requiredPermission="manage_courses">
  <CoursesPage />
</PermissionRoute>
```

---

## Adding a New Entity

An **entity** is a domain model with types. It's different from a feature - it's just the data structure.

### Example: Add a `Lesson` Entity

**File: `src/entities/lesson/model/lesson.model.ts`**

```typescript
export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  content: string;
  duration: number; // minutes
  order: number;
  createdAt: string;
  updatedAt: string;
}

export interface CreateLessonInput {
  courseId: string;
  title: string;
  content: string;
  duration: number;
  order: number;
}
```

**File: `src/entities/lesson/index.ts`**

```typescript
export * from './model/lesson.model';
```

**Usage in features:**

```typescript
import type { Lesson, CreateLessonInput } from '@/entities/lesson';

// Now use in your repository
export interface ILessonRepository {
  getLessons(courseId: string): Promise<ApiResponse<Lesson[]>>;
  createLesson(data: CreateLessonInput): Promise<ApiResponse<Lesson>>;
  // ...
}
```

---

## Creating Services

Services contain **business logic** that's not specific to UI.

### Example: Course Service

**File: `src/shared/services/course.service.ts`**

```typescript
// Business logic that might be reused
export class CourseService {
  // Check if user can edit course
  canEditCourse(course: Course, user: User): boolean {
    if (user.role === 'admin') return true;
    if (user.role === 'teacher' && course.instructor === user.id) return true;
    return false;
  }

  // Get course completion percentage
  getCompletionPercentage(
    totalLessons: number,
    completedLessons: number
  ): number {
    if (totalLessons === 0) return 0;
    return Math.round((completedLessons / totalLessons) * 100);
  }

  // Filter courses by status
  filterCourses(
    courses: Course[],
    filter: 'active' | 'archived' | 'all'
  ): Course[] {
    switch (filter) {
      case 'active':
        return courses.filter((c) => !c.archived);
      case 'archived':
        return courses.filter((c) => c.archived);
      default:
        return courses;
    }
  }
}

export const courseService = new CourseService();
```

**Usage:**

```typescript
import { courseService } from '@/shared/services/course.service';

// In component
if (courseService.canEditCourse(course, user)) {
  // Show edit button
}

const completion = courseService.getCompletionPercentage(10, 7); // 70%
```

---

## Creating Repositories

Repositories are the **data access layer**. They abstract where data comes from.

### Key Principles

1. **Same Interface**: Mock and API implement the same interface
2. **Same Response Shape**: Both return `ApiResponse<T>`
3. **Delayed Responses**: Mocks should simulate network delay
4. **Error Handling**: Both handle errors consistently

### Complete Repository Example

**1. Define Interface:**

```typescript
// src/features/dashboard/repository/dashboard.repository.ts
export interface IDashboardRepository {
  getDashboard(): Promise<ApiResponse<DashboardData>>;
  getStats(): Promise<ApiResponse<Stats>>;
}

export const dashboardRepository: IDashboardRepository =
  import.meta.env.VITE_USE_MOCK === 'true'
    ? mockDashboardRepository
    : apiDashboardRepository;
```

**2. Mock Implementation:**

```typescript
// src/features/dashboard/repository/dashboard.repository.mock.ts
const MOCK_DASHBOARD: DashboardData = {
  user: { id: '1', name: 'John Doe' },
  stats: {
    students: 150,
    teachers: 20,
    courses: 30,
  },
};

export const mockDashboardRepository: IDashboardRepository = {
  async getDashboard() {
    await delay(800); // Simulate network delay
    return {
      success: true,
      data: MOCK_DASHBOARD,
      errors: [],
      meta: {
        timestamp: new Date().toISOString(),
        traceId: `mock-${Date.now()}`,
      },
    };
  },

  async getStats() {
    await delay(600);
    return {
      success: true,
      data: MOCK_DASHBOARD.stats,
      errors: [],
      meta: {
        timestamp: new Date().toISOString(),
        traceId: `mock-${Date.now()}`,
      },
    };
  },
};

// Helper function
function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
```

**3. API Implementation:**

```typescript
// src/features/dashboard/repository/dashboard.repository.api.ts
export const apiDashboardRepository: IDashboardRepository = {
  async getDashboard() {
    const response = await httpClient.get<ApiResponse<DashboardData>>(
      '/dashboard'
    );
    return response.data;
  },

  async getStats() {
    const response = await httpClient.get<ApiResponse<Stats>>('/dashboard/stats');
    return response.data;
  },
};
```

**4. Test the Repository:**

```typescript
// src/features/dashboard/repository/dashboard.repository.test.ts
import { describe, it, expect } from 'vitest';
import { mockDashboardRepository } from './dashboard.repository.mock';

describe('DashboardRepository', () => {
  it('should return dashboard data', async () => {
    const response = await mockDashboardRepository.getDashboard();

    expect(response.success).toBe(true);
    expect(response.data).toBeDefined();
    expect(response.meta.traceId).toBeDefined();
  });

  it('should return stats with correct shape', async () => {
    const response = await mockDashboardRepository.getStats();

    expect(response.success).toBe(true);
    expect(response.data.students).toBeDefined();
    expect(response.data.teachers).toBeDefined();
  });
});
```

---

## Adding Mock Data

Mock data enables **offline development** and **consistent testing**.

### Structure

```
src/shared/mocks/
├── data/
│   ├── users.json        # Mock users
│   ├── courses.json      # Mock courses
│   └── lessons.json      # Mock lessons
│
├── handlers.ts           # MSW request handlers
└── server.ts            # MSW server setup
```

### Step 1: Create Mock Data

**File: `src/shared/mocks/data/users.json`**

```json
{
  "users": [
    {
      "id": "1",
      "email": "teacher@school.com",
      "name": "John Teacher",
      "role": "teacher",
      "permissions": ["view_dashboard", "manage_courses"]
    },
    {
      "id": "2",
      "email": "student@school.com",
      "name": "Jane Student",
      "role": "student",
      "permissions": ["view_dashboard"]
    }
  ]
}
```

### Step 2: Create MSW Handlers

**File: `src/shared/mocks/handlers.ts`**

```typescript
import { http, HttpResponse } from 'msw';
import usersData from './data/users.json';
import coursesData from './data/courses.json';

export const handlers = [
  // Auth endpoints
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string };

    const user = usersData.users.find((u) => u.email === body.email);

    if (user) {
      return HttpResponse.json({
        success: true,
        data: { user, token: 'mock-token-123' },
        errors: [],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-1' },
      });
    }

    return HttpResponse.json(
      {
        success: false,
        data: null,
        errors: [{ code: 'INVALID_CREDENTIALS', message: 'Invalid credentials' }],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-2' },
      },
      { status: 401 }
    );
  }),

  http.get('/api/courses', () => {
    return HttpResponse.json({
      success: true,
      data: coursesData.courses,
      errors: [],
      meta: { timestamp: new Date().toISOString(), traceId: 'mock-3' },
    });
  }),

  http.get('/api/courses/:courseId', ({ params }) => {
    const course = coursesData.courses.find((c) => c.id === params.courseId);

    if (course) {
      return HttpResponse.json({
        success: true,
        data: course,
        errors: [],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-4' },
      });
    }

    return HttpResponse.json(
      {
        success: false,
        data: null,
        errors: [{ code: 'NOT_FOUND', message: 'Course not found' }],
        meta: { timestamp: new Date().toISOString(), traceId: 'mock-5' },
      },
      { status: 404 }
    );
  }),
];
```

### Step 3: Setup MSW Server

**File: `src/shared/mocks/server.ts`**

```typescript
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

**File: `src/test/setup.ts`**

```typescript
import { afterAll, afterEach, beforeAll } from 'vitest';
import { server } from '@/shared/mocks/server';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### Step 4: Use in Components

```typescript
// Mock data is automatically used when VITE_USE_MOCK=true
const { courses } = useCourses();
// If using MSW, it intercepts HTTP calls and returns mock responses
```

---

## Connecting to Swagger/OpenAPI

The project is **prepared** for OpenAPI integration.

### Step 1: Get Swagger Spec from Backend

Backend team provides `schema.yaml` or `swagger.json`

### Step 2: Add to Project

```bash
# Copy backend's OpenAPI spec
cp /path/to/backend/openapi-spec.yaml src/shared/openapi/schema.yaml
```

### Step 3: Generate Types and Client

```bash
# Generate OpenAPI types
npm run openapi:types

# Generate Orval client
npm run openapi:orval
```

This creates:
- `src/shared/generated/openapi-types.ts` - All API types
- `src/shared/generated/orval-client.ts` - API client

### Step 4: Create API Repository

**File: `src/features/courses/repository/courses.repository.api.ts`**

```typescript
import { coursesApi } from '@/shared/generated/orval-client';

export const apiCoursesRepository: ICoursesRepository = {
  async getCourses() {
    // Use generated client
    return await coursesApi.getCourses();
  },

  async createCourse(data) {
    return await coursesApi.createCourse(data);
  },

  // ... other methods using generated client
};
```

### Step 5: Update Environment

```env
VITE_USE_MOCK=false
VITE_API_URL=https://api.example.com
```

### Step 6: Test

```bash
npm run test:e2e
# All tests pass without UI changes!
```

---

## Adding E2E Tests

Playwright tests validate **entire user flows**.

### Structure

```
e2e/
├── login.spec.ts          # Login flow
├── register.spec.ts       # Registration
├── courses.spec.ts        # Course management
└── dashboard.spec.ts      # Dashboard access
```

### Basic Test Structure

**File: `e2e/courses.spec.ts`**

```typescript
import { test, expect } from '@playwright/test';

test.describe('Course Management', () => {
  // Setup: logged in user
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.fill('input[type="email"]', 'teacher@school.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button:has-text("Login")');
    await page.waitForURL('/dashboard');
  });

  test('should display courses list', async ({ page }) => {
    await page.goto('/courses');
    
    // Wait for courses to load
    await page.waitForSelector('[data-testid="course-card"]');
    
    // Verify courses displayed
    const courses = await page.locator('[data-testid="course-card"]').count();
    expect(courses).toBeGreaterThan(0);
  });

  test('should create new course', async ({ page }) => {
    await page.goto('/courses');
    
    // Click create button
    await page.click('button:has-text("Create Course")');
    
    // Fill form
    await page.fill('input[placeholder="Course title"]', 'New Course');
    await page.fill('textarea[placeholder="Description"]', 'Course description');
    await page.fill('input[placeholder="Instructor"]', 'John Doe');
    
    // Submit
    await page.click('button:has-text("Create")');
    
    // Verify success
    await expect(page.locator('text=Course created')).toBeVisible();
  });

  test('should update course', async ({ page }) => {
    await page.goto('/courses/1'); // Assuming course ID 1 exists
    
    // Edit button
    await page.click('button:has-text("Edit")');
    
    // Modify title
    const titleInput = page.locator('input[placeholder="Course title"]');
    await titleInput.clear();
    await titleInput.fill('Updated Course Title');
    
    // Save
    await page.click('button:has-text("Save")');
    
    // Verify
    await expect(page.locator('text=Updated Course Title')).toBeVisible();
  });

  test('should delete course', async ({ page }) => {
    await page.goto('/courses/1');
    
    // Delete button
    await page.click('button:has-text("Delete")');
    
    // Confirm deletion
    await page.click('button:has-text("Confirm")');
    
    // Verify redirect
    await expect(page).toHaveURL('/courses');
  });
});

test.describe('Permission-based access', () => {
  test('student cannot access course management', async ({ page }) => {
    // Login as student
    await page.goto('/');
    await page.fill('input[type="email"]', 'student@school.com');
    await page.fill('input[type="password"]', 'password');
    await page.click('button:has-text("Login")');
    
    // Try to access course management
    await page.goto('/courses/manage');
    
    // Should be redirected
    await expect(page).toHaveURL('/dashboard');
  });
});
```

### Running Tests

```bash
# Run all E2E tests
npm run test:e2e

# Run specific test
npx playwright test e2e/courses.spec.ts

# Debug mode
npx playwright test --debug

# UI mode
npx playwright test --ui
```

### Best Practices

✅ **Use data-testid attributes:**

```tsx
<button data-testid="create-course-btn">Create</button>
```

```typescript
await page.click('[data-testid="create-course-btn"]');
```

✅ **Wait for elements properly:**

```typescript
await page.waitForSelector('[data-testid="course-list"]');
await page.waitForURL('/courses');
```

✅ **Test user flows, not implementation:**

```typescript
// Good: Tests user journey
await page.goto('/courses');
await page.click('button:has-text("Create")');
await page.fill('input[placeholder="Title"]', 'New Course');

// Bad: Tests internal state
expect(store.courses.length).toBe(1);
```

---

## Creating Dashboard Modules

The dashboard is a **future feature** that will aggregate data from multiple features.

### Step 1: Create Dashboard Feature Structure

```
features/dashboard/
├── components/
│   ├── StatCard.tsx          # Reusable stat display
│   ├── QuickActions.tsx       # Common actions
│   └── ActivityFeed.tsx       # Recent activity
│
├── hooks/
│   └── useDashboard.ts        # Data aggregation
│
├── repository/
│   ├── dashboard.repository.ts
│   ├── dashboard.repository.mock.ts
│   └── dashboard.repository.api.ts
│
├── types/
│   └── dashboard.types.ts
│
└── index.ts
```

### Step 2: Define Dashboard Types

**File: `src/features/dashboard/types/dashboard.types.ts`**

```typescript
export interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  totalCourses: number;
  totalAttendance: number;
}

export interface QuickAction {
  id: string;
  title: string;
  icon: string;
  href: string;
  color: string;
}

export interface DashboardData {
  stats: DashboardStats;
  quickActions: QuickAction[];
  recentActivity: Activity[];
}

export interface Activity {
  id: string;
  type: 'course_created' | 'student_enrolled' | 'attendance_marked';
  description: string;
  timestamp: string;
  user: { name: string; avatar?: string };
}
```

### Step 3: Create Repository

```typescript
// Similar pattern to courses
export interface IDashboardRepository {
  getDashboard(): Promise<ApiResponse<DashboardData>>;
  getStats(): Promise<ApiResponse<DashboardStats>>;
}
```

### Step 4: Create Hook

```typescript
export function useDashboard() {
  const { data: dashboard, isLoading } = useQuery({
    queryKey: ['dashboard'],
    queryFn: async () => {
      const response = await dashboardRepository.getDashboard();
      if (!response.success) {
        throw new Error('Failed to load dashboard');
      }
      return response.data;
    },
  });

  return { dashboard, isLoading };
}
```

### Step 5: Create Dashboard Page

**File: `src/pages/dashboard/DashboardPage.tsx`**

```typescript
import { ProtectedRoute } from '@/app/router/route-guards';
import { useDashboard } from '@/features/dashboard/hooks/useDashboard';
import { StatCard } from '@/features/dashboard/components/StatCard';
import { QuickActions } from '@/features/dashboard/components/QuickActions';
import { ActivityFeed } from '@/features/dashboard/components/ActivityFeed';

export default function DashboardPage() {
  const { dashboard, isLoading } = useDashboard();

  if (isLoading) return <div>Loading dashboard...</div>;
  if (!dashboard) return <div>No data</div>;

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-3xl font-bold">Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-4 gap-4 mt-6">
          <StatCard
            title="Students"
            value={dashboard.stats.totalStudents}
            color="blue"
          />
          <StatCard
            title="Teachers"
            value={dashboard.stats.totalTeachers}
            color="green"
          />
          <StatCard
            title="Courses"
            value={dashboard.stats.totalCourses}
            color="purple"
          />
          <StatCard
            title="Attendance"
            value={`${dashboard.stats.totalAttendance}%`}
            color="orange"
          />
        </div>

        {/* Quick Actions */}
        <QuickActions actions={dashboard.quickActions} />

        {/* Activity Feed */}
        <ActivityFeed activities={dashboard.recentActivity} />
      </div>
    </ProtectedRoute>
  );
}
```

### Step 6: Add Route

```typescript
route('/dashboard', 'pages/dashboard/DashboardPage.tsx'),
```

---

## Troubleshooting

### Common Issues

#### Issue: "Module not found" error

**Problem**: Import path is incorrect

**Solution**:
```typescript
// Check @ alias is setup in vite.config.ts
resolve: {
  alias: {
    '@': fileURLToPath(new URL('./src', import.meta.url)),
  },
}

// Use correct import
import { useCourses } from '@/features/courses/hooks/useCourses';
```

---

#### Issue: "Cannot find name 'delay'" error

**Problem**: Missing delay helper in mock

**Solution**:
```typescript
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// Or use shared utility
import { delay } from '@/shared/utils';
```

---

#### Issue: Mock data not being used

**Problem**: VITE_USE_MOCK env var not set correctly

**Solution**:
```bash
# Make sure .env.local has
VITE_USE_MOCK=true

# Check it's being read
console.log(import.meta.env.VITE_USE_MOCK);

# Restart dev server
npm run dev
```

---

#### Issue: E2E tests fail randomly

**Problem**: Race conditions, elements not ready

**Solution**:
```typescript
// Add proper waits
await page.waitForSelector('[data-testid="course-list"]');
await page.waitForLoadState('networkidle');
await page.waitForURL('/courses');

// Don't just sleep
// ❌ await page.waitForTimeout(1000);
```

---

#### Issue: TypeScript errors in component

**Problem**: Missing or incorrect types

**Solution**:
```bash
# Run typecheck
npm run typecheck

# Fix types in tsconfig.json if needed
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true
  }
}
```

---

#### Issue: Zustand store not updating

**Problem**: Missing `set` callback

**Solution**:
```typescript
// Wrong
const user = useAuthStore().user;

// Correct - subscribe to changes
const user = useAuthStore((state) => state.user);

// Correct - update state
useAuthStore.setState({ user: newUser });
```

---

#### Issue: React Query cache not invalidating

**Problem**: Wrong query key

**Solution**:
```typescript
// Define query key constant
const COURSES_KEY = ['courses'] as const;

// Use consistently everywhere
useQuery({
  queryKey: COURSES_KEY,
  queryFn: getCourses,
});

// Invalidate with exact key
queryClient.invalidateQueries({ queryKey: COURSES_KEY });
```

---

### Debug Checklist

When something isn't working:

1. **Check the console** for errors
2. **Check Network tab** for failed API calls
3. **Check React DevTools** for component state
4. **Check Zustand DevTools** for store state
5. **Check .env.local** variables are set
6. **Restart dev server** `npm run dev`
7. **Clear node_modules** `rm -rf node_modules && npm install`
8. **Check VITE_USE_MOCK** is correct for what you're testing

---

## Quick Reference

### File Structure Checklist

When creating a new feature, create:

- ✅ `types/feature.types.ts` - Types & interfaces
- ✅ `repository/feature.repository.ts` - Interface
- ✅ `repository/feature.repository.mock.ts` - Mock impl
- ✅ `repository/feature.repository.api.ts` - API impl
- ✅ `repository/index.ts` - Export & switch
- ✅ `hooks/useFeature.ts` - Custom hook
- ✅ `components/FeatureForm.tsx` - Components
- ✅ `pages/FeaturePage.tsx` - Page component
- ✅ Add route to `src/app/routes.ts`
- ✅ Add E2E test to `e2e/feature.spec.ts`

### Commands

```bash
npm run dev           # Start dev server
npm run typecheck     # Type checking
npm run test          # Unit tests
npm run test:e2e      # E2E tests
npm run build         # Build for production
npm run openapi:generate  # Generate from Swagger
```

### Environment Variables

```env
VITE_USE_MOCK=true|false         # Use mock data or real API
VITE_API_URL=http://localhost:3000  # Backend URL
```

### Key Directories

| Path | Purpose |
|------|---------|
| `src/app/` | Bootstrap, routing, guards |
| `src/pages/` | Page components |
| `src/widgets/` | Reusable UI sections |
| `src/features/` | Domain-specific logic |
| `src/shared/` | Cross-cutting concerns |
| `src/lib/` | Utilities |
| `e2e/` | End-to-end tests |

---

**Last Updated:** May 2026

Good luck with development! 🚀
