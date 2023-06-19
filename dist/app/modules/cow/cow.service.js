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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = __importDefault(require("../user/user.model"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const cow_model_1 = __importDefault(require("./cow.model"));
const cow_constant_1 = require("./cow.constant");
const paginationHelper_1 = require("../../../helpers/paginationHelper");
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const checkSellerId = yield user_model_1.default.findById(cow.sellerId);
    if (!checkSellerId) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No user is matching with given sellerId!!!');
    }
    const createdCow = yield cow_model_1.default.create(cow);
    if (!createdCow) {
        throw new ApiError_1.default(400, 'Failed to create user!');
    }
    return createdCow;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice = 0, maxPrice = Infinity } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const andConditions = [];
    // for filter price
    andConditions.push({
        $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
    });
    // for filter data
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowFilterableField.map(field => ({
                [field]: { $regex: searchTerm, $options: 'i' },
            })),
        });
    }
    // for exact match user and condition
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const { page, limit, skip, sortBy, sortOrder } = (0, paginationHelper_1.calculatePagination)(paginationOptions);
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    // if no condition is given
    const query = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.default.find(query)
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const count = yield cow_model_1.default.countDocuments();
    return {
        meta: {
            page,
            limit,
            count,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findById(id);
    return result;
});
const updateCow = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    if (payload.sellerId) {
        const checkSellerId = yield user_model_1.default.findById(payload.sellerId);
        if (!checkSellerId) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'No user is matching with given id!!!');
        }
    }
    const result = yield cow_model_1.default.findOneAndUpdate({ _id: id }, payload, {
        new: true,
    });
    return result;
});
const deleteCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.default.findByIdAndDelete(id);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
