import { Router } from 'express';
import authRoutes from './authRoutes';
import studentRoutes from './studentRoutes';
import examinerRoutes from './examinerRoutes';
import adminRoutes from './adminRoutes';

const router = Router();

// Basic test route
router.get('/test', (req, res) => {
  res.json({
    message: 'API test endpoint working',
    timestamp: new Date().toISOString(),
    status: 'success'
  });
});

// Basic profile route
router.get('/profile', (req, res) => {
  res.json({
    user: {
      id: 'user123',
      name: 'Test User',
      email: 'test@example.com',
      role: 'student'
    },
    message: 'Profile endpoint working'
  });
});

// Route modules
router.use('/auth', authRoutes);
router.use('/student', studentRoutes);
router.use('/examiner', examinerRoutes);
router.use('/admin', adminRoutes);

export default router;