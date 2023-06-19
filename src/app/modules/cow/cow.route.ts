import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { CowValidation } from './cow.validation';
import { CowController } from './cow.controller';

const router = express.Router();

// create cow
router.post(
  '/',
  validateRequest(CowValidation.createCowZodSchema),
  CowController.createCow
);

// all cow
router.get('/', CowController.getAllCows);

// single cow
router.get('/:id', CowController.getSingleCow);

// update cow
router.patch(
  '/:id',
  validateRequest(CowValidation.updateCowZodSchema),
  CowController.updateCow
);

// delete cow
router.delete('/:id', CowController.deleteCow);

export const CowRouters = router;
