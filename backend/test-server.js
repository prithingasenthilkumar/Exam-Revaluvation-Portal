const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Test endpoints
app.get('/', (req, res) => {
  res.json({ message: 'Test server is working!' });
});

app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Health check passed' });
});

app.post('/api/v1/auth/login', (req, res) => {
  const { email, password, role } = req.body;
  
  if (email === 'student@test.com' && role === 'student') {
    res.json({
      success: true,
      data: {
        user: { id: '1', email, role, name: 'Test Student' },
        token: 'test-token-123'
      },
      message: 'Login successful'
    });
  } else {
    res.status(401).json({
      success: false,
      error: 'Invalid credentials'
    });
  }
});

app.get('/api/v1/student/dashboard', (req, res) => {
  res.json({
    success: true,
    data: {
      stats: { total: 2, submitted: 1, approved: 1 },
      recentRequests: []
    }
  });
});

app.listen(PORT, () => {
  console.log(`✅ Test server running on http://localhost:${PORT}`);
  console.log(`🔗 Try: http://localhost:${PORT}/health`);
});