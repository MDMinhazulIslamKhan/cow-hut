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
const router = express_1.default.Router();
// all user
router.get('/', user_controller_1.UserController.getAllUsers);
// single user
router.get('/:id', user_controller_1.UserController.getSingleUser);
// update user
router.patch(
  '/:id',
  (0, validateRequest_1.default)(
    user_validation_1.UserValidation.updateUserZodSchema
  ),
  user_controller_1.UserController.updateUser
);
// delete user
router.delete('/:id', user_controller_1.UserController.deleteUser);
exports.UserRouters = router;
