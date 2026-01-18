# Exam Re-evaluation Portal - Frontend Only

This project is implemented using frontend technologies only, without a backend server. All application data is managed using the browser's localStorage with direct service calls.

## Architecture

- **No API Layer**: Direct localStorage service calls from components
- **No HTTP Requests**: All data operations use browser localStorage
- **Simple Authentication**: Token-based auth using localStorage

## Data Storage Structure

### Authentication Data
- **Key**: `token` - Simple token for session management
- **Key**: `user` - Current logged-in user information

### Core Application Data
- **Key**: `users` - Array of all user accounts (students, examiners, admins)
- **Key**: `requests` - Array of all re-evaluation requests
- **Key**: `exams` - Array of available exam subjects

## Demo Accounts

The application comes with pre-configured demo accounts:

| Role | Email | Password |
|------|-------|----------|
| Student | student@example.com | password123 |
| Examiner | examiner@example.com | password123 |
| Admin | admin@example.com | password123 |

## Features by Role

### Student
- Submit re-evaluation requests
- View request history
- Edit pending requests
- Track request status

### Examiner
- View pending requests queue
- Review and approve/reject requests
- Add comments and revised marks

### Admin
- Monitor all requests
- View system statistics
- Manage overall workflow

## Running the Application

1. Install dependencies:
   ```bash
   cd frontend
   npm install
   ```

2. Start the development server:
   ```bash
   npm start
   ```

3. Access the application at `http://localhost:3000`

## Data Persistence

All data is stored in browser localStorage with the following structure:

```javascript
// Users array
localStorage.users = [
  {
    id: string,
    email: string,
    password: string,
    name: string,
    role: 'student' | 'examiner' | 'admin',
    createdAt: string
  }
]

// Requests array
localStorage.requests = [
  {
    id: string,
    studentId: string,
    studentName: string,
    studentEmail: string,
    subject: string,
    examDate: string,
    reason: string,
    documents: string[],
    status: 'pending' | 'under_review' | 'approved' | 'rejected',
    examinerId?: string,
    examinerName?: string,
    examinerComments?: string,
    revisedMarks?: number,
    createdAt: string,
    updatedAt: string,
    reviewedAt?: string
  }
]

// Exams array
localStorage.exams = [
  {
    id: string,
    subject: string,
    code: string
  }
]
```

## Development Notes

- This approach is for academic and demonstration purposes only
- In production, all data would be handled by a secure backend server
- Authentication is simulated using localStorage tokens
- No real file upload functionality (document names are stored as strings)
- Data persists only in the current browser session/localStorage

## Clearing Data

To reset the application data, open browser console and run:
```javascript
localStorage.clear()
```

Then refresh the page to reinitialize with demo data.