const API_BASE_URL = 'http://localhost:5000/api/v1';

// Types
interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

interface LoginCredentials {
  email: string;
  password: string;
  role: 'student' | 'examiner' | 'admin';
}

interface CreateRequestPayload {
  subject: string;
  examDate: string;
  reason: string;
  originalMarks?: number;
}

// API Service Class
class ApiService {
  private getHeaders(includeAuth = false): HeadersInit {
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (includeAuth) {
      const token = localStorage.getItem('authToken');
      const userId = localStorage.getItem('userId');
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (userId) headers['user-id'] = userId;
    }

    return headers;
  }

  private async handleResponse<T>(response: Response): Promise<ApiResponse<T>> {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.error || data.message || 'Request failed');
    }
    
    return data;
  }

  // Auth endpoints
  async login(credentials: LoginCredentials): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: this.getHeaders(),
      body: JSON.stringify(credentials)
    });
    
    const result = await this.handleResponse(response);
    
    // Store auth data
    if (result.success && result.data) {
      localStorage.setItem('authToken', result.data.token);
      localStorage.setItem('userId', result.data.user.id);
      localStorage.setItem('userRole', result.data.user.role);
      localStorage.setItem('userName', result.data.user.name);
    }
    
    return result;
  }

  async logout(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: 'POST',
      headers: this.getHeaders(true)
    });
    
    const result = await this.handleResponse(response);
    
    // Clear auth data
    localStorage.removeItem('authToken');
    localStorage.removeItem('userId');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    
    return result;
  }

  // Student endpoints
  async getStudentDashboard(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/student/dashboard`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async getStudentRequests(status?: string): Promise<ApiResponse> {
    const url = status 
      ? `${API_BASE_URL}/student/requests?status=${status}`
      : `${API_BASE_URL}/student/requests`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async getRequestById(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/student/requests/${id}`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async createRequest(payload: CreateRequestPayload): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/student/requests`, {
      method: 'POST',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async updateRequest(id: string, payload: Partial<CreateRequestPayload>): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/student/requests/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async deleteRequest(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/student/requests/${id}`, {
      method: 'DELETE',
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  // Examiner endpoints
  async getExaminerQueue(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/examiner/queue`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async getExaminerRequestDetail(id: string): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/examiner/requests/${id}`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async updateExaminerRequest(id: string, payload: {
    status: 'under_review' | 'approved' | 'rejected';
    examinerComments?: string;
    revisedMarks?: number;
  }): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/examiner/requests/${id}`, {
      method: 'PUT',
      headers: this.getHeaders(true),
      body: JSON.stringify(payload)
    });
    return this.handleResponse(response);
  }

  async getCompletedRequests(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/examiner/completed`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  // Admin endpoints
  async getAdminDashboard(): Promise<ApiResponse> {
    const response = await fetch(`${API_BASE_URL}/admin/dashboard`, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  async getAllRequests(status?: string): Promise<ApiResponse> {
    const url = status 
      ? `${API_BASE_URL}/admin/requests?status=${status}`
      : `${API_BASE_URL}/admin/requests`;
    
    const response = await fetch(url, {
      headers: this.getHeaders(true)
    });
    return this.handleResponse(response);
  }

  // Utility methods
  isAuthenticated(): boolean {
    return !!localStorage.getItem('authToken');
  }

  getCurrentUser() {
    return {
      id: localStorage.getItem('userId'),
      role: localStorage.getItem('userRole'),
      name: localStorage.getItem('userName')
    };
  }
}

export const apiService = new ApiService();
export default apiService;