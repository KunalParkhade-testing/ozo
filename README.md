# OZO — Our Zero-waste Option

## Project Overview
OZO is a full-stack web application designed to promote and facilitate a zero-waste lifestyle. The application provides users with tools to manage their waste, find sustainable products, and connect with a community focused on reducing environmental impact.

## Tech Stack
- **Backend**: FastAPI
- **Frontend**: React with TypeScript and Tailwind CSS
- **Database**: PostgreSQL
- **Containerization**: Docker

## Features
- User authentication (signup, login, and profile management)
- Product management (viewing and interacting with sustainable products)
- Dashboard for users to track their waste reduction efforts
- Responsive design for optimal user experience on all devices

## Getting Started

### Prerequisites
- Docker and Docker Compose installed on your machine
- Node.js and npm (for the frontend)

### Setup Instructions

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ozo
   ```

2. **Set up the backend**
   - Navigate to the backend directory:
     ```bash
     cd backend
     ```
   - Install dependencies:
     ```bash
     pip install -r requirements.txt
     ```
   - Run the backend using Docker:
     ```bash
     docker-compose up backend
     ```

3. **Set up the frontend**
   - Navigate to the frontend directory:
     ```bash
     cd frontend
     ```
   - Install dependencies:
     ```bash
     npm install
     ```
   - Run the frontend:
     ```bash
     npm run dev
     ```

4. **Database Migration**
   - Ensure the PostgreSQL service is running.
   - Run migrations using Alembic:
     ```bash
     alembic upgrade head
     ```

### Usage
- Access the application at `http://localhost:3000` for the frontend.
- The backend API can be accessed at `http://localhost:8000`.

## Contributing
Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License
This project is licensed under the MIT License. See the LICENSE file for details.
