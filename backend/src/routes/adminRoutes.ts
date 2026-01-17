import { Router } from 'express';
import { AdminController } from '../controllers/AdminController';

const router = Router();
const adminController = new AdminController();

// Placeholder routes - to be implemented
router.get('/dashboard', adminController.getDashboard);
router.get('/requests', adminController.getAllRequests);

export default router;