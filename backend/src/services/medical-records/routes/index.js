import {
  addMedicalRecord,
  getHistoriesScreeningByUserId,
  getDetailScreeningById,
} from '../controller/medical-records-controller.js';
import validate from '../../../middleware/validate.js';
import { medicalRecordPayloadSchema } from '../validator/schema.js';
import { Router } from 'express';
import auth from '../../../middleware/auth.js';
const router = Router();

router.post('/', auth, validate(medicalRecordPayloadSchema), addMedicalRecord);
router.get('/histories', auth, getHistoriesScreeningByUserId);
router.get('/histories/:screeningId', auth, getDetailScreeningById);
export default router;
