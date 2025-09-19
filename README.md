# Nest Backend Test

A NestJS backend application with PostgreSQL database and AWS S3 integration for managing extensions.

## Features

- 🚀 **NestJS Framework** - Modern Node.js framework
- 🗄️ **PostgreSQL Database** - With Prisma ORM
- ☁️ **AWS S3 Integration** - For file storage
- 📝 **Swagger Documentation** - Auto-generated API docs
- 🛡️ **Security** - Helmet middleware for security headers
- ✅ **Validation** - Request validation with class-validator
- 🧪 **Testing** - Jest testing framework

## Tech Stack

- **Framework**: NestJS
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Cloud Storage**: AWS S3
- **Documentation**: Swagger/OpenAPI
- **Testing**: Jest
- **Package Manager**: pnpm

## Prerequisites

- Node.js (v18 or higher)
- PostgreSQL database
- AWS S3 account and credentials
- pnpm package manager

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/timiwritescode/nest-backend-test.git
cd nest-backend-test
```

### 2. Install dependencies
```bash
pnpm install
```

### 3. Environment Configuration
Create a `.env` file in the root directory:
```env
# Database
DATABASE_URL="postgresql://username:password@localhost:5432/db"

# AWS S3 (optional)
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=your_region
AWS_S3_BUCKET=your_bucket_name

# Server
PORT=3000
NODE_ENV=development
LIVE_URL=http://localhost:3000/healthcheck
```

### 4. Database Setup
```bash
# Generate Prisma client
npx prisma generate

# Run database migrations
npx prisma db push

# Seed database (optional)
npx prisma db seed
```

### 5. Start the Application

**Development mode:**
```bash
pnpm run start:dev
```

**Production build:**
```bash
pnpm run build
pnpm run start:prod
```

## API Documentation

Once the server is running, access the Swagger documentation at:
```
http://localhost:3000/docs
```

## API Endpoints

### Base URL
- Development: `http://localhost:3000/api/v1`
- Health Check: `http://localhost:3000/healthcheck`

### Extensions
- `GET /api/v1/extensions` - List all extensions
- `POST /api/v1/extensions` - Create new extension
- `GET /api/v1/extensions/:id` - Get extension by ID
- `PUT /api/v1/extensions/:id` - Update extension
- `DELETE /api/v1/extensions/:id` - Delete extension

## Database Schema

### Extension Model
```prisma
model Extension {
  id          String            @id @default(uuid())
  name        String
  description String?           @db.Text
  status      ExtensionStatus   @default(inactive)
  avatarURL   String?           @db.Text
  createdAt   DateTime          @default(now())
  updatedAt   DateTime          @updatedAt
}

enum ExtensionStatus {
  active
  inactive
}
```

## Scripts

```bash
# Development
pnpm run start:dev          # Start in watch mode

# Production
pnpm run build              # Build the application
pnpm run start:prod          # Start production server

# Database
npx prisma generate          # Generate Prisma client
npx prisma db push           # Push schema to database
npx prisma db seed           # Seed database
npx prisma studio            # Open Prisma Studio

# Testing
npx jest                     # Run tests
```

## Project Structure

```
src/
├── api/
│   └── extensions/          # Extensions module
├── config/                  # Configuration files
├── core/
│   ├── filters/            # Global filters
│   ├── pipes/              # Custom pipes
│   └── prisma/             # Prisma service
├── shared/
│   ├── dtos/               # Data Transfer Objects
│   ├── services/           # Shared services
│   └── utils/              # Utility functions
├── app.module.ts           # Root module
└── main.ts                 # Application entry point
```
