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
import permissionGuard from '../../../middleware/guard.js';
import { authLimiter } from '../../../middleware/rateLimiter.js';
const router = Router();

router.post('/register', authLimiter, validate(userPayloadSchema), createUser);
router.get('/me', auth, permissionGuard('profile:view'), getMe);
router.put(
  '/me',
  auth,
  permissionGuard('profile:update'),
  validate(userUpdatePayloadSchema),
  putUser,
);
router.put(
  '/me/password',
  auth,
  permissionGuard('profile:update_password'),
  validate(userPasswordUpdatePayloadSchema),
  putPassword,
);
export default router;
