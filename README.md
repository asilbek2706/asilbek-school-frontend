# My Courses Frontend

Enterprise-ready React + TypeScript frontend with repository-driven data access, mock/backend switching, RBAC scaffolding, OpenAPI generation prep, and dashboard/CMS expansion points.

## Architecture

- `src/app`: providers, router guards, app config
- `src/pages`: page-level composition (UI contracts remain stable)
- `src/widgets`: reusable visual sections
- `src/features`: domain behavior (auth, github-auth, profile, dashboard, etc.)
- `src/entities`: domain models (course, faq, ...)
- `src/shared`: platform layer (api, mocks, openapi, generated, constants, utils, services)

## Mock and Backend Switch

- Switch flag: `VITE_USE_MOCK=true|false`
- Decision point: repository layer only
- Contract shape:
  - `success`
  - `data`
  - `pagination`
  - `meta`
  - `errors`

When backend arrives, update only:

- `src/shared/services/repositories/*`
- `src/shared/api/http.ts`
- `src/shared/generated/*`
- `src/shared/openapi/schema.yaml`

UI layers (`pages/widgets/features` components, forms, layouts, hooks signatures, routes) remain unchanged.

## Auth and Session

- Auth logic moved to service/repository boundaries
- Cookie-first session adapter (`session.adapter.ts`)
- Session lifecycle APIs prepared: restore, refresh, revoke, rotation prep
- GitHub OAuth architecture is backend-driven (frontend never owns secrets)

## RBAC

- Roles: `admin`, `teacher`, `student`, `parent`
- Permission matrix in `src/app/config/rbac.ts`
- Guards:
  - `ProtectedRoute`
  - `PublicRoute`
  - `RoleRoute`
  - `PermissionRoute`

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
