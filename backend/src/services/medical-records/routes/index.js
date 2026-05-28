import {
  addMedicalRecord,
  getHistoriesScreeningByUserId,
  getDetailScreeningById,
  getTrendScreening,
  deleteMedicalRecordById,
  getSummaryScreeningByUserId,
} from '../controller/medical-records-controller.js';
import validate from '../../../middleware/validate.js';
import { medicalRecordPayloadSchema } from '../validator/schema.js';
import permissionGuard from '../../../middleware/guard.js';
import { Router } from 'express';
import auth from '../../../middleware/auth.js';
const router = Router();

router.post(
  '/',
  auth,
  permissionGuard('patient:create_screening'),
  validate(medicalRecordPayloadSchema),
  addMedicalRecord,
);
router.get(
  '/histories',
  auth,
  permissionGuard('patient:view_own_history'),
  getHistoriesScreeningByUserId,
);
router.get(
  '/histories/:screeningId',
  auth,
  permissionGuard('patient:view_own_history'),
  getDetailScreeningById,
);
router.delete('/', auth, deleteMedicalRecordById);
router.get('/summary', auth, getSummaryScreeningByUserId);
router.get('/trend', auth, getTrendScreening);
export default router;
