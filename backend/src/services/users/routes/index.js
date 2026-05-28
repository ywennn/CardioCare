import { Router } from 'express';
import {
  createUser,
  getMe,
  putUser,
  putPassword,
} from '../controller/user-controller.js';
import validate from '../../../middleware/validate.js';
import {
  userPayloadSchema,
  userUpdatePayloadSchema,
  userPasswordUpdatePayloadSchema,
} from '../validator/schema.js';
import auth from '../../../middleware/auth.js';

const router = Router();

router.post('/register', validate(userPayloadSchema), createUser);
router.get('/me', auth, getMe);
router.put('/me', auth, validate(userUpdatePayloadSchema), putUser);
router.put(
  '/users/me/password',
  auth,
  validate(userPasswordUpdatePayloadSchema),
  putPassword,
);
export default router;
