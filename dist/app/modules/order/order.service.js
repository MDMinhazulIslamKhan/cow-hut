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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = __importDefault(require("../user/user.model"));
const order_model_1 = __importDefault(require("./order.model"));
const cow_model_1 = __importDefault(require("../cow/cow.model"));
const config_1 = __importDefault(require("../../../config"));
const mongoose_1 = __importDefault(require("mongoose"));
const createOrder = (token, password, cow) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret));
    const existingUser = yield user_model_1.default.isUserExist(userInfo.phoneNumber);
    if (!existingUser) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'No user with this phon number!!!');
    }
    const isPasswordMatch = yield user_model_1.default.isPasswordMatch(password, existingUser.password);
    if (!isPasswordMatch) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password didn't match!!!");
    }
    const existingCow = yield cow_model_1.default.findById(cow);
    if (!existingCow) {
        throw new ApiError_1.default(http_status_1.default.CONFLICT, 'There has no cow  with this cowId!!!');
    }
    const user = yield user_model_1.default.findById(existingUser.id);
    if ((user === null || user === void 0 ? void 0 : user.budget) && existingCow.price >= (user === null || user === void 0 ? void 0 : user.budget)) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "You haven't enough money to bye this cow!!!");
    }
    if (existingCow.label === 'sold out') {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'Cow is already sold!!!');
    }
    const session = yield mongoose_1.default.startSession();
    let createdOrder;
    try {
        session.startTransaction();
        yield cow_model_1.default.findOneAndUpdate({ _id: cow }, { label: 'sold out' }, {
            session,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: existingCow.sellerId }, { $inc: { income: existingCow.price } }, {
            session,
        });
        yield user_model_1.default.findOneAndUpdate({ _id: existingUser.id }, { $inc: { budget: -existingCow.price } }, {
            session,
        });
        createdOrder = yield order_model_1.default.create([{ cow, buyer: existingUser.id }], {
            session,
        });
        if (!createdOrder) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order!');
        }
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (error) {
        yield session.abortTransaction();
        yield session.endSession();
        throw error;
    }
    const order = order_model_1.default.findById(createdOrder[0].id)
        .populate({
        path: 'cow',
        model: 'Cow',
    })
        .populate({
        path: 'buyer',
        model: 'User',
    });
    return order;
});
const getOrders = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_model_1.default.find();
    return result;
});
const getSingleOrder = (id, token) => __awaiter(void 0, void 0, void 0, function* () {
    const userInfo = (yield jsonwebtoken_1.default.verify(token, config_1.default.jwt.secret));
    const buyerInfo = yield user_model_1.default.findOne({ phoneNumber: userInfo.phoneNumber });
    const result = yield order_model_1.default.findById(id).populate(['cow', 'buyer']);
    if ((buyerInfo === null || buyerInfo === void 0 ? void 0 : buyerInfo.role) === 'buyer' &&
        buyerInfo.id !== (result === null || result === void 0 ? void 0 : result.buyer.id.toString())) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Unauthorized!!!');
    }
    return result;
});
exports.OrderService = {
    createOrder,
    getOrders,
    getSingleOrder,
};
