// Demo data initialization for localStorage
export const initializeDemoData = () => {
  // Demo users
  const demoUsers = [
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

  // Demo requests
  const demoRequests = [
    {
      id: '1',
      studentId: '1',
      studentName: 'John Student',
      studentEmail: 'student@example.com',
      subject: 'Mathematics',
      examDate: '2024-01-15',
      reason: 'I believe there was an error in the calculation of my final score.',
      documents: ['transcript.pdf'],
      status: 'pending',
      createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString()
    },
    {
      id: '2',
      studentId: '1',
      studentName: 'John Student',
      studentEmail: 'student@example.com',
      subject: 'Physics',
      examDate: '2024-01-10',
      reason: 'Question 5 was marked incorrectly.',
      documents: ['answer_sheet.pdf'],
      status: 'approved',
      examinerId: '2',
      examinerName: 'Dr. Jane Examiner',
      examinerComments: 'After review, the student is correct. Grade updated.',
      revisedMarks: 85,
      createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
      updatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      reviewedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString()
    }
  ];

  // Demo exams
  const demoExams = [
    { id: '1', subject: 'Mathematics', code: 'MATH101' },
    { id: '2', subject: 'Physics', code: 'PHYS101' },
    { id: '3', subject: 'Chemistry', code: 'CHEM101' },
    { id: '4', subject: 'Biology', code: 'BIO101' },
    { id: '5', subject: 'Computer Science', code: 'CS101' }
  ];

  // Initialize localStorage if empty
  if (!localStorage.getItem('users')) {
    localStorage.setItem('users', JSON.stringify(demoUsers));
  }
  
  if (!localStorage.getItem('requests')) {
    localStorage.setItem('requests', JSON.stringify(demoRequests));
  }
  
  if (!localStorage.getItem('exams')) {
    localStorage.setItem('exams', JSON.stringify(demoExams));
  }

  console.log('Demo data initialized in localStorage');
  console.log('Available demo accounts:');
  console.log('Student: student@example.com / password123');
  console.log('Examiner: examiner@example.com / password123');
  console.log('Admin: admin@example.com / password123');
};

// Clear all data (for testing)
export const clearAllData = () => {
  localStorage.removeItem('users');
  localStorage.removeItem('requests');
  localStorage.removeItem('exams');
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  console.log('All localStorage data cleared');
};

// Get current data summary
export const getDataSummary = () => {
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const requests = JSON.parse(localStorage.getItem('requests') || '[]');
  const exams = JSON.parse(localStorage.getItem('exams') || '[]');
  
  return {
    users: users.length,
    requests: requests.length,
    exams: exams.length,
    requestsByStatus: {
      pending: requests.filter(r => r.status === 'pending').length,
      approved: requests.filter(r => r.status === 'approved').length,
      rejected: requests.filter(r => r.status === 'rejected').length,
      under_review: requests.filter(r => r.status === 'under_review').length
    }
  };
};