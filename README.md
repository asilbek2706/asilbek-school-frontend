# My Courses - School Management Frontend

A **enterprise-ready React + TypeScript** frontend for school course management with built-in support for multi-environment switching, role-based access control (RBAC), authentication, and E2E testing.

## 🎯 Project Status

✅ **Currently Implemented:**
- Core React + TypeScript setup with React Router v7
- Multi-layer architecture (pages, widgets, features, shared, lib)
- Authentication module (login, register, OTP, GitHub OAuth)
- Session management with cookie-based restoration
- RBAC framework with 4 roles (admin, teacher, student, parent)
- Repository pattern for data access with mock/backend switching
- Comprehensive E2E test suite (Playwright)
- OpenAPI/Swagger generation infrastructure
- Mock data for offline development
- Tailwind CSS + Radix UI components
- Form validation with React Hook Form + Zod

🚀 **Future Enhancements:**
- Backend API integration (Swagger/OpenAPI)
- Admin dashboard module
- CRUD modules (courses, students, teachers, attendance)
- Advanced notification system
- Real-time attendance tracking
- Analytics and reporting

---

## 🏗️ Architecture Overview

```
┌─────────────────────────────────────────────────┐
│              Frontend (React Router)              │
├────────────────────────────────────────────────┤
│  Pages (Containers)   │   Widgets (Presenters)   │
├────────────────────────────────────────────────┤
│  Features (Domain Logic)                        │
│  - Auth  - Courses  - Dashboard  - Profile      │
├────────────────────────────────────────────────┤
│  Shared (Platform Layer)                        │
│  - Services  - API  - UI Components - Constants │
├────────────────────────────────────────────────┤
│  App (Bootstrap)                                │
│  - Router Guards  - Providers  - Config         │
├────────────────────────────────────────────────┤
│  Mock Data  OR  Backend API (Swagger)           │
└─────────────────────────────────────────────────┘
```

### Key Design Principles

✅ **Separation of Concerns**: Each layer has a single responsibility  
✅ **Contract-Driven Development**: UI contracts remain stable across mock/backend switches  
✅ **Mock/Backend Switching**: Single environment variable controls data source  
✅ **Type Safety**: Full TypeScript with strict mode  
✅ **Composability**: Small, reusable components and services  
✅ **Testability**: E2E, unit tests, and integration-ready mocks  

---

## 📁 Project Structure

```
src/
├── app/                          # Application bootstrap & setup
│   ├── config/                   # App configuration (RBAC, settings)
│   ├── layouts/                  # Route wrappers (AuthLayout, etc)
│   ├── providers/                # React providers (AppProviders)
│   ├── router/                   # Route guards (ProtectedRoute, RoleRoute)
│   ├── routes.ts                 # Route definitions
│   └── root.tsx                  # Root layout
│
├── features/                     # Domain-specific features
│   ├── auth/                     # Login, register, GitHub OAuth, session
│   ├── courses/                  # Course listing and details (prep)
│   ├── dashboard/                # Dashboard (prep)
│   ├── profile/                  # User profile management
│   ├── github-auth/              # GitHub OAuth flow
│   ├── notifications/            # Notification system (prep)
│   ├── attendance/               # Attendance tracking (prep)
│   └── analytics/                # Analytics (prep)
│
├── entities/                     # Domain models
│   ├── course/                   # Course entity & types
│   └── faq/                      # FAQ entity & types
│
├── shared/                       # Platform/infrastructure layer
│   ├── api/                      # HTTP client, axios setup
│   ├── services/                 # Business logic services
│   ├── config/                   # Shared configuration
│   ├── constants/                # App-wide constants
│   ├── types/                    # Global TypeScript types
│   ├── ui/                       # Reusable UI components
│   ├── mocks/                    # Mock data & MSW setup
│   ├── generated/                # Auto-generated code (Orval)
│   ├── openapi/                  # OpenAPI schema
│   └── errors/                   # Error handling utilities
│
├── pages/                        # Page-level composition
│   ├── about/                    # About page
│   ├── auth/                     # Auth pages (login, register, verify)
│   ├── courses/                  # Course pages
│   ├── home/                     # Home page
│   └── contact/                  # Contact page
│
├── widgets/                      # Reusable visual sections
│   ├── navbar/                   # Navigation bar
│   ├── footer/                   # Footer
│   ├── course-list/              # Course listing widget
│   └── home/                     # Home page sections
│
├── lib/                          # Utility functions & helpers
│   └── utils.ts                  # App-wide utilities
│
├── test/                         # Test configuration
│   ├── setup.ts                  # Vitest setup
│   ├── test-utils.tsx            # Testing utilities
│   └── msw/                      # Mock Service Worker setup
│
└── app.css                       # Global styles
```

