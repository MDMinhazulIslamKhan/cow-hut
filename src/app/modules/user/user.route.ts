import express from 'express';
import { UserController } from './user.controller';
import validateRequest from '../../middleware/validateRequest';
import { UserValidation } from './user.validation';

const router = express.Router();

// all user
router.get('/', UserController.getAllUsers);

// single user
router.get('/:id', UserController.getSingleUser);

// update user
router.patch(
  '/:id',
  validateRequest(UserValidation.updateUserZodSchema),
  UserController.updateUser
);

// delete user
router.delete('/:id', UserController.deleteUser);

export const UserRouters = router;
