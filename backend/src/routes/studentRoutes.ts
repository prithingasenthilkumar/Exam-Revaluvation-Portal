import { Router } from 'express';
import { StudentController } from '../controllers/StudentController';
import { validateCreateRequest } from '../middleware/validation';

const router = Router();
const studentController = new StudentController();

router.get('/dashboard', studentController.getDashboard);
router.get('/requests', studentController.getRequests);
router.get('/requests/:id', studentController.getRequestById);
router.post('/requests', validateCreateRequest, studentController.createRequest);
router.put('/requests/:id', studentController.updateRequest);
router.delete('/requests/:id', studentController.deleteRequest);

export default router;