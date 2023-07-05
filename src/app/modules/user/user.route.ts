import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// get profile
router.get(
  '/my-profile',
  auth(ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER),
  UserController.myProfile
);

// update own profile by user
router.patch(
  '/my-profile',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.BUYER, ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN),
  UserController.updateUser
);

// update user by admin
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  auth(ENUM_USER_ROLE.ADMIN),
  UserController.updateUserByAdmin
);

// all user
router.get('/', auth(ENUM_USER_ROLE.ADMIN), UserController.getAllUsers);

// single user
router.get('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.getSingleUser);

// delete user
router.delete('/:id', auth(ENUM_USER_ROLE.ADMIN), UserController.deleteUser);

export const UserRouters = router;
