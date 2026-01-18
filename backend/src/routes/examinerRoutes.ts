import { Router } from 'express';
import { ExaminerController } from '../controllers/ExaminerController';
import { authenticateToken, authorizeRoles } from '../middleware/auth';
import { validateUpdateRequest } from '../middleware/validation';

const router = Router();
const examinerController = new ExaminerController();

// All examiner routes require authentication and examiner role
router.use(authenticateToken);
router.use(authorizeRoles('examiner'));

router.get('/queue', examinerController.getQueue);
router.get('/requests/:id', examinerController.getRequestDetail);
router.put('/requests/:id', validateUpdateRequest, examinerController.updateRequest);
router.get('/completed', examinerController.getCompletedRequests);

export default router;