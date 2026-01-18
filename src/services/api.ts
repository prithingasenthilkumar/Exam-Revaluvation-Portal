// API service layer for external API calls
// Currently using localStorage, but structured for future API integration

interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginRequest {
  email: string;
  password: string;
  role: string;
}

interface CreateRequestData {
  subject: string;
  examDate: string;
  reason: string;
  documents?: string[];
}

class ApiService {
  private baseUrl: string;

  constructor() {
    this.baseUrl = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';
  }

  // Auth endpoints
  async login(credentials: LoginRequest): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.post('/auth/login', credentials);
    
    // Current: Mock response
    return {
      success: true,
      data: {
        token: 'mock-jwt-token',
        user: {
          id: '1',
          email: credentials.email,
          role: credentials.role,
          name: 'Mock User'
        }
      }
    };
  }

  async logout(): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.post('/auth/logout');
    
    return { success: true };
  }

  // Student endpoints
  async createRequest(data: CreateRequestData): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.post('/student/requests', data);
    
    return { success: true, data: { id: Date.now().toString(), ...data } };
  }

  async getStudentRequests(): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.get('/student/requests');
    
    return { success: true, data: [] };
  }

  async updateRequest(id: string, data: Partial<CreateRequestData>): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.put(`/student/requests/${id}`, data);
    
    return { success: true, data: { id, ...data } };
  }

  // Examiner endpoints
  async getExaminerQueue(): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.get('/examiner/queue');
    
    return { success: true, data: [] };
  }

  async reviewRequest(id: string, decision: string, comments: string): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.post(`/examiner/review/${id}`, { decision, comments });
    
    return { success: true, data: { id, status: decision, comments } };
  }

  // Admin endpoints
  async getAllRequests(): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.get('/admin/requests');
    
    return { success: true, data: [] };
  }

  async getStats(): Promise<ApiResponse> {
    // Future: Replace with actual API call
    // return this.get('/admin/stats');
    
    return {
      success: true,
      data: {
        total: 0,
        pending: 0,
        under_review: 0,
        approved: 0,
        rejected: 0
      }
    };
  }

  // Private HTTP methods for future API integration
  private async request(endpoint: string, options: RequestInit = {}): Promise<ApiResponse> {
    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`,
          ...options.headers,
        },
        ...options,
      });

      const data = await response.json();
      
      if (!response.ok) {
        return { success: false, error: data.message || 'Request failed' };
      }

      return { success: true, data };
    } catch (error) {
      return { success: false, error: 'Network error' };
    }
  }

  private async get(endpoint: string): Promise<ApiResponse> {
    return this.request(endpoint, { method: 'GET' });
  }

  private async post(endpoint: string, data?: any): Promise<ApiResponse> {
    return this.request(endpoint, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private async put(endpoint: string, data?: any): Promise<ApiResponse> {
    return this.request(endpoint, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
    });
  }

  private async delete(endpoint: string): Promise<ApiResponse> {
    return this.request(endpoint, { method: 'DELETE' });
  }
}

export default new ApiService();