import express from 'express';
import { AdminController } from './admin.controller';
import { AdminValidation } from './admin.validation';
import validateRequest from '../../middleware/validateRequest';
import { ENUM_USER_ROLE } from '../../../enums/user';
import auth from '../../middleware/auth';
const router = express.Router();

router.post(
  '/create-admin',
  validateRequest(AdminValidation.createAdminZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  AdminController.createAdmin
);

export const AdminRoutes = router;
