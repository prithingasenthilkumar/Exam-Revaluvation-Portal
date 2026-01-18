import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3001/api';

class ApiService {
  constructor() {
    this.api = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Request interceptor to add token
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          this.clearToken();
          window.location.href = '/login';
        }
        return Promise.reject(error.response?.data || error.message);
      }
    );
  }

  setToken(token) {
    localStorage.setItem('token', token);
  }

  clearToken() {
    localStorage.removeItem('token');
  }

  // Auth endpoints
  async login(email, password, role) {
    const data = await this.api.post('/auth/login', { email, password, role });
    
    if (data.success && data.data.token) {
      this.setToken(data.data.token);
    }
    
    return data;
  }

  async logout() {
    try {
      await this.api.post('/auth/logout');
    } finally {
      this.clearToken();
    }
  }

  async validateToken() {
    return this.api.get('/auth/validate');
  }

  // Student endpoints
  async getStudentDashboard() {
    return this.api.get('/student/dashboard');
  }

  async getStudentRequests(status = null) {
    const params = status ? { status } : {};
    return this.api.get('/student/requests', { params });
  }

  async getRequestById(id) {
    return this.api.get(`/student/requests/${id}`);
  }

  async createRequest(requestData) {
    return this.api.post('/student/requests', requestData);
  }

  async updateRequest(id, updates) {
    return this.api.put(`/student/requests/${id}`, updates);
  }

  async deleteRequest(id) {
    return this.api.delete(`/student/requests/${id}`);
  }

  // Examiner endpoints
  async getExaminerQueue() {
    return this.api.get('/examiner/queue');
  }

  async getExaminerRequestById(id) {
    return this.api.get(`/examiner/requests/${id}`);
  }

  // Alias for the requested endpoint in prompt
  async getRevaluationDetail(requestId) {
    return this.api.get(`/examiner/requests/${requestId}`);
  }

  async reviewRequest(id, decision, comments, newMarks = null) {
    return this.api.put(`/examiner/requests/${id}`, {
      status: decision,
      examinerComments: comments,
      revisedMarks: newMarks,
    });
  }

  // Alias for the requested endpoint in prompt
  async submitReview(requestId, decisionData) {
    return this.api.put(`/examiner/requests/${requestId}`, decisionData);
  }

  // Admin endpoints
  async getAdminDashboard() {
    return this.api.get('/admin/dashboard');
  }

  async getAllRequests() {
    return this.api.get('/admin/requests');
  }

  async assignExaminer(requestId, examinerId) {
    return this.api.post(`/admin/requests/${requestId}/assign`, {
      examinerId,
    });
  }
}

export default new ApiService();