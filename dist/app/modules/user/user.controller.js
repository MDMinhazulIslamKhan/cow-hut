'use strict';
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __importDefault =
  (this && this.__importDefault) ||
  function (mod) {
    return mod && mod.__esModule ? mod : { default: mod };
  };
Object.defineProperty(exports, '__esModule', { value: true });
exports.UserController = void 0;
const bcrypt_1 = __importDefault(require('bcrypt'));
const user_service_1 = require('./user.service');
const catchAsync_1 = __importDefault(require('../../../shared/catchAsync'));
const sendResponse_1 = __importDefault(require('../../../shared/sendResponse'));
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const createUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const user = req.body;
    const result = yield user_service_1.UserService.createUser(user);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      data: result,
      message: 'User create Successfully',
    });
  })
);
const getAllUsers = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_service_1.UserService.getAllUsers();
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users retrieved Successfully',
      data: result,
    });
  })
);
const myProfile = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'You are not authorized'
      );
    }
    const result = yield user_service_1.UserService.getMyProfile(token);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users retrieved Successfully',
      data: result,
    });
  })
);
const updateUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const token = req.headers.authorization;
    if (!token) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'You are not authorized'
      );
    }
    const user = req.body;
    // password hashing
    if (user.password) {
      user.password = yield bcrypt_1.default.hash(user.password, 10);
    }
    const result = yield user_service_1.UserService.updateUserByAdmin(
      token,
      user
    );
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users updated Successfully',
      data: result,
    });
  })
);
const updateUserByAdmin = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const user = req.body;
    // password hashing
    if (user.password) {
      user.password = yield bcrypt_1.default.hash(user.password, 10);
    }
    const result = yield user_service_1.UserService.updateUser(id, user);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users updated Successfully',
      data: result,
    });
  })
);
const deleteUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.deleteUser(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users deleted Successfully',
      data: result,
    });
  })
);
const getSingleUser = (0, catchAsync_1.default)((req, res) =>
  __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const result = yield user_service_1.UserService.getSingleUser(id);
    (0, sendResponse_1.default)(res, {
      statusCode: http_status_1.default.OK,
      success: true,
      message: 'Users retrieved Successfully',
      data: result,
    });
  })
);
exports.UserController = {
  createUser,
  myProfile,
  getAllUsers,
  updateUser,
  updateUserByAdmin,
  deleteUser,
  getSingleUser,
};