---

## 🚀 Quick Start

### Prerequisites
- Node.js 20+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Run unit tests
npm run test

# Run E2E tests (requires dev server running)
npm run test:e2e

# Build for production
npm run build

# Start production server
npm start
```

### Environment Variables

Create `.env.local` for local development:

```env
# Mock/Backend switching (true = use mock data, false = use real API)
VITE_USE_MOCK=true

# API base URL (used when VITE_USE_MOCK=false)
VITE_API_URL=http://localhost:3000/api

# GitHub OAuth (backend-managed, not used by frontend)
# GITHUB_CLIENT_ID=your_client_id
```

---

## 🔐 Authentication Architecture

The authentication system uses a **layered approach** for maximum flexibility:

```
LoginPage
    ↓
AuthLayout
    ↓
LoginForm (React Hook Form)
    ↓
useAuth Hook
    ↓
AuthService (business logic)
    ↓
AuthRepository (data access)
    ↓
Mock Data OR Backend API
```

### Auth Flow Details

| Flow | Description |
|------|-------------|
| **Login** | Email/password submission → session token → user store |
| **Register** | New account creation with validation → auto-login |
| **OTP Verify** | Email verification code submission |
| **GitHub OAuth** | Backend redirects to GitHub → callback URL → session token |
| **Session Restore** | App boot → check cookies → restore user session |
| **Refresh Token** | Automatic token refresh before expiry (prepared) |
| **Logout** | Clear session → remove cookies → redirect to login |

**Key Files:**
- [src/features/auth](src/features/auth) - Core auth logic
- [src/app/router/route-guards.tsx](src/app/router/route-guards.tsx) - Route protection
- [src/app/config/rbac.ts](src/app/config/rbac.ts) - Permission matrix

---

## 🛡️ Role-Based Access Control (RBAC)

### Defined Roles

| Role | Permissions |
|------|------------|
| **admin** | Manage students, teachers, courses, attendance, notifications; view dashboard |
| **teacher** | Manage courses, attendance; view dashboard |
| **student** | View dashboard |
| **parent** | View dashboard |

### Permission Guards

```tsx
// Role-based routing
<RoleRoute allowedRoles={["admin", "teacher"]}>
  <DashboardPage />
</RoleRoute>

// Permission-based routing
<PermissionRoute requiredPermission="manage_students">
  <StudentsManagement />
</PermissionRoute>
```

**Configuration:** [src/app/config/rbac.ts](src/app/config/rbac.ts)

---

## 🔄 Mock/Backend Switching

The project uses the **Repository Pattern** to abstract data sources, enabling seamless switching between mock and real backend:

### How It Works

1. **Environment-based decision** (via `VITE_USE_MOCK` env var)
2. **Repository layer** checks the flag and routes to mock or API
3. **Contract guarantee** - both return the same shape
4. **UI never changes** - all logic is in services/repositories

### Example: AuthRepository

```typescript
// When VITE_USE_MOCK=true
const response = await mockAuthRepository.login(credentials);

// When VITE_USE_MOCK=false
const response = await apiAuthRepository.login(credentials);

