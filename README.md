# iTax Easy - Frontend Application

A comprehensive tax management and accounting platform built with Next.js 14, providing features for GST returns, ITR filing, invoice management, financial calculators, and more.

> This is the frontend application. The backend API is maintained in a separate repository.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
  - [Manual Setup](#manual-setup)
  - [Docker Setup](#docker-setup)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Key Features](#key-features)
- [Deployment](#deployment)

## Features

### Public Features
- E-Library with legal documents and case laws
- Easy Services (GST Links, Income Tax Links, Bank Links, MCA, Aadhaar Links)
- Financial Calculators (Bank, Income Tax, GST, Investment, Loan, Insurance)
- Blog and Articles
- Startup Registration Services
- API Documentation

### Dashboard Features
- GST Return Filing (GSTR-1, multiple forms)
- Income Tax Return (ITR) Filing
- Invoice Management (Sales, Purchase, Returns)
- Accounts & Ledger Management
- Loan Applications
- Insurance Management
- Payment Processing (Razorpay Integration)
- Project Reports & Analytics
- Bill Payments (Electricity, Mobile, Gas)
- User & Business Profile Management

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **UI Library**: React 18
- **State Management**: Redux Toolkit
- **Styling**: Tailwind CSS, Styled Components
- **Forms**: React Hook Form, Formik, Yup/Zod validation
- **Database ORM**: Prisma (PostgreSQL)
- **PDF Generation**: jsPDF, @react-pdf/renderer, pdf-lib
- **Charts**: Chart.js, Recharts
- **Payment Gateway**: Razorpay
- **Excel Operations**: ExcelJS, xlsx-js-style
- **Animations**: Framer Motion
- **Other Libraries**: Axios, Moment.js, React Icons, React Toastify

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js**: v16.x or v18.x (recommended)
- **npm**: v8.x or higher (comes with Node.js)
- **Git**: For cloning the repository
- **Docker** (optional): For containerized deployment
- **PostgreSQL**: v12 or higher (for local development)

## Getting Started

### Manual Setup

#### 1. Clone the Repository

```bash
git clone <repository-url>
cd itax_next_main
```

#### 2. Install Dependencies

```bash
npm install
```

If you encounter peer dependency issues:

```bash
npm install --legacy-peer-deps
```

#### 3. Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit the `.env` file with your configuration. See [Environment Variables](#environment-variables) section for details.

#### 4. Setup Database

Ensure PostgreSQL is running and update the `DATABASE_URL` in your `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/itax_db"
```

Generate Prisma client and push database schema:

```bash
npm run generate  # Generate Prisma Client
npm run db        # Push database schema
```

#### 5. Run Development Server

```bash
npm run dev
```

The application will be available at [http://localhost:3001](http://localhost:3001)

#### 6. Build for Production

```bash
npm run build
npm start
```

### Docker Setup

#### 1. Using Docker Compose (Recommended)

Create a `.env` file with your configuration:

```bash
cp .env.example .env
```

Build and run the container:

```bash
docker-compose up -d
```

The application will be available at [http://localhost:3001](http://localhost:3001)

Stop the container:

```bash
docker-compose down
```

#### 2. Using Dockerfile Only

Build the Docker image:

```bash
docker build \
  --build-arg NEXT_PUBLIC_BASE_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_BACKEND_URL=http://localhost:8000 \
  --build-arg NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key \
  -t itax-next-app .
```

Run the container:

```bash
docker run -p 3001:3001 \
  -e DATABASE_URL="your_database_url" \
  itax-next-app
```

## Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Application Port
APP_PORT=3001

# Database
DATABASE_URL="postgresql://username:password@localhost:5432/itax_db"

# Backend API URLs
NEXT_PUBLIC_BASE_URL=http://localhost:8000
NEXT_PUBLIC_URL=http://localhost:8000
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_BACK_URL=http://localhost:8000
NEXT_PUBLIC_PAY_URL=http://localhost:8000
NEXT_PUBLIC_BLAZ_URL=
NEXT_PUBLIC_MOM_ITAX_URL=
NEXT_PUBLIC_LARAVEL_ITAX_URL=

# Google Maps API
NEXT_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

# Razorpay Payment Gateway
NEXT_PUBLIC_RAZORPAY_KEY_ID=your_razorpay_key_id
RAZORPAY_KEY_SECRET=your_razorpay_secret

# JWT Secret
NEXT_PUBLIC_WEB_TOKEN=your_jwt_secret_key
JWT_SECRET=your_secret_key
```

### Important Notes:

- `NEXT_PUBLIC_*` variables are exposed to the browser
- All backend URLs should point to your backend API server
- Razorpay keys are required for payment functionality
- Database URL must be a valid PostgreSQL connection string

## Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server on port 3001 |
| `npm run build` | Build the application for production |
| `npm start` | Start production server on port 3001 |
| `npm run lint` | Run ESLint to check code quality |
| `npm run format` | Check code formatting with Prettier |
| `npm run format:fix` | Fix code formatting issues |
| `npm run generate` | Generate Prisma Client |
| `npm run db` | Push Prisma schema to database |

## Project Structure

```
itax_next_main/
├── app/                    # Next.js app directory (App Router)
├── public/                 # Static assets
├── prisma/                 # Prisma schema and migrations
│   └── schema.prisma      # Database schema
├── src/                    # Source code (if applicable)
│   ├── components/        # React components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Utility libraries
│   └── redux/            # Redux store and slices
├── .env.example           # Environment variables template
├── .dockerignore          # Docker ignore file
├── docker-compose.yml     # Docker Compose configuration
├── Dockerfile             # Docker configuration
├── next.config.js         # Next.js configuration
├── tailwind.config.js     # Tailwind CSS configuration
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## Key Features

### Authentication & Authorization
- User registration and login
- Role-based access control (Normal, Admin, Super Admin, Agent)
- JWT-based authentication
- OTP verification

### Invoice & Billing
- Create and manage invoices (Sales/Purchase)
- Invoice items with GST calculation
- Party/Customer management
- Payment tracking

### GST Management
- Multiple GSTR-1 forms (4A, 5A, 6A, 7B, 8ABCD, 9B, 11A, 11B, 12HSN)
- State-wise GST calculations
- HSN code management

### Financial Management
- Ledger accounts
- Journal entries
- Transaction tracking
- Accounts receivable/payable

### Loan Management
- Multiple loan types (Personal, Education, Home, Business, Car, Property)
- Document upload and verification
- Application tracking
- Agent assignment

### Reports & Analytics
- Project reports
- Business analytics
- Financial statements
- Export to PDF/Excel

### Payment Integration
- Razorpay payment gateway
- Subscription management
- Order tracking

## Deployment

### Production Deployment

1. Set all environment variables in your hosting platform
2. Build the application:
   ```bash
   npm run build
   ```
3. Start the production server:
   ```bash
   npm start
   ```

### Docker Deployment

1. Build the Docker image with production environment variables
2. Deploy to your container orchestration platform (Kubernetes, ECS, etc.)

### Current Hosting
- Platform: GoDaddy
- Domain: itaxeasy.com

## Backend Repository

The backend API for this application is maintained separately. Contact the development team for access.

Backend URL: [api.itaxeasy.com](https://api.itaxeasy.com)

## Support

For issues, questions, or contributions, please contact the development team.

## License

Private - All rights reserved

# itax-easy-main
