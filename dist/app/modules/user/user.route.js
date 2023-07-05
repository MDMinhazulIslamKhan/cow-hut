'use strict';
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserRouters = void 0;
const express_1 = __importDefault(require('express'));
const user_controller_1 = require('./user.controller');
const validateRequest_1 = __importDefault(
  require('../../middleware/validateRequest')
);
const user_validation_1 = require('./user.validation');
const auth_1 = __importDefault(require('../../middleware/auth'));
const user_1 = require('../../../enums/user');
const router = express_1.default.Router();
// get profile
router.get(
  '/my-profile',
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.ADMIN,
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER
  ),
  user_controller_1.UserController.myProfile
);
// update own profile by user
router.patch(
  '/my-profile',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  (0, auth_1.default)(
    user_1.ENUM_USER_ROLE.BUYER,
    user_1.ENUM_USER_ROLE.SELLER,
    user_1.ENUM_USER_ROLE.ADMIN
  ),
  user_controller_1.UserController.updateUser
);
// update user by admin
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.updateUserByAdmin
);
// all user
router.get(
  '/',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getAllUsers
);
// single user
router.get(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.getSingleUser
);
// delete user
router.delete(
  '/:id',
  (0, auth_1.default)(user_1.ENUM_USER_ROLE.ADMIN),
  user_controller_1.UserController.deleteUser
);
exports.UserRouters = router;
