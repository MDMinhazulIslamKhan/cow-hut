import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';
import auth from '../../middleware/auth';
import { ENUM_USER_ROLE } from '../../../enums/user';

const router = express.Router();

// create cow
router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  auth(ENUM_USER_ROLE.SELLER),
  CowController.createCow
);

// all cow
router.get(
  '/',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  CowController.getAllCows
);

// single cow
router.get(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER, ENUM_USER_ROLE.ADMIN, ENUM_USER_ROLE.BUYER),
  CowController.getSingleCow
);

// update cow
router.patch(
  '/:id',
  auth(ENUM_USER_ROLE.SELLER),
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

// delete cow
router.delete('/:id', auth(ENUM_USER_ROLE.SELLER), CowController.deleteCow);

export const CowRouters = router;
