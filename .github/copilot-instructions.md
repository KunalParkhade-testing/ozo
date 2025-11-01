# OZO - Copilot Instructions

## Project Overview
OZO is a full-stack zero-waste lifestyle application with a FastAPI backend and React/TypeScript frontend, running in Docker containers.

## Architecture

### Backend Structure (`backend/app/`)
- **Layered architecture**: `api/` → `services/` → `crud/` → `models/`
- **API versioning**: All endpoints under `/api/v1/` prefix
- **Authentication**: JWT tokens via email/password (not username), stored in `localStorage` on frontend
- **Database**: PostgreSQL in prod, SQLite in-memory for tests
- **Configuration**: Custom `Settings` class using `os.getenv()` (NOT Pydantic BaseSettings) in `core/config.py`

### Frontend Structure (`frontend/src/`)
- **Routing**: React Router with protected routes via Dashboard component
- **API client**: Axios with interceptor auto-injecting Bearer tokens from `localStorage`
- **State**: React hooks (no Redux/Zustand), `useAuth` hook wraps auth state
- **Styling**: Tailwind CSS utility classes, responsive design pattern in all pages

## Critical Patterns

### Backend

**SQLAlchemy 2.0+ style** - Always use:
```python
from sqlalchemy import select
result = db.execute(select(User).where(User.email == email))
# NOT: db.query(User).filter(...)
```

**Testing setup** requires `StaticPool`:
```python
engine = create_engine("sqlite:///:memory:", poolclass=StaticPool)
```
Import models in `conftest.py` before `Base.metadata.create_all()` to register tables.

**Authentication flow**:
1. Login with email (NOT username) at `/auth/login`
2. Returns `{"access_token": "...", "token_type": "bearer"}`
3. Frontend sends as `Authorization: Bearer <token>`
4. Backend validates via `get_current_user` dependency

**CRUD pattern** - Always hash passwords in `crud/user.py`:
```python
hashed = get_password_hash(user.password)
db_user = User(..., hashed_password=hashed)
```

**Error handling** - Use status constants and string detail:
```python
raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Email already registered")
# Always use status.HTTP_* constants, never magic numbers
# Error response format: {"detail": "message string"}
```

**Common error patterns**:
- `400 BAD_REQUEST`: Client error (duplicate email, invalid input)
- `401 UNAUTHORIZED`: Authentication failure (invalid credentials)
- `404 NOT_FOUND`: Resource doesn't exist (user not found)

### Frontend

**API calls** - Use centralized `services/api.ts`:
```typescript
export const login = async (credentials: LoginCredentials): Promise<TokenResponse> => {
  const response = await api.post<TokenResponse>('/auth/login', credentials);
  return response.data;
};
```

**Protected routes** - Check token in component:
```typescript
useEffect(() => {
  const token = localStorage.getItem('token');
  if (!token) navigate('/login');
}, []);
```

**Form handling** - Always include loading states:
```typescript
const [loading, setLoading] = useState(false);
const [error, setError] = useState('');
```

## Development Workflow

### Starting Development
```bash
# Full stack with Docker
docker compose up --build

# Backend only (local dev)
cd backend
source venv/bin/activate  # Create if needed: python -m venv venv
pip install -r requirements.txt
alembic upgrade head  # Run migrations
uvicorn app.main:app --reload --port 8000

# Frontend only
cd frontend
npm install
npm run dev  # Runs on port 3000
```

### Running Tests
```bash
# Backend - runs in-memory SQLite
cd backend
pytest app/tests/ -v
pytest --cov=app app/tests/  # With coverage

# Test markers available: @pytest.mark.integration, @pytest.mark.unit
```

### Database Migrations
```bash
cd backend
# Create: alembic revision -m "description"
# Apply: alembic upgrade head
# Rollback: alembic downgrade -1
```

### Code Quality
```bash
# Backend
black app/  # Format
flake8 app/  # Lint
mypy app/  # Type check

# Frontend
npm run lint
npm run format
```

## Project-Specific Conventions

### Backend
- **No timestamps**: User model has no `created_at`/`updated_at` fields (add if needed)
- **Settings pattern**: Use `settings.VARIABLE` not environment variables directly
- **Schema naming**: `UserCreate` for input, `UserOut` for responses
- **Health checks**: `/health` endpoint exists for monitoring
- **Root endpoint**: `/` returns stable message for tests/health

