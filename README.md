# Teddy Monorepo - NestJS API

A simple monorepo using NX with a NestJS API, PostgreSQL, environment validation with Zod and JWT authentication.

## 🚀 Tech Stack

- **NX** - Monorepo tooling
- **NestJS** - Node.js framework
- **PostgreSQL** - Database
- **TypeORM** - ORM for TypeScript
- **JWT** - Authentication with @nestjs/passport
- **Zod** - Environment variables validation
- **bcrypt** - Password hashing

## 📁 Project Structure

```
teddy-test/
├── teddy-api/                 # Main NestJS application
│   ├── src/
│   │   ├── app/              # Main application module
│   │   ├── auth/             # JWT authentication module
│   │   ├── config/           # Configuration and env validation
│   │   ├── entities/         # Database entities
│   │   └── main.ts           # Application entry point
├── .env                      # Environment variables
└── .env.example              # Environment variables example
```

## 🛠️ Setup

### Option 1: Using Makefile (Easier) ⭐

```bash
# Start application (database + API)
make run

# View application logs
make logs

# Stop all services
make stop

# View all available commands
make help
```

### Option 2: Using Docker Compose Directly

#### 1. Run with Docker Compose

```bash
# Start database and application
docker-compose up --build
```

This command will:

- Start PostgreSQL
- Wait for database to be healthy
- Build and run the NestJS application
- Application will be available at http://localhost:3000/api

#### 2. Stop services

```bash
docker-compose down
```

## 📚 API Documentation

The API includes comprehensive Swagger documentation with detailed endpoint descriptions, request/response schemas, and authentication requirements.

**Access the documentation:**
1. Start the application using one of the methods above
2. Open your browser and navigate to: **http://localhost:3000/api/docs**

The Swagger UI provides:
- Interactive API testing
- Complete endpoint documentation
- Request/response examples
- Authentication setup
- Schema definitions

## Implemented Features

- ✅ NX Monorepo configured
- ✅ NestJS application with TypeScript
- ✅ PostgreSQL integration via TypeORM
- ✅ Environment variables validation with Zod
- ✅ JWT authentication with @nestjs/passport
- ✅ Password hashing with bcrypt
- ✅ DTO validation with class-validator
- ✅ CORS enabled
- ✅ Automatic database synchronization in development
- ✅ Comprehensive Swagger documentation
- ✅ URL Shortener service with click tracking
- ✅ Clean architecture with custom decorators

## 🚀 Future Improvements

The following enhancements could be implemented to further improve the application:

### 🧪 Testing
- **Automated Testing**: Add unit tests, integration tests, and e2e tests
- **Test Coverage**: Implement code coverage reporting
- **Testing Framework**: Jest for unit tests, Supertest for API testing

### 📡 Events & Messaging
- **Event System**: Implement domain events for decoupled architecture
- **Message Queues**: Add Redis/RabbitMQ for background job processing
- **Real-time Updates**: WebSocket integration for live notifications

### 👥 User Management
- **Role-Based Access Control (RBAC)**: Implement user roles (Client, Admin)
- **Permissions System**: Fine-grained permissions for different operations
- **Admin Dashboard**: Administrative interface for user management
- **User Profiles**: Extended user information and preferences

### 🔐 Authentication Providers
- **AWS Cognito**: Enterprise-grade authentication service
- **Firebase Auth**: Google's authentication platform
- **Auth0**: Third-party authentication service
- **OAuth2/OpenID**: Social login (Google, GitHub, Facebook)
- **Multi-Factor Authentication (MFA)**: Enhanced security

### 🔄 CI/CD Pipeline
- **GitHub Actions**: Automated testing and deployment
- **Docker Registry**: Container image management
- **Environment Management**: Staging and production deployments
- **Database Migrations**: Automated schema updates
- **Health Checks**: Application monitoring and alerting
- **Code Quality**: ESLint, Prettier, SonarQube integration
