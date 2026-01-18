import { User, ReevaluationRequest } from '../types';

// In-memory data store
export class DataStore {
  private static instance: DataStore;
  private users: User[] = [];
  private requests: ReevaluationRequest[] = [];

  private constructor() {
    this.initializeData();
  }

  static getInstance(): DataStore {
    if (!DataStore.instance) {
      DataStore.instance = new DataStore();
    }
    return DataStore.instance;
  }

  private initializeData() {
    // Sample users
    this.users = [
      { id: '1', email: 'student@university.edu', role: 'student', name: 'John Student', studentId: 'STU001' },
      { id: '2', email: 'examiner@university.edu', role: 'examiner', name: 'Dr. Smith' },
      { id: '3', email: 'admin@university.edu', role: 'admin', name: 'Admin User' }
    ];

    // Sample requests
    this.requests = [
      {
        id: 'RE-2024-001',
        studentId: '1',
        studentName: 'John Student',
        subject: 'Mathematics',
        examDate: new Date('2024-01-15'),
        reason: 'Calculation error in question 5',
        status: 'submitted',
        originalMarks: 75,
        createdAt: new Date('2024-01-10'),
        updatedAt: new Date('2024-01-10')
      },
      {
        id: 'RE-2024-002',
        studentId: '1',
        studentName: 'John Student',
        subject: 'Physics',
        examDate: new Date('2024-01-20'),
        reason: 'Answer key discrepancy',
        status: 'under_review',
        originalMarks: 68,
        examinerComments: 'Under review by examiner',
        createdAt: new Date('2024-01-12'),
        updatedAt: new Date('2024-01-13')
      }
    ];
  }

  // User methods
  findUserByEmail(email: string): User | undefined {
    return this.users.find(user => user.email === email);
  }

  findUserById(id: string): User | undefined {
    return this.users.find(user => user.id === id);
  }

  // Request methods
  getAllRequests(): ReevaluationRequest[] {
    return this.requests;
  }

  getRequestsByStudent(studentId: string): ReevaluationRequest[] {
    return this.requests.filter(req => req.studentId === studentId);
  }

  getRequestById(id: string): ReevaluationRequest | undefined {
    return this.requests.find(req => req.id === id);
  }

  createRequest(request: Omit<ReevaluationRequest, 'id' | 'createdAt' | 'updatedAt'>): ReevaluationRequest {
    const newRequest: ReevaluationRequest = {
      ...request,
      id: `RE-2024-${String(this.requests.length + 1).padStart(3, '0')}`,
      createdAt: new Date(),
      updatedAt: new Date()
    };
    this.requests.push(newRequest);
    return newRequest;
  }

  updateRequest(id: string, updates: Partial<ReevaluationRequest>): ReevaluationRequest | null {
    const requestIndex = this.requests.findIndex(req => req.id === id);
    if (requestIndex !== -1) {
      this.requests[requestIndex] = {
        ...this.requests[requestIndex],
        ...updates,
        updatedAt: new Date()
      };
      return this.requests[requestIndex];
    }
    return null;
  }

  updateRequestStatus(id: string, status: ReevaluationRequest['status'], examinerComments?: string, revisedMarks?: number): ReevaluationRequest | null {
    const request = this.getRequestById(id);
    if (request) {
      request.status = status;
      request.updatedAt = new Date();
      if (examinerComments) request.examinerComments = examinerComments;
      if (revisedMarks !== undefined) request.revisedMarks = revisedMarks;
      return request;
    }
    return null;
  }

  getRequestsByStatus(status: ReevaluationRequest['status']): ReevaluationRequest[] {
    return this.requests.filter(req => req.status === status);
  }

  deleteRequest(id: string): boolean {
    const index = this.requests.findIndex(req => req.id === id);
    if (index !== -1) {
      this.requests.splice(index, 1);
      return true;
    }
    return false;
  }
}