### Frontend
- **Import paths**: Use relative imports (`./components/Header`), no path aliases configured
- **Environment vars**: Prefix with `VITE_` (e.g., `VITE_API_URL`)
- **Component style**: Functional components with hooks, no class components
- **Error display**: Show error messages in red text below forms
- **Navigation**: Use `navigate()` from `useNavigate()` hook

### Docker
- **PostgreSQL version**: Fixed at `postgres:15` (not 18) to avoid disk format issues
- **Service dependencies**: Frontend → Backend → DB via `depends_on`
- **Volume mounts**: Source code mounted for hot reload in dev
- **Health checks**: All services have health check configurations

## Common Tasks

### Adding a New Endpoint
1. Create schema in `backend/app/schemas/`
2. Add CRUD function in `backend/app/crud/`
3. Create endpoint in `backend/app/api/v1/endpoints/`
4. Register router in `backend/app/api/v1/__init__.py`
5. Add frontend service function in `frontend/src/services/api.ts`

### Adding a New Database Model
1. Create model in `backend/app/models/`
2. Import in `backend/app/db/base.py`
3. Create migration: `alembic revision -m "add_table"`
4. Write upgrade/downgrade in migration file
5. Apply: `alembic upgrade head`

### Adding a Protected Route
1. Create page component in `frontend/src/pages/`
2. Add route in `frontend/src/App.tsx`
3. Add token check in component's `useEffect`
4. Redirect to `/login` if no token

## Security Considerations

### Current Implementation
- **Token storage**: Currently using `localStorage` for JWT tokens
- **CORS**: Set to `["*"]` in development
- **No CSRF protection**: State-changing operations not protected

### Production Migration Path
1. **Priority**: Migrate from `localStorage` to HttpOnly cookies for token storage
2. **Add**: CSRF protection for state-changing operations (POST, PUT, DELETE)
3. **Restrict**: CORS to specific origins via `ALLOW_ORIGINS` environment variable
4. **Implement**: Rate limiting on authentication endpoints
5. **Add**: Request logging and monitoring

## Known Quirks
- **Test isolation**: Each test gets transactional rollback via `db_session` fixture
- **Makefile commands**: Use `docker-compose` not `docker compose` (older syntax)
- **PostgreSQL version**: Pinned to 15 to avoid disk format compatibility issues

## External Dependencies
- **PostgreSQL 15**: Database (use `pg_isready` for health checks)
- **Node 18+**: Frontend build (use `npm` not `yarn`)
- **Python 3.11+**: Backend runtime

## Testing Best Practices

### Backend Testing Patterns
- **Test isolation**: Each test uses `db_session` fixture with transactional rollback
- **Database**: In-memory SQLite with `StaticPool` (see `conftest.py`)
- **Test naming**: `test_*.py` files, `test_*` functions
- **Markers**: Use `@pytest.mark.integration` or `@pytest.mark.unit` where appropriate
- **AAA pattern**: Arrange, Act, Assert structure
- **Error testing**: Check both status code AND error message content

### Test Coverage Requirements
- New endpoints: Test success case, validation errors, 404s
- Authentication: Test with/without token, expired tokens
- CRUD operations: Test create, read, update, delete, and duplicates
- Edge cases: Empty inputs, missing fields, invalid types

## Code Review Checklist

Before submitting PRs, verify:

### Backend
- [ ] Passwords hashed in CRUD layer, not endpoints
- [ ] Using `email` for authentication (not username)
- [ ] Status constants used (`status.HTTP_*`, not magic numbers)
- [ ] SQLAlchemy 2.0 syntax (`select()`, not `.query()`)
- [ ] Tests included for new endpoints/features
- [ ] Database migrations created and tested (`alembic`)
- [ ] Error responses include descriptive `detail` messages
- [ ] Type hints on function signatures

### Frontend
- [ ] Protected routes check for token in `useEffect`
- [ ] Loading states during async operations
- [ ] Error messages displayed to users
- [ ] Forms include validation
- [ ] TypeScript types defined (no `any`)
- [ ] API calls use centralized `services/api.ts`
- [ ] Responsive design with Tailwind utilities

### General
- [ ] Conventional commit message (`feat:`, `fix:`, etc.)
- [ ] No hardcoded secrets or environment variables
- [ ] Documentation updated if behavior changes
- [ ] All tests passing locally

## When Adding Features
- Add tests in `backend/app/tests/` following `test_*.py` naming
- Update API docs automatically via FastAPI decorators (no manual OpenAPI edits)
- Keep environment configs in `.env` file (copy from `.env.example`)
- Follow conventional commits: `feat:`, `fix:`, `docs:`, etc.
