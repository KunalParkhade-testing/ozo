# 🌱 OZO — Our Zero-waste Option

[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](https://github.com/KunalParkhade-testing/ozo)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)

## 📖 Project Overview

OZO is a modern, full-stack web application designed to promote and facilitate a zero-waste lifestyle. The platform empowers users with comprehensive tools to track their waste reduction efforts, discover sustainable products, and connect with a community passionate about environmental conservation.

## ✨ Features

- 🔐 **User Authentication**: Secure signup, login, and profile management with JWT tokens
- 📊 **Dashboard**: Track waste reduction, recycling efforts, and CO2 savings
- 🛍️ **Product Management**: Discover and interact with sustainable products
- 👥 **Community Features**: Connect with like-minded individuals
- 📱 **Responsive Design**: Optimized for all devices (desktop, tablet, mobile)
- 🎨 **Modern UI**: Clean interface with Tailwind CSS
- 🔒 **Security**: Best practices including password hashing, CORS protection
- 📝 **API Documentation**: Auto-generated OpenAPI/Swagger documentation

## 🛠️ Tech Stack

### Backend
- **FastAPI**: Modern Python web framework
- **SQLAlchemy**: ORM for database operations
- **Alembic**: Database migrations
- **PostgreSQL**: Production database
- **JWT**: Secure authentication
- **Pytest**: Testing framework

### Frontend
- **React 18**: UI library
- **TypeScript**: Type-safe JavaScript
- **Tailwind CSS**: Utility-first CSS framework
- **Vite**: Fast build tool
- **React Router**: Client-side routing
- **Axios**: HTTP client

### DevOps
- **Docker**: Containerization
- **Docker Compose**: Multi-container orchestration
- **GitHub Actions**: CI/CD pipelines

## 📸 Screenshots

### Home Page
![Home Page](https://github.com/user-attachments/assets/75c59863-f436-4f7b-9a5d-d8fb77452cae)

### Signup Page
![Signup Page](https://github.com/user-attachments/assets/98a8800a-c0f6-414b-8a35-b57c1863dd56)

### Login Page
![Login Page](https://github.com/user-attachments/assets/0701c39a-3ed2-47c2-9b1b-cefe09259571)

### Dashboard
![Dashboard](https://github.com/user-attachments/assets/95db4614-d89a-44e8-ad6c-3eede1f51821)

## 🚀 Getting Started

### Prerequisites

- **Docker** and **Docker Compose** (recommended for easy setup)
- **Python 3.11+** (for local backend development)
- **Node.js 18+** and **npm** (for frontend development)
- **PostgreSQL 15** (if not using Docker)

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/KunalParkhade-testing/ozo.git
   cd ozo
   ```

2. **Set up environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker compose up --build
   ```

4. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:8000
   - API Documentation: http://localhost:8000/docs

### Local Development Setup

#### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create virtual environment**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Set up database**
   ```bash
   # Ensure PostgreSQL is running
   # Update DATABASE_URL in .env
   alembic upgrade head
   ```

5. **Run backend server**
   ```bash
   uvicorn app.main:app --reload --host 0.0.0.0 --port 8000
   ```

#### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   # Create .env file
   echo "VITE_API_URL=http://localhost:8000/api/v1" > .env
   ```

4. **Run frontend development server**
   ```bash
   npm run dev
   ```

## 🧪 Testing

### Backend Tests

```bash
cd backend
pytest app/tests/ -v
```

Run tests with coverage:
```bash
pytest --cov=app app/tests/
```

### Frontend Tests

Frontend testing with Jest/Vitest is planned for future implementation. The application currently includes:
- Type safety with TypeScript
- Manual testing via browser
- E2E testing capabilities through the CI pipeline

## 📚 API Documentation

Once the backend is running, visit:
- **Swagger UI**: http://localhost:8000/docs
- **ReDoc**: http://localhost:8000/redoc

## 🏗️ Project Structure

```
ozo/
├── backend/
│   ├── app/
│   │   ├── api/           # API endpoints
│   │   ├── core/          # Core configuration
│   │   ├── crud/          # Database operations
│   │   ├── db/            # Database setup
│   │   ├── models/        # SQLAlchemy models
│   │   ├── schemas/       # Pydantic schemas
│   │   ├── services/      # Business logic
│   │   └── tests/         # Test suite
│   ├── migrations/        # Alembic migrations
│   ├── Dockerfile
│   └── requirements.txt
├── frontend/
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── pages/         # Page components
│   │   ├── services/      # API services
│   │   └── hooks/         # Custom hooks
│   ├── public/
│   ├── Dockerfile
│   └── package.json
├── docker-compose.yml
└── README.md
```

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
DATABASE_URL=postgresql://user:password@db:5432/ozo

# Security
SECRET_KEY=your-secret-key-here
ALGORITHM=HS256
ACCESS_TOKEN_EXPIRE_MINUTES=30

# CORS
ALLOW_ORIGINS=*
```

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

### Code Style

- **Backend**: Follow PEP 8, use Black for formatting
- **Frontend**: Follow Airbnb style guide, use Prettier

### Running Linters

```bash
# Backend
cd backend
black app/
flake8 app/
mypy app/

# Frontend
cd frontend
npm run lint
npm run format
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **Kunal Parkhade** - Initial work

## 🙏 Acknowledgments

- FastAPI for the excellent web framework
- React community for the robust frontend library
- Tailwind CSS for the utility-first CSS framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

---

Made with 💚 for a sustainable future
