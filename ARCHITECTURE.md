# Architecture Documentation - My Courses

A comprehensive deep-dive into the enterprise architecture of the My Courses frontend application.

---

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Layered Architecture](#layered-architecture)
3. [Data Flow Patterns](#data-flow-patterns)
4. [Authentication & Authorization](#authentication--authorization)
5. [State Management](#state-management)
6. [API & Repository Pattern](#api--repository-pattern)
7. [Testing Architecture](#testing-architecture)
8. [Deployment Architecture](#deployment-architecture)
9. [Design Patterns](#design-patterns)
10. [Future Extensibility](#future-extensibility)

---

## Architecture Overview

### System Context Diagram

```
┌──────────────────────────────────────────────────┐
│           My Courses Frontend (React)             │
│  Environment: Node.js 20, React Router 7         │
│  Build: Vite | Test: Vitest, Playwright         │
└──────────────────────────────────────────────────┘
           ↓                          ↓
    ┌──────────────┐        ┌────────────────┐
    │ Mock Server  │        │  Backend API   │
    │ (MSW, JSON)  │        │  (OpenAPI)     │
    └──────────────┘        └────────────────┘
           ↓                          ↓
    ┌──────────────────────────────────────┐
    │   Repository Layer (Switching)       │
    │   - VITE_USE_MOCK env var controls  │
    └──────────────────────────────────────┘
```

### Core Principle: Contract-Driven Development

The architecture is built on a fundamental principle:

> **The UI layer has a contract with the data layer. That contract never changes, regardless of whether we're using mock data or a real backend.**

This means:
- 🎯 Pages & widgets are written once
- 🔄 Mock and backend repositories must return identical shapes
- 🔌 Switching from mock to backend requires ZERO UI changes
- ✅ Full confidence in API integration - all tests already pass

---

## Layered Architecture

### Conceptual Layer Model

```
┌─────────────────────────────────────────────────────────────┐
│ Layer 1: Pages (Smart Containers)                          │
│ - Fetch data, manage local state                            │
│ - Compose widgets & features                                │
│ - Responsive to route params                                │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 2: Widgets (Visual Components)                        │
│ - Presentational, reusable UI sections                      │
│ - Accept props from pages                                   │
│ - No data fetching, pure rendering                          │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 3: Features (Domain Logic)                            │
│ - Feature-specific hooks (useAuth, useCourses, etc)         │
│ - Domain-specific components & forms                        │
│ - Business logic encapsulation                              │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 4: Shared (Platform/Infrastructure)                  │
│ - Reusable services (API, analytics, auth service)          │
│ - Data repositories (auth, courses, etc)                    │
│ - Shared UI components (Button, Input, Modal, etc)          │
│ - Constants, types, utilities                               │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 5: App (Bootstrap & Configuration)                   │
│ - Root React Router setup                                   │
│ - Route guards (ProtectedRoute, RoleRoute)                  │
│ - RBAC configuration                                        │
│ - Providers (Redux, Auth, Theme, etc)                       │
└─────────────────────────────────────────────────────────────┘
                           ↓
┌─────────────────────────────────────────────────────────────┐
│ Layer 6: Data Sources (Mock or Backend)                    │
│ - Mock Service Worker + JSON fixtures                       │
│ - Backend API (Swagger/OpenAPI)                             │
│ - Determined by VITE_USE_MOCK env var                       │
└─────────────────────────────────────────────────────────────┘
```

### Layer Responsibilities

#### Layer 1: Pages (`src/pages/`)

**Responsibility**: High-level page composition and data fetching

```typescript
// Example: src/pages/courses/CoursesPage.tsx
export default function CoursesPage() {
  const { courses, isLoading } = useCourses(); // Hook from feature
  
  return (
    <div>
      <PageHeader title="Courses" />
      {isLoading ? <Skeleton /> : <CourseListWidget courses={courses} />}
    </div>
  );
}
```

**Characteristics:**
- ✅ Fetch data using feature hooks
- ✅ Compose multiple widgets
- ✅ Responsive to URL parameters
- ✅ Manage local UI state only (loading, filters)
- ❌ No business logic
- ❌ No direct API calls

**Structure:**
```
src/pages/
├── about/               # About page composition
├── auth/               # Auth pages (login, register)
├── courses/            # Course pages
├── home/               # Home page sections
└── contact/            # Contact page
```

---

#### Layer 2: Widgets (`src/widgets/`)

**Responsibility**: Reusable, presentational UI components

```typescript
// Example: src/widgets/course-list/CourseListWidget.tsx
interface CourseListWidgetProps {
  courses: Course[];
  onSelectCourse?: (course: Course) => void;
}

export function CourseListWidget({ courses, onSelectCourse }: CourseListWidgetProps) {
  return (
    <div className="grid grid-cols-3">
      {courses.map(course => (
        <CourseCard key={course.id} course={course} onClick={onSelectCourse} />
      ))}
    </div>
  );
}
```

**Characteristics:**
- ✅ Pure presentational components
- ✅ Accept data via props
- ✅ Highly reusable
- ✅ No hooks (except for styling/animations)
- ❌ No data fetching
- ❌ No side effects

**Structure:**
```
src/widgets/
├── navbar/           # Navigation bar
├── footer/           # Footer
├── course-list/      # Course listing component
└── home/             # Home page specific sections
```

---

#### Layer 3: Features (`src/features/`)

**Responsibility**: Domain-specific business logic and custom hooks

```typescript
// Example: src/features/auth/hooks/useAuth.ts
export function useAuth() {
  const { user, login, logout, status } = useAuthStore();
  const { mutate: loginUser } = useMutation({
    mutationFn: async (credentials: LoginCredentials) => {
      const result = await authRepository.login(credentials);
      return result;
    },
    onSuccess: (data) => {
      useAuthStore.setState({ user: data.user, status: 'authenticated' });
    },
  });

  return { user, status, login: loginUser, logout };
}
```

**Characteristics:**
- ✅ Custom hooks for features
- ✅ Domain-specific components (LoginForm, RegisterForm)
- ✅ Business logic encapsulation
- ✅ Calls repositories for data
- ✅ Can use Zustand stores
- ❌ No direct API calls (uses repositories)

**Structure:**
```
src/features/
├── auth/                    # Authentication
│   ├── api/                 # Auth API calls
│   ├── hooks/              # useAuth, etc
│   ├── repository/         # AuthRepository (mock/api)
│   ├── store/              # Zustand auth store
│   ├── types/              # Auth types & interfaces
│   ├── utils/              # Auth utilities
│   └── components/         # Auth-specific components
│
├── courses/                # Course management (prep)
├── dashboard/              # Dashboard (prep)
├── profile/                # User profile
├── github-auth/            # GitHub OAuth flow
├── notifications/          # Notifications (prep)
├── attendance/             # Attendance tracking (prep)
└── analytics/              # Analytics (prep)
```

**Key Pattern: Feature Folders**

Each feature is self-contained with these subdirectories:

```
features/auth/
├── api/              # API methods (low-level)
├── hooks/            # Custom React hooks
├── repository/       # Repository pattern (data access)
├── store/            # Zustand state management
├── types/            # TypeScript types & interfaces
├── utils/            # Utility functions
├── constants/        # Feature constants
└── components/       # Auth-specific UI components
```

---

#### Layer 4: Shared (`src/shared/`)

**Responsibility**: Cross-cutting concerns and infrastructure

```
src/shared/
├── api/                    # HTTP client setup
│   ├── http.ts            # Axios instance + mutator for Orval
│   └── client.ts          # Orval-generated client
│
├── services/              # Business logic services
│   ├── auth.service.ts    # Auth business logic
│   └── ...
│
├── ui/                    # Reusable UI components
│   ├── Button.tsx
│   ├── Input.tsx
│   ├── Modal.tsx
│   └── ...
│
├── mocks/                 # Mock data & MSW setup
│   ├── handlers.ts        # MSW request handlers
│   └── data.json
│
├── generated/             # Auto-generated code
│   ├── openapi-types.ts   # From openapi-typescript
│   └── orval-client.ts    # From Orval (Swagger)
│
├── openapi/              # OpenAPI specification
│   └── schema.yaml       # Swagger/OpenAPI spec
│
├── types/                # Global types
│   └── api.types.ts      # API response envelopes
│
├── constants/            # App-wide constants
│   ├── api.constants.ts
│   └── routes.constants.ts
│
├── config/               # Shared configuration
│   └── env.ts           # Environment variables
│
└── errors/               # Error handling
    └── AppError.ts       # Custom error types
```

**Key Submodules:**

| Module | Purpose | Example |
|--------|---------|---------|
| **api/** | HTTP client & request configuration | axios setup, interceptors |
| **services/** | Business logic services | AuthService (authentication logic) |
| **ui/** | Reusable components | Button, Input, Modal (from Radix + Tailwind) |
| **mocks/** | Mock data & MSW | Fake API responses for development |
| **generated/** | Auto-generated from specs | OpenAPI types, Orval client |
| **openapi/** | API specification source | swagger.yaml or schema.yaml |
| **types/** | Global TypeScript types | ApiResponse envelope, common types |
| **constants/** | Application constants | API endpoints, timeout values |
| **config/** | Configuration management | Env vars, feature flags |
| **errors/** | Error handling | Custom error classes |

---

#### Layer 5: App (`src/app/`)

**Responsibility**: Application bootstrap and core configuration

```typescript
// Example: src/app/root.tsx
export default function Root() {
  return (
    <AppProviders>      {/* Auth context, theme, etc */}
      <Outlet />        {/* Rendered page */}
    </AppProviders>
  );
}
```

**Structure:**
```
src/app/
├── config/
│   ├── index.ts         # App settings & constants
│   └── rbac.ts         # Role-based access control matrix
│
├── layouts/
│   └── AuthLayout.tsx   # Auth-specific layout wrapper
│
├── providers/
│   └── AppProviders.tsx # React context providers
│
├── router/
│   ├── route-guards.tsx # ProtectedRoute, RoleRoute, etc
│   └── route-guards.test.tsx # Guard tests
│
├── routes.ts            # React Router route definitions
├── root.tsx             # Root layout wrapper
└── app.css              # Global styles
```

---

#### Layer 6: Data Sources

**Decision Point**: Determined by environment variable `VITE_USE_MOCK`

##### Mock Data Flow
```
Development Mode (VITE_USE_MOCK=true)
    ↓
Mock Service Worker (MSW)
    ↓
src/shared/mocks/handlers.ts
    ↓
Fake API responses (JSON)
    ↓
Repository returns data
```

##### Backend API Flow
```
Production Mode (VITE_USE_MOCK=false)
    ↓
Axios HTTP client
    ↓
Backend Server (OpenAPI/Swagger)
    ↓
Response envelope processing
    ↓
Repository returns data
```

---

## Data Flow Patterns

### Complete Flow: User Login

```
┌──────────────────────────────────────────────────────────────────┐
│ 1. PAGE LAYER (src/pages/auth/LoginPage.tsx)                    │
│    - Renders form, manages loading state                         │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 2. FEATURE LAYER (src/features/auth/components/LoginForm.tsx)   │
│    - Accepts form submission, calls useAuth hook                 │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 3. HOOK LAYER (src/features/auth/hooks/useAuth.ts)             │
│    - useMutation { mutationFn: authRepository.login }            │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 4. REPOSITORY LAYER (src/features/auth/repository/...)          │
│    - authRepository.login(credentials)                           │
│    - Checks VITE_USE_MOCK flag                                   │
│      ├─ true  → mockAuthRepository.login(credentials)            │
│      └─ false → apiAuthRepository.login(credentials)             │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 5. API LAYER (src/shared/api/http.ts)                           │
│    - Axios POST /api/auth/login                                  │
│    - OR MSW intercepts for mock                                  │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 6. RESPONSE PROCESSING (src/shared/types/api.types.ts)          │
│    - ApiResponse<User> { success, data, errors }                │
│    - Extract user data                                           │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 7. STATE UPDATE (src/features/auth/store/auth.store.ts)        │
│    - useAuthStore.setState({ user, status: 'authenticated' })   │
│    - Zustand store updated                                       │
└──────────────────────────────────────────────────────────────────┘
                            ↓
┌──────────────────────────────────────────────────────────────────┐
│ 8. PAGE LAYER (auto re-renders)                                 │
│    - Form submission complete                                    │
│    - Navigate to /dashboard                                      │
└──────────────────────────────────────────────────────────────────┘
```

### Flow Details

**Step 1-2: User Input**
```tsx
// LoginPage accepts form data
// LoginForm calls useAuth hook
const { login } = useAuth();
await login({ email, password });
```

**Step 3: Hook with Mutation**
```tsx
const { mutate: login } = useMutation({
  mutationFn: (credentials) => authRepository.login(credentials),
  onSuccess: (response) => {
    // Update auth store
    useAuthStore.setState({ user: response.data.user });
  },
});
```

**Step 4: Repository Pattern**
```tsx
// Route based on environment
export const authRepository = 
  import.meta.env.VITE_USE_MOCK 
    ? mockAuthRepository 
    : apiAuthRepository;

// Both return same shape
interface LoginResponse {
  success: boolean;
  data: { user: User; token: string };
  errors: Error[];
}
```

**Step 5: API Client**
```tsx
// Option A: Direct Axios
const response = await httpClient.post('/api/auth/login', credentials);

// Option B: MSW Mock (intercepts Axios)
http.post('/api/auth/login', async ({ request }) => {
  const body = await request.json();
  return HttpResponse.json({ success: true, data: { user: {...} } });
});
```

**Step 6-8: UI Updates**
```tsx
// Zustand triggers re-renders
// Component reads from store
const user = useAuthStore(state => state.user);
const isAuthenticated = user !== null;
```

---

## Authentication & Authorization

### Auth State Machine

```
┌─────────────────────────────────────────────────┐
│ Session Start                                   │
│ (App mounts, check cookies)                     │
└────────────┬────────────────────────────────────┘
             ↓
    ┌────────────────┐
    │  idle/loading  │  (checking session)
    └────────┬───────┘
             ↓
    ┌────────────────────────┐
    │  authenticated         │  (user logged in)
    │  - user: User object   │
    │  - token: stored       │
    └────────┬───────────────┘
             ↓
    ┌────────────────────────┐
    │  unauthenticated       │  (session expired or logged out)
    │  - user: null          │
    │  - token: cleared      │
    └────────────────────────┘
```

### Zustand Auth Store

```typescript
interface AuthStore {
  // State
  user: User | null;
  status: 'idle' | 'authenticated' | 'unauthenticated';
  initialized: boolean;
  
  // Actions
  setUser: (user: User) => void;
  setStatus: (status: string) => void;
  logout: () => void;
  restoreSession: () => Promise<void>;
}

export const useAuthStore = create<AuthStore>(...)
```

### Route Guards

| Guard | Purpose | Example |
|-------|---------|---------|
| **ProtectedRoute** | Block unauthenticated users | Dashboard, profile pages |
| **PublicRoute** | Block authenticated users | Login, register pages |
| **RoleRoute** | Block by user role | Admin panel (admin role only) |
| **PermissionRoute** | Block by permission | Student management (manage_students permission) |

```typescript
// Usage
<RoleRoute allowedRoles={["admin"]}>
  <AdminPanel />
</RoleRoute>

<PermissionRoute requiredPermission="manage_students">
  <StudentList />
</PermissionRoute>
```

### RBAC Matrix

```typescript
// src/app/config/rbac.ts
export const permissionsByRole = {
  admin: [
    'manage_students',
    'manage_teachers',
    'manage_courses',
    'manage_attendance',
    'manage_notifications',
    'view_dashboard',
  ],
  teacher: [
    'view_dashboard',
    'manage_attendance',
    'manage_courses',
  ],
  student: [
    'view_dashboard',
  ],
  parent: [
    'view_dashboard',
  ],
};

export const hasPermission = (
  role: UserRole | undefined,
  permission: UserPermission,
  explicitPermissions?: UserPermission[]
) => {
  // Check explicit permissions first
  if (explicitPermissions?.includes(permission)) {
    return true;
  }
  // Then check role-based permissions
  return permissionsByRole[role]?.includes(permission) ?? false;
};
```

---

## State Management

### Zustand Stores

The application uses **Zustand** for lightweight, reactive state management:

```typescript
// src/features/auth/store/auth.store.ts
export const useAuthStore = create<AuthStore>((set, get) => ({
  // State
  user: null,
  status: 'idle',
  initialized: false,

  // Actions
  setUser: (user) => set({ user }),
  setStatus: (status) => set({ status }),
  logout: () => set({ user: null, status: 'unauthenticated' }),
  
  // Async thunks
  restoreSession: async () => {
    try {
      const response = await authRepository.restoreSession();
      if (response.success) {
        set({ user: response.data.user, status: 'authenticated' });
      }
    } catch (error) {
      set({ status: 'unauthenticated' });
    }
  },
}));

// Usage in components
const user = useAuthStore(state => state.user);
const login = useAuthStore(state => state.setUser);
```

### React Query (TanStack Query)

**Purpose**: Server state management, caching, synchronization

```typescript
// Fetching data
const { data: courses, isLoading } = useQuery({
  queryKey: ['courses'],
  queryFn: () => coursesRepository.getCourses(),
});

// Mutations with side effects
const { mutate: createCourse } = useMutation({
  mutationFn: (course: NewCourse) => coursesRepository.create(course),
  onSuccess: () => {
    // Invalidate and refetch
    queryClient.invalidateQueries({ queryKey: ['courses'] });
  },
});
```

### State Separation Strategy

```
┌─────────────────────────────────────┐
│ Client State (React)                │
│ - UI state (isOpen, selectedTab)   │
│ - Form state (React Hook Form)      │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Shared State (Zustand)              │
│ - Auth user & status                │
│ - Global notifications              │
│ - User preferences                  │
└─────────────────────────────────────┘

┌─────────────────────────────────────┐
│ Server State (React Query)          │
│ - Courses list                      │
│ - User dashboard data               │
│ - API responses (cached)            │
└─────────────────────────────────────┘
```

---

## API & Repository Pattern

### Repository Pattern Design

The repository pattern provides an **abstraction layer** between features and data sources:

```typescript
// Abstract interface (contract)
export interface IAuthRepository {
  login(credentials: LoginCredentials): Promise<ApiResponse<LoginResult>>;
  register(data: RegisterData): Promise<ApiResponse<RegisterResult>>;
  logout(): Promise<ApiResponse<void>>;
  restoreSession(): Promise<ApiResponse<User>>;
}

// Mock implementation
export const mockAuthRepository: IAuthRepository = {
  async login(credentials) {
    // Simulate delay
    await delay(500);
    
    // Return mock user
    return {
      success: true,
      data: { user: MOCK_USERS[0], token: 'mock-token' },
      errors: [],
      meta: { timestamp: new Date().toISOString() },
    };
  },
  // ...
};

// API implementation
export const apiAuthRepository: IAuthRepository = {
  async login(credentials) {
    const response = await httpClient.post('/api/auth/login', credentials);
    return response.data; // Must match interface
  },
  // ...
};

// Switch based on environment
export const authRepository = 
  import.meta.env.VITE_USE_MOCK === 'true'
    ? mockAuthRepository
    : apiAuthRepository;
```

### Repository Structure

```
features/auth/repository/
├── auth.repository.ts          # Abstract interface
├── auth.repository.mock.ts     # Mock implementation
├── auth.repository.api.ts      # API implementation
└── index.ts                    # Export & switching logic
```

### API Response Contract

All API responses follow this standardized envelope:

```typescript
interface ApiResponse<T = any> {
  success: boolean;
  data: T | null;
  pagination?: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  meta: {
    traceId: string;
    timestamp: string;
    [key: string]: any;
  };
  errors: Array<{
    code: string;
    field?: string;
    message: string;
  }>;
}
```

### HTTP Client Setup

```typescript
// src/shared/api/http.ts
import axios from 'axios';

export const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000',
  timeout: 30000,
});

// Request interceptor: add auth token
httpClient.interceptors.request.use((config) => {
  const token = localStorage.getItem('auth_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor: handle errors
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token expired, refresh or redirect to login
      useAuthStore.setState({ status: 'unauthenticated' });
    }
    return Promise.reject(error);
  }
);

// Orval mutator
export const httpMutator = async (config) => {
  const response = await httpClient(config);
  return response.data;
};
```

---

## Testing Architecture

### Test Pyramid

```
        /\
       /E2E\      (Playwright)
      /------\    - Full user flows
     /        \   - Cross-browser
    /──────────\
   /  Integration\  (Vitest + MSW)
  /─────────────\  - Feature + API
 /               \
/   Unit Tests    \ (Vitest)
/─────────────────\ - Components, hooks, utils
```

### Unit Tests (Vitest)

**Location**: `src/**/*.{test,spec}.tsx`

```typescript
// src/app/config/rbac.test.ts
import { hasPermission } from './rbac';

describe('RBAC', () => {
  test('admin can manage students', () => {
    expect(hasPermission('admin', 'manage_students')).toBe(true);
  });

  test('student cannot manage students', () => {
    expect(hasPermission('student', 'manage_students')).toBe(false);
  });
});

// src/features/auth/hooks/useAuth.test.tsx
import { renderHook, act } from '@testing-library/react';
import { useAuth } from './useAuth';

describe('useAuth', () => {
  test('login updates auth store', async () => {
    const { result } = renderHook(useAuth);
    
    await act(async () => {
      await result.current.login({
        email: 'test@example.com',
        password: 'password',
      });
    });

    expect(result.current.user).toBeDefined();
  });
});
```

### Integration Tests (Vitest + MSW)

**Setup**: `src/test/setup.ts`

```typescript
import { server } from './msw/server';
import { afterAll, afterEach, beforeAll } from 'vitest';

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());
```

### E2E Tests (Playwright)

**Location**: `e2e/*.spec.ts`

```typescript
// e2e/login.spec.ts
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/auth/login');
  
  await page.fill('input[type="email"]', 'test@example.com');
  await page.fill('input[type="password"]', 'password');
  await page.click('button:has-text("Login")');
  
  await expect(page).toHaveURL('/dashboard');
});

test('unauthenticated user is redirected to login', async ({ page }) => {
  await page.goto('/dashboard');
  await expect(page).toHaveURL('/auth/login');
});
```

### MSW (Mock Service Worker) Setup

```typescript
// src/test/msw/handlers.ts
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.post('/api/auth/login', async ({ request }) => {
    const body = await request.json() as { email: string };
    
    if (body.email === 'test@example.com') {
      return HttpResponse.json({
        success: true,
        data: { user: MOCK_USER, token: 'mock-token' },
        errors: [],
      });
    }
    
    return HttpResponse.json({
      success: false,
      data: null,
      errors: [{ code: 'INVALID_CREDENTIALS', message: 'Invalid email or password' }],
    }, { status: 401 });
  }),
];

// src/test/msw/server.ts
import { setupServer } from 'msw/node';
import { handlers } from './handlers';

export const server = setupServer(...handlers);
```

---

## Deployment Architecture

### Build Process

```
npm run build
    ↓
Vite compilation
├─ TypeScript check
├─ Bundle JS/CSS
├─ Optimize assets
├─ Generate source maps
└─ Output → build/ directory
    ├─ build/client/ (static assets)
    └─ build/server/ (server entry)
```

### Docker Multi-Stage Build

```dockerfile
# Stage 1: Development dependencies
FROM node:20-alpine AS dev-deps
COPY . /app
WORKDIR /app
RUN npm ci

# Stage 2: Production dependencies
FROM node:20-alpine AS prod-deps
COPY package.json package-lock.json /app/
WORKDIR /app
RUN npm ci --omit=dev

# Stage 3: Build
FROM node:20-alpine AS build
COPY . /app/
COPY --from=dev-deps /app/node_modules /app/node_modules
WORKDIR /app
RUN npm run build

# Stage 4: Runtime
FROM node:20-alpine
COPY package.json package-lock.json /app/
COPY --from=prod-deps /app/node_modules /app/node_modules
COPY --from=build /app/build /app/build
WORKDIR /app
CMD ["npm", "run", "start"]
```

### Environment Configuration

```bash
# Development
VITE_USE_MOCK=true
VITE_API_URL=http://localhost:3000

# Production
VITE_USE_MOCK=false
VITE_API_URL=https://api.example.com

# Optional: GitHub OAuth
GITHUB_CLIENT_ID=...  # Only used by backend
```

### Deployment Targets

| Target | Command | Notes |
|--------|---------|-------|
| **Local Dev** | `npm run dev` | Vite dev server, hot reload |
| **Local Test** | `npm run test:e2e` | Requires dev server running |
| **Docker** | `docker build -t my-courses .` | Multi-stage optimized build |
| **Production** | `npm run build && npm start` | Static assets + server |

---

## Design Patterns

### 1. Repository Pattern

**Purpose**: Abstract data sources (mock/API)

```typescript
// One interface, multiple implementations
export interface IRepository {
  getData(): Promise<ApiResponse<Data>>;
}

const repository = VITE_USE_MOCK ? mockImpl : apiImpl;
```

### 2. Custom Hooks Pattern

**Purpose**: Encapsulate feature logic

```typescript
export function useAuth() {
  const store = useAuthStore();
  const mutation = useMutation({
    mutationFn: authRepository.login,
  });
  return { ...store, login: mutation.mutate };
}
```

### 3. Provider Pattern

**Purpose**: Inject context to whole app

```typescript
<AppProviders>
  <App />
</AppProviders>

// Inside: Auth, Theme, Notifications, etc contexts
```

### 4. Compound Components Pattern

**Purpose**: Complex UI with flexible structure

```typescript
<Modal>
  <Modal.Header />
  <Modal.Body />
  <Modal.Footer />
</Modal>
```

### 5. Layout Pattern

**Purpose**: Route-specific layouts

```typescript
route('/auth/login', 'routes/login.tsx', {
  layout: AuthLayout,  // Uses AuthLayout wrapper
});
```

### 6. Guard Pattern

**Purpose**: Route protection

```typescript
<ProtectedRoute>
  <Dashboard />
</ProtectedRoute>
```

---

## Future Extensibility

### Adding a New Feature

```
features/courses/
├── api/
│   └── courses.api.ts
├── components/
│   ├── CourseCard.tsx
│   └── CourseForm.tsx
├── hooks/
│   ├── useCourses.ts
│   └── useCourseMutation.ts
├── repository/
│   ├── courses.repository.ts
│   ├── courses.repository.mock.ts
│   ├── courses.repository.api.ts
│   └── index.ts
├── store/
│   └── courses.store.ts (if needed)
├── types/
│   └── courses.types.ts
├── utils/
│   └── courses.utils.ts
└── constants/
    └── courses.constants.ts
```

### Adding a New Route

```typescript
// 1. Create page component
export default function CoursesPage() {
  const { courses } = useCourses();
  return <CourseList courses={courses} />;
}

// 2. Add route
route('/courses', 'routes/courses.tsx'),

// 3. Protection (if needed)
<ProtectedRoute>
  <RoleRoute allowedRoles={['admin', 'teacher']}>
    <CoursesPage />
  </RoleRoute>
</ProtectedRoute>
```

### Adding a New Permission

```typescript
// 1. Add to auth types
export type UserPermission = 
  | 'manage_courses'  // New
  | 'manage_students'
  | ...;

// 2. Add to RBAC matrix
export const permissionsByRole = {
  admin: [..., 'manage_courses'],  // Add to roles
  teacher: [..., 'manage_courses'],
  // ...
};

// 3. Use in component
<PermissionRoute requiredPermission="manage_courses">
  <CourseManagement />
</PermissionRoute>
```

### Backend Integration Checklist

- [ ] Backend provides OpenAPI/Swagger spec
- [ ] Place spec in `src/shared/openapi/schema.yaml`
- [ ] Run `npm run openapi:generate`
- [ ] Create API repositories (replacing mocks)
- [ ] Update environment variables (VITE_USE_MOCK=false)
- [ ] Test with E2E suite (no UI changes needed!)
- [ ] Deploy with new configuration

---

## Performance Considerations

### Code Splitting

React Router automatically splits code by route:

```typescript
// Each route = separate chunk
route('/courses', 'routes/courses.tsx'),  // courses.chunk.js
route('/dashboard', 'routes/dashboard.tsx'),  // dashboard.chunk.js
```

### Caching Strategy

React Query with smart invalidation:

```typescript
// Refetch when mutation succeeds
invalidateQueries({ queryKey: ['courses'] });

// Or reuse cache
useQuery({
  queryKey: ['courses'],
  staleTime: 5 * 60 * 1000, // 5 minutes
});
```

### Lazy Loading

```typescript
const Dashboard = lazy(() => import('./Dashboard'));

<Suspense fallback={<Skeleton />}>
  <Dashboard />
</Suspense>
```

---

## Security Considerations

### Token Management

```typescript
// Store in httpOnly cookie (backend sets)
// Or localStorage (if XSS mitigated)
const token = localStorage.getItem('auth_token');

// Add to requests via interceptor
httpClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${token}`;
  return config;
});
```

### CORS

Frontend calls backend via CORS:
- Credentials included: `withCredentials: true`
- Preflight requests handled automatically

### Input Validation

```typescript
// Zod schema validation
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const { register } = useForm({
  resolver: zodResolver(loginSchema),
});
```

---

## Monitoring & Debugging

### Error Logging

```typescript
// Global error boundary
<ErrorBoundary>
  <App />
</ErrorBoundary>

// API error handling
httpClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data);
    return Promise.reject(error);
  }
);
```

### Debug Tools

- **React DevTools**: Component state inspection
- **Redux DevTools**: Zustand store inspection (with middleware)
- **Playwright Inspector**: E2E test debugging
- **Network Tab**: API call inspection
- **Console Logs**: Custom logging

---

## Conclusion

This architecture provides:

✅ **Scalability**: Easy to add new features and modules  
✅ **Maintainability**: Clear separation of concerns  
✅ **Testability**: All layers independently testable  
✅ **Flexibility**: Mock/backend switching without UI changes  
✅ **Type Safety**: Full TypeScript with strict checking  
✅ **Performance**: Code splitting, lazy loading, caching  
✅ **Developer Experience**: Clear patterns and conventions  

The project is ready for future growth and backend integration!

---

**Last Updated:** May 2026
