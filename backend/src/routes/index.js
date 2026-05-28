import { Router } from 'express';
import users from '../services/users/routes/index.js';
import auth from '../services/auth/routes/index.js';
import medicalRecords from '../services/medical-records/routes/index.js';
const router = Router();

router.use('/api/users', users);
router.use('/api/auth', auth);
router.use('/api/screening', medicalRecords);
export default router;
