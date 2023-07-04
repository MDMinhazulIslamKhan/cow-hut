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
exports.OrderService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const createOrder = (phoneNumber, password, cow) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.default.findOne({ phoneNumber });
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'No user with this phon number!!!');
    }
    const existingCow = yield cow_model_1.default.findById(cow);
    if (!existingCow) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'There has no cow  with this cowId!!!');
    }
    // password matching
    const passwordMatch = yield bcrypt_1.default.compare(password, existingUser.password);
    if (!passwordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password didn't match!!!");
    }
    if ((existingUser === null || existingUser === void 0 ? void 0 : existingUser.budget) && existingCow.price >= (existingUser === null || existingUser === void 0 ? void 0 : existingUser.budget)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You haven't enough money to bye this cow!!!");
    }
    if (existingCow.label === 'sold out') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Cow is already sold!!!');
    }
    const createdOrder = yield order_model_1.default.create({ cow, buyer: existingUser.id });
    yield cow_model_1.default.findOneAndUpdate({ _id: cow }, { label: 'sold out' });
    yield user_model_1.default.findOneAndUpdate({ _id: existingCow.sellerId }, { $inc: { income: existingCow.price } });
    yield user_model_1.default.findOneAndUpdate({ _id: existingUser.id }, { $inc: { budget: -existingCow.price } });
    if (!createdOrder) {
        throw new ApiError_1.default(400, 'Failed to create order!');
    }
    return createdOrder;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getSingleOrder = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.findById(id);
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
