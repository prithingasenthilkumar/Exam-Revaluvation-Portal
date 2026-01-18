import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';

const router = Router();
const adminController = new AdminController();

// All admin routes require authentication and admin role
router.use(authenticateToken);
router.use(authorizeRoles('admin'));

router.get('/dashboard', adminController.getDashboard);
router.get('/requests', adminController.getAllRequests);

export default router;