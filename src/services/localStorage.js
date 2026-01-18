// localStorage service for managing all application data
class LocalStorageService {
  constructor() {
    this.initializeData();
  }

  // Initialize default data if not exists
  initializeData() {
    if (!localStorage.getItem('users')) {
      const defaultUsers = [
        {
          id: '1',
          email: 'student@example.com',
          password: 'password123',
          name: 'John Student',
          role: 'student',
          createdAt: new Date().toISOString()
        },
        {
          id: '2',
          email: 'examiner@example.com',
          password: 'password123',
          name: 'Dr. Jane Examiner',
          role: 'examiner',
          createdAt: new Date().toISOString()
        },
        {
          id: '3',
          email: 'admin@example.com',
          password: 'password123',
          name: 'Admin User',
          role: 'admin',
          createdAt: new Date().toISOString()
        }
      ];
      localStorage.setItem('users', JSON.stringify(defaultUsers));
    }

    if (!localStorage.getItem('requests')) {
      const demoRequests = [
        {
          id: '1768715935870',
          studentId: '1',
          studentName: 'John Student',
          studentEmail: 'student@example.com',
          subject: 'Mathematics',
          examDate: '2024-01-15',
          originalMarks: 65,
          reason: 'I believe there was an error in the calculation of my final score. The answer to question 5 was marked incorrectly.',
          documents: ['transcript.pdf', 'answer_sheet.pdf'],
          status: 'pending',
          createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
        },
        {
          id: '1768715935871',
          studentId: '1',
          studentName: 'John Student',
          studentEmail: 'student@example.com',
          subject: 'Physics',
          examDate: '2024-01-10',
          originalMarks: 72,
          reason: 'Question 3 calculation seems to have an error in marking.',
          documents: ['physics_paper.pdf'],
          status: 'under_review',
          examinerId: '2',
          examinerName: 'Dr. Jane Examiner',
          createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
          updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
        }
      ];
      localStorage.setItem('requests', JSON.stringify(demoRequests));
    }

    if (!localStorage.getItem('exams')) {
      const defaultExams = [
        { id: '1', subject: 'Mathematics', code: 'MATH101' },
        { id: '2', subject: 'Physics', code: 'PHYS101' },
        { id: '3', subject: 'Chemistry', code: 'CHEM101' }
      ];
      localStorage.setItem('exams', JSON.stringify(defaultExams));
    }

    if (!localStorage.getItem('notifications')) {
      localStorage.setItem('notifications', JSON.stringify([]));
    }
  }

  // Generic localStorage methods
  get(key) {
    try {
      return JSON.parse(localStorage.getItem(key)) || [];
    } catch {
      return [];
    }
  }

  set(key, data) {
    localStorage.setItem(key, JSON.stringify(data));
  }

