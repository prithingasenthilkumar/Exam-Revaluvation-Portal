# Exam Re-evaluation Portal - Backend

A TypeScript-based Node.js backend for the Exam Re-evaluation Request & Approval Portal.

## Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/         # API route definitions
├── services/       # Business logic services
├── middleware/     # Custom middleware
└── types/          # TypeScript type definitions
```

## Setup & Installation

1. Install dependencies:
```bash
npm install
```

2. Build the project:
```bash
npm run build
```

3. Start development server:
```bash
npm run dev
```

4. Start production server:
```bash
npm start
```

## Available Endpoints

- **Health Check**: `GET /health`
- **Auth**: `POST /api/v1/auth/login`, `POST /api/v1/auth/logout`
- **Student**: `GET /api/v1/student/dashboard`, `GET|POST /api/v1/student/requests`
- **Examiner**: `GET /api/v1/examiner/queue`, `GET|PUT /api/v1/examiner/requests/:id`
- **Admin**: `GET /api/v1/admin/dashboard`, `GET /api/v1/admin/requests`

## Environment Variables

- `PORT`: Server port (default: 5000)
- `NODE_ENV`: Environment mode (development/production)
- `API_PREFIX`: API base path (default: /api/v1)