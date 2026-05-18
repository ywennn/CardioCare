import { Router } from 'express';
import users from '../services/users/routes/index.js';
import auth from '../services/auth/routes/index.js';
const router = Router();

router.use('/api/users', users);
router.use('/api/auth', auth);
export default router;
