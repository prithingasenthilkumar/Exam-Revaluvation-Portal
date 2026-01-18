import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validateCreateRequest } from '../middleware/validation';

const router = Router();
const studentController = new StudentController();

// All student routes require authentication and student role
router.use(authenticateToken);
router.use(authorizeRoles('student'));

router.get('/dashboard', studentController.getDashboard);
router.get('/requests', studentController.getRequests);
router.get('/requests/:id', studentController.getRequestById);
router.post('/requests', validateCreateRequest, studentController.createRequest);
router.put('/requests/:id', studentController.updateRequest);
router.delete('/requests/:id', studentController.deleteRequest);

export default router;