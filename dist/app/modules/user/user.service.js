"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("./user.model"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNumber = yield user_model_1.default.findOne({ phoneNumber: user.phoneNumber });
    if (checkNumber) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already used this number!!!');
    }
    const createdUser = yield user_model_1.default.create(user);
    if (!createdUser) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    const result = yield user_model_1.default.findById(createdUser._id);
    return result;
});
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.find();
    return result;
});
const getMyProfile = (token) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    const result = yield user_model_1.default.findOne({ phoneNumber: userInfo.phoneNumber });
    if (!result) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Your profile is deleted!!!');
    }
    return result;
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findByIdAndDelete(id);
    return result;
});
const getSingleUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield user_model_1.default.findById(id);
    return result;
});
const updateUser = (token, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = jwtHelpers_1.jwtHelpers.verifyToken(token, config_1.default.jwt.secret);
    if (payload.phoneNumber && payload.role) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, "Phone number and role can't changed!!!");
    }
    const result = yield user_model_1.default.findOneAndUpdate({ phoneNumber: userInfo.phoneNumber }, payload, {
        new: true,
    });
    return result;
});
const updateUserByAdmin = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const checkNumber = yield user_model_1.default.findOne({ phoneNumber: payload.phoneNumber });
    if (checkNumber) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Already used this number!!!');
    }
    const result = yield user_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
exports.UserService = {
    createUser,
    getAllUsers,
    getSingleUser,
    getMyProfile,
    updateUserByAdmin,
    updateUser,
    deleteUser,
};
