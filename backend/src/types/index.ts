export interface User {
  id: string;
  email: string;
  role: 'student' | 'examiner' | 'admin';
  name: string;
  studentId?: string;
}

export interface ReevaluationRequest {
  id: string;
  studentId: string;
  studentName: string;
  subject: string;
  examDate: Date;
  reason: string;
  status: 'draft' | 'submitted' | 'under_review' | 'approved' | 'rejected';
  examinerComments?: string;
  originalMarks?: number;
  revisedMarks?: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

export interface LoginRequest {
  email: string;
  password: string;
  role: 'student' | 'examiner' | 'admin';
}

export interface CreateRequestPayload {
  subject: string;
  examDate: string;
  reason: string;
  originalMarks?: number;
}

export interface UpdateRequestPayload {
  status: 'under_review' | 'approved' | 'rejected';
  examinerComments?: string;
  revisedMarks?: number;
}