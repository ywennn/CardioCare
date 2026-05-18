import { Router } from 'express';
import { login, refreshToken, logout } from '../controller/auth-controller.js';
import validate from '../../../middleware/validate.js';
import {
  postAuthenticationPayloadSchema,
  putAuthenticationPayloadSchema,
  deleteAuthenticationPayloadSchema,
} from '../validator/schema.js';

const router = Router();

router.post('/login', validate(postAuthenticationPayloadSchema), login);
router.put(
  '/refresh-token',
  validate(putAuthenticationPayloadSchema),
  refreshToken,
);
router.delete('/logout', validate(deleteAuthenticationPayloadSchema), logout);

export default router;
