'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.CowRouters = void 0;
const express_1 = __importDefault(require('express'));
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const cow_validation_1 = require('./cow.validation');
const cow_controller_1 = require('./cow.controller');
const auth_1 = __importDefault(require('../../middleware/auth'));
const user_1 = require('../../../enums/user');
const router = express_1.default.Router();
// create cow
router.post(
  '/',
  (0, validateRequest_1.default)(
    cow_validation_1.CowValidation.createCowZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  cow_controller_1.CowController.createCow
);
// all cow
router.get(
  '/',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.BUYER
  ),
  cow_controller_1.CowController.getAllCows
);
// single cow
router.get(
  '/:id',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.BUYER
  ),
  cow_controller_1.CowController.getSingleCow
);
// update cow
router.patch(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  (0, validateRequest_1.default)(
    cow_validation_1.CowValidation.updateCowZodSchema
  ),
  cow_controller_1.CowController.updateCow
);
// delete cow
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.SELLER),
  cow_controller_1.CowController.deleteCow
);
exports.CowRouters = router;
