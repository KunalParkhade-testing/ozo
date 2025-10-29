# OZO Architecture Documentation

## System Overview

OZO is a modern, full-stack web application built with a microservices-oriented architecture, featuring a decoupled frontend and backend.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                         Client Layer                         │
│  ┌──────────────────────────────────────────────────────┐   │
│  │              React SPA (Frontend)                     │   │
│  │  - React 18 + TypeScript                             │   │
│  │  - Tailwind CSS                                       │   │
│  │  - React Router                                       │   │
│  │  - Axios (HTTP Client)                                │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS/HTTP
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      API Gateway / NGINX                     │
│  - Reverse Proxy                                             │
│  - SSL Termination                                           │
│  - Load Balancing                                            │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                      Backend (FastAPI)                       │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  API Layer (app/api/v1/)                             │   │
│  │  - REST Endpoints                                     │   │
│  │  - Request/Response Validation                        │   │
│  │  - Authentication Middleware                          │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Business Logic Layer (app/services/)                │   │
│  │  - Authentication Service                             │   │
│  │  - User Management                                    │   │
│  │  - Data Processing                                    │   │
│  └──────────────────────────────────────────────────────┘   │
│  ┌──────────────────────────────────────────────────────┐   │
│  │  Data Access Layer (app/crud/)                       │   │
│  │  - Database Operations                                │   │
│  │  - Query Optimization                                 │   │
│  └──────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Database (PostgreSQL)                     │
│  - User Data                                                 │
│  - Application State                                         │
│  - Transactional Data                                        │
└─────────────────────────────────────────────────────────────┘
```

## Technology Stack

### Frontend
- **React 18**: Component-based UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool and dev server
- **React Router**: Client-side routing
- **Axios**: Promise-based HTTP client

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: SQL toolkit and ORM
- **Alembic**: Database migration tool
- **Pydantic**: Data validation using Python type hints
- **python-jose**: JWT token handling
- **passlib**: Password hashing
- **PostgreSQL**: Relational database

### Infrastructure
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **Nginx**: Reverse proxy and static file serving
- **GitHub Actions**: CI/CD pipelines

## Backend Architecture

### Layered Architecture

```
┌─────────────────────────────────────────┐
│          API Endpoints (api/)           │
│  - Route definitions                    │
│  - Request/response handling            │
│  - Dependency injection                 │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Schemas (schemas/)              │
│  - Request/response models              │
│  - Data validation                      │
│  - Type definitions                     │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│      Business Logic (services/)         │
│  - Authentication                       │
│  - Authorization                        │
│  - Business rules                       │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│      Data Access (crud/)                │
│  - Database queries                     │
│  - CRUD operations                      │
│  - Query optimization                   │
└─────────────────────────────────────────┘
              │
              ▼
┌─────────────────────────────────────────┐
│         Models (models/)                │
│  - SQLAlchemy models                    │
│  - Database schema                      │
│  - Relationships                        │
└─────────────────────────────────────────┘
```

### Key Components

#### Authentication Flow
1. User submits credentials
2. Backend validates credentials
3. JWT token generated and returned
4. Frontend stores token in localStorage
5. Token included in subsequent requests via Authorization header
6. Backend validates token on protected routes

#### Database Schema

**Users Table**
```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR UNIQUE NOT NULL,
    email VARCHAR UNIQUE NOT NULL,
    full_name VARCHAR,
    hashed_password VARCHAR NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);
```

## Frontend Architecture

### Component Structure

```
src/
├── components/        # Reusable UI components
│   ├── Header.tsx
│   └── ...
├── pages/            # Page-level components
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── Signup.tsx
│   └── Dashboard.tsx
├── services/         # API integration
│   └── api.ts
├── hooks/            # Custom React hooks
│   └── useAuth.ts
└── App.tsx           # Root component with routing
```

### State Management
- **Local State**: React hooks (useState, useEffect)
- **Authentication**: localStorage for token storage
- **API Calls**: Axios with interceptors for token injection

## Security

### Backend Security
- **Password Hashing**: bcrypt via passlib
- **JWT Tokens**: Secure token generation and validation
- **CORS**: Configured to allow specific origins
- **SQL Injection Prevention**: SQLAlchemy ORM
- **Input Validation**: Pydantic schemas

### Frontend Security
- **XSS Prevention**: React's built-in escaping
- **Token Storage**: Currently using localStorage (consider HttpOnly cookies for enhanced security)
- **Input Sanitization**: Form validation before submission

### Security Recommendations for Production
- Implement CSRF protection for state-changing operations
- Migrate from localStorage to HttpOnly cookies for token storage
- Add rate limiting on authentication endpoints
- Implement API key authentication for service-to-service calls
- Set up regular security audits

## API Design

### RESTful Principles
- Resource-based URLs
- HTTP methods for operations (GET, POST, PUT, DELETE)
- Proper status codes
- JSON request/response format

### Versioning
- API versioned via URL path (`/api/v1/`)
- Allows backward compatibility

### Documentation
- Auto-generated with FastAPI
- Available at `/docs` (Swagger UI) and `/redoc`

## Deployment

### Docker Deployment
```yaml
services:
  backend:   # FastAPI application
  frontend:  # Nginx serving React build
  db:        # PostgreSQL database
```

### Environment Configuration
- `.env` files for environment-specific settings
- Separate configs for dev, staging, production

## Performance Considerations

### Backend
- Database connection pooling
- Query optimization with indexes
- Async operations where possible
- Response caching (to be implemented)

### Frontend
- Code splitting with React Router
- Lazy loading of components
- Production build optimization (minification, tree-shaking)
- CDN for static assets (planned)

## Monitoring & Logging

### Backend
- Structured logging with Python's logging module
- Error tracking (to be implemented)
- Performance monitoring (to be implemented)

### Frontend
- Console error logging
- Analytics (to be implemented)

## Future Enhancements

1. **Real-time Features**: WebSocket support for live updates
2. **Caching Layer**: Redis for session management and caching
3. **Search**: Elasticsearch for advanced search capabilities
4. **Message Queue**: Celery for background tasks
5. **Microservices**: Break down into smaller services as needed
6. **CDN**: Content delivery network for static assets
7. **Monitoring**: Prometheus + Grafana for metrics
8. **Logging**: ELK stack for centralized logging

## Testing Strategy

### Backend
- Unit tests for business logic
- Integration tests for API endpoints
- Database tests with in-memory SQLite

### Frontend
- Component tests with React Testing Library
- End-to-end tests with Playwright (to be implemented)

## Development Workflow

1. Local development with hot reload
2. Git branch per feature
3. Pull request with CI checks
4. Code review
5. Merge to main
6. Automated deployment (to be configured)
