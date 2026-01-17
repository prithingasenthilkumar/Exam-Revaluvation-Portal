import { Router } from 'express';
import { AuthController } from '../controllers/AuthController';
import { validateLogin } from '../middleware/validation';

const router = Router();
const authController = new AuthController();

router.post('/login', validateLogin, authController.login);
router.post('/logout', authController.logout);
router.get('/validate', authController.validateToken);

export default router;