// Both return: { success: boolean, data: User, errors: [] }
```

### Response Envelope

All API responses follow this contract:

```typescript
interface ApiResponse<T> {
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

---

## 📊 Testing Strategy

### Unit Tests (Vitest)

```bash
npm run test
```

- Route guards logic
- RBAC permission checks
- Utility functions
- Component rendering

### E2E Tests (Playwright)

```bash
npm run test:e2e
```

| Test | Coverage |
|------|----------|
| [e2e/login.spec.ts](e2e/login.spec.ts) | Login flow, session persistence |
| [e2e/register.spec.ts](e2e/register.spec.ts) | User registration, validation |
| [e2e/verify.spec.ts](e2e/verify.spec.ts) | OTP verification flow |
| [e2e/github.spec.ts](e2e/github.spec.ts) | GitHub OAuth integration |
| [e2e/dashboard.spec.ts](e2e/dashboard.spec.ts) | Dashboard access by role |
| [e2e/permission.spec.ts](e2e/permission.spec.ts) | Permission-based access |
| [e2e/offline.spec.ts](e2e/offline.spec.ts) | Offline mock data functionality |
| [e2e/role.spec.ts](e2e/role.spec.ts) | Role-based routing |

---

## 🔌 OpenAPI/Swagger Integration

The project is **prepared for seamless backend integration** via OpenAPI code generation:

### Current Setup

```
orval.config.ts          ← Orval configuration
    ↓
src/shared/openapi/schema.yaml    ← OpenAPI spec (to be provided by backend)
    ↓
npm run openapi:generate ← Auto-generates client code
    ↓
src/shared/generated/    ← Generated types & API client
```

### Backend Integration Checklist

1. ✅ Backend provides OpenAPI/Swagger spec
2. ✅ Update `src/shared/openapi/schema.yaml`
3. ✅ Run `npm run openapi:generate`
4. ✅ Replace mock repositories with API repositories
5. ✅ Set `VITE_USE_MOCK=false`
6. ✅ No UI code changes required

**Details:** See [SWAGGER_REQUIREMENTS.md](SWAGGER_REQUIREMENTS.md)

---

## 🐳 Docker & Deployment

```bash
# Build Docker image
docker build -t my-courses:latest .

# Run container
docker run -p 3000:3000 -e VITE_USE_MOCK=false my-courses:latest

# Production environment variables
VITE_API_URL=https://api.example.com
VITE_USE_MOCK=false
```

Dockerfile includes:
- Multi-stage build (dev deps, prod deps, build, runtime)
- Node.js 20 Alpine (small image, production-ready)
- npm ci for reproducible installs

---

## 📦 Tech Stack

### Frontend
- **React** 19 + TypeScript
- **React Router** 7 (file-based routing)
- **React Query** (TanStack Query) - data fetching
- **React Hook Form** + **Zod** - form validation
- **Zustand** - state management (auth store)

### UI & Styling
- **Tailwind CSS** + **Class Variance Authority**
- **Radix UI** - accessible component primitives
- **Lucide React** + **Bootstrap Icons** - icons
- **Framer Motion** - animations
- **Sonner** - toast notifications

### Testing
- **Vitest** - unit testing
- **Playwright** - E2E testing
- **@testing-library/react** - component testing
- **Mock Service Worker** - API mocking

### Build & Infrastructure
- **Vite** - fast bundler
- **React Router Dev** - SSR-ready routing
- **Orval** - OpenAPI code generation
- **Docker** - containerization

---

## 📚 Learning Path

New developers should follow this path:

1. **Week 1**: Understand architecture & project structure
2. **Week 2**: Deep dive into auth module & RBAC
3. **Week 3**: Learn repository pattern & mock/backend switching
4. **Week 4**: Add a new feature (e.g., simple course CRUD)
5. **Week 5**: Master E2E testing & deployment

See [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) for detailed step-by-step instructions.

---

## 🤝 Contributing

### Code Style
- ESLint configured for TypeScript
- Prettier for formatting
- Strict TypeScript (`tsconfig.json`)

### Git Workflow
1. Create feature branch: `git checkout -b feature/auth-improvements`
2. Make changes and test: `npm run test && npm run test:e2e`
3. Commit with meaningful messages
4. Push and open pull request

### Before Committing
```bash
npm run typecheck    # Check types
npm run test         # Run unit tests
npm run test:e2e     # Run E2E tests
```

---

## 📖 Additional Documentation

- [ARCHITECTURE.md](ARCHITECTURE.md) - Deep dive into architecture, layers, and design patterns
- [DEVELOPER_GUIDE.md](DEVELOPER_GUIDE.md) - Step-by-step guide for common tasks
- [SWAGGER_REQUIREMENTS.md](SWAGGER_REQUIREMENTS.md) - Backend API contract specification

---

## 📝 License

Proprietary - School Management System

---

## 🎓 Future Roadmap

### Phase 1 (Q2 2026) - Backend Integration
- [ ] Connect to backend API via OpenAPI
- [ ] Implement token refresh mechanism
- [ ] Add error logging & monitoring

### Phase 2 (Q3 2026) - Admin Dashboard
- [ ] User management interface
- [ ] Analytics & reporting
- [ ] System settings

### Phase 3 (Q4 2026) - CRUD Modules
- [ ] Course management (create, edit, delete)
- [ ] Student enrollment
- [ ] Teacher assignment
- [ ] Attendance tracking

### Phase 4 (Q1 2027) - Advanced Features
- [ ] Real-time notifications
- [ ] File uploads (student work, materials)
- [ ] Parent communication portal
- [ ] API rate limiting & security hardening

---

**Last Updated:** May 2026  
**Maintainer:** Frontend Team  
**Repository:** Internal GitLab

## OpenAPI

- Source schema: `src/shared/openapi/schema.yaml`
- Generated clients: `src/shared/generated/*`
- Tooling:
  - `npm run openapi:types`
  - `npm run openapi:orval`
  - `npm run openapi:generate`

## Tests

- Unit/integration: Vitest + React Testing Library
- API mocking: MSW (`src/test/msw`)
- E2E scaffold: Playwright (`e2e/*.spec.ts`)

## Scripts

- `npm run dev`
- `npm run build`
- `npm run typecheck`
- `npm run test`
- `npm run test:e2e`
- `npm run openapi:generate`
