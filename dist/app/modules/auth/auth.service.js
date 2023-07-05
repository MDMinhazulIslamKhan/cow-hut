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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require('http-status'));
const ApiError_1 = __importDefault(require('../../../errors/ApiError'));
const user_model_1 = __importDefault(require('../user/user.model'));
const config_1 = __importDefault(require('../../../config'));
const jwtHelpers_1 = require('../../../helpers/jwtHelpers');
const loginUser = payload =>
  __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    const isUserExist = yield user_model_1.default.isUserExist(phoneNumber);
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "User doesn't exist."
      );
    }
    if (
      !(yield user_model_1.default.isPasswordMatch(
        password,
        isUserExist.password
      ))
    ) {
      throw new ApiError_1.default(
        http_status_1.default.UNAUTHORIZED,
        'Password is incorrect.'
      );
    }
    const { phoneNumber: userPhoneNumber, role } = isUserExist;
    //   create access token and refresh token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken(
      { phoneNumber: userPhoneNumber, role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expire_in
    );
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken(
      { phoneNumber: userPhoneNumber, role },
      config_1.default.jwt.refresh_secret,
      config_1.default.jwt.refresh_expire_in
    );
    return {
      accessToken,
      refreshToken,
    };
  });
const refreshToken = refreshToken =>
  __awaiter(void 0, void 0, void 0, function* () {
    let verifiedToken;
    try {
      verifiedToken = jwtHelpers_1.jwtHelpers.verifyToken(
        refreshToken,
        config_1.default.jwt.refresh_secret
      );
    } catch (error) {
      throw new ApiError_1.default(
        http_status_1.default.FORBIDDEN,
        'Invalid refresh token!!!'
      );
    }
    const isUserExist = yield user_model_1.default.isUserExist(
      verifiedToken.phoneNumber
    );
    if (!isUserExist) {
      throw new ApiError_1.default(
        http_status_1.default.NOT_FOUND,
        "User doesn't exist!!!"
      );
    }
    // generate access token
    const newAccessToken = jwtHelpers_1.jwtHelpers.createToken(
      { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
      config_1.default.jwt.secret,
      config_1.default.jwt.expire_in
    );
    return {
      accessToken: newAccessToken,
    };
  });
exports.AuthService = {
  loginUser,
  refreshToken,
};
