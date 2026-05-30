import {
  addMedicalRecord,
  getHistoriesScreeningByUserId,
  getDetailScreeningById,
  getTrendScreening,
  deleteMedicalRecordById,
  getSummaryScreeningByUserId,
  exportScreeningPdf,
} from '../controller/medical-records-controller.js';
import validate from '../../../middleware/validate.js';
import { medicalRecordPayloadSchema } from '../validator/schema.js';
import permissionGuard from '../../../middleware/guard.js';
import { Router } from 'express';
import auth from '../../../middleware/auth.js';
import { screeningLimiter } from '../../../middleware/rateLimiter.js';
const router = Router();

router.post(
  '/',
  auth,
  permissionGuard('screening:create'),
  screeningLimiter,
  validate(medicalRecordPayloadSchema),
  addMedicalRecord,
);
router.get(
  '/summary',
  auth,
  permissionGuard('screening:view_summary'),
  getSummaryScreeningByUserId,
);
router.get(
  '/trend',
  auth,
  permissionGuard('screening:view_trend'),
  getTrendScreening,
);
router.get(
  '/histories',
  auth,
  permissionGuard('screening:view_history'),
  getHistoriesScreeningByUserId,
);
router.get(
  '/histories/:screeningId',
  auth,
  permissionGuard('screening:view_detail'),
  getDetailScreeningById,
);
router.get('/histories/:screeningId/export', auth, exportScreeningPdf);
router.delete(
  '/histories/:screeningId',
  auth,
  permissionGuard('screening:delete'),
  deleteMedicalRecordById,
);

export default router;