  // Auth methods
  async login(email, password, role) {
    const users = this.get('users');
    const user = users.find(u => u.email === email && u.password === password && u.role === role);
    
    if (user) {
      const token = btoa(JSON.stringify({ userId: user.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      return { success: true, data: { token, user } };
    }
    
    return { success: false, message: 'Invalid credentials' };
  }

  async register(email, password, name, role) {
    const users = this.get('users');
    const existingUser = users.find(u => u.email === email);
    
    if (existingUser) {
      return { success: false, message: 'User already exists' };
    }
    
    const newUser = {
      id: Date.now().toString(),
      email,
      password,
      name,
      role,
      createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    this.set('users', users);
    
    const token = btoa(JSON.stringify({ userId: newUser.id, exp: Date.now() + 24 * 60 * 60 * 1000 }));
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(newUser));
    
    return { success: true, data: { token, user: newUser } };
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  getCurrentUser() {
    try {
      return JSON.parse(localStorage.getItem('user'));
    } catch {
      return null;
    }
  }

  // Request methods
  async getStudentRequests(studentId) {
    const requests = this.get('requests');
    return { success: true, data: requests.filter(r => r.studentId === studentId) };
  }

  async createRequest(requestData) {
    const requests = this.get('requests');
    const newRequest = {
      id: Date.now().toString(),
      ...requestData,
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    requests.push(newRequest);
    this.set('requests', requests);
    return { success: true, data: newRequest };
  }

  async updateRequest(id, updates) {
    const requests = this.get('requests');
    const index = requests.findIndex(r => r.id === id);
    if (index !== -1) {
      requests[index] = { ...requests[index], ...updates, updatedAt: new Date().toISOString() };
      this.set('requests', requests);
      return { success: true, data: requests[index] };
    }
    return { success: false, message: 'Request not found' };
  }

  async deleteRequest(id) {
    const requests = this.get('requests');
    const filtered = requests.filter(r => r.id !== id);
    this.set('requests', filtered);
    return { success: true };
  }

  async getRequestById(id) {
    const requests = this.get('requests');
    const request = requests.find(r => r.id === id);
    return request ? { success: true, data: request } : { success: false, message: 'Request not found' };
  }

  // Examiner methods
  async getExaminerQueue() {
    const requests = this.get('requests');
    return { success: true, data: requests.filter(r => r.status === 'pending' || r.status === 'under_review') };
  }

  async assignRequest(id) {
    const user = this.getCurrentUser();
    if (!user || user.role !== 'examiner') {
      return { success: false, message: 'Only examiners can assign requests' };
    }
    
    const updates = {
      status: 'under_review',
      examinerId: user.id,
      examinerName: user.name
    };
    return this.updateRequest(id, updates);
  }

  async reviewRequest(id, decision, comments, newMarks = null) {
    const user = this.getCurrentUser();
    const request = await this.getRequestById(id);
    
    if (!request.success) {
      return { success: false, message: 'Request not found' };
    }
    
    const updates = {
      status: decision,
      examinerComments: comments,
      examinerId: user?.id,
      examinerName: user?.name,
      reviewedAt: new Date().toISOString()
    };
    
    if (newMarks !== null) {
      updates.revisedMarks = newMarks;
    }
    
    const result = await this.updateRequest(id, updates);
    
    if (result.success) {
      // Send notification to student
      const message = decision === 'approved' 
        ? `Your re-evaluation request for ${request.data.subject} has been approved. ${comments ? 'Comments: ' + comments : ''}${newMarks ? ' New marks: ' + newMarks : ''}`
        : `Your re-evaluation request for ${request.data.subject} has been rejected. ${comments ? 'Reason: ' + comments : ''}`;
      
      await this.addNotification(request.data.studentId, message, decision);
    }
    
    return result;
  }

  // Admin methods
  async getAllRequests() {
    const requests = this.get('requests');
    return { success: true, data: requests };
  }

  async getStats() {
    const requests = this.get('requests');
    const stats = {
      total: requests.length,
      pending: requests.filter(r => r.status === 'pending').length,
      under_review: requests.filter(r => r.status === 'under_review').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length
    };
    return { success: true, data: stats };
  }

  // Exam methods
  async getExams() {
    const exams = this.get('exams');
    return { success: true, data: exams };
  }

  // Notification methods
  async addNotification(userId, message, type = 'info') {
    const notifications = this.get('notifications');
    const newNotification = {
      id: Date.now().toString(),
      userId,
      message,
      type,
      read: false,
      createdAt: new Date().toISOString()
    };
    notifications.push(newNotification);
    this.set('notifications', notifications);
    return { success: true, data: newNotification };
  }

  async getNotifications(userId) {
    const notifications = this.get('notifications');
    return { success: true, data: notifications.filter(n => n.userId === userId) };
  }

  async markNotificationRead(notificationId) {
    const notifications = this.get('notifications');
    const index = notifications.findIndex(n => n.id === notificationId);
    if (index !== -1) {
      notifications[index].read = true;
      this.set('notifications', notifications);
    }
    return { success: true };
  }
}

export default new LocalStorageService();