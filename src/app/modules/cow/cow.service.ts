import httpStatus from 'http-status';
import jwt, { JwtPayload, Secret } from 'jsonwebtoken';
import User from '../user/user.model';
import { ICow, ICowFilters } from './cow.interface';
import ApiError from '../../../errors/ApiError';
import Cow from './cow.model';
import {
  IGenericResponse,
  IPaginationOptions,
} from '../../../interfaces/common';
import { cowFilterableField } from './cow.constant';
import { calculatePagination } from '../../../helpers/paginationHelper';
import { SortOrder } from 'mongoose';
import config from '../../../config';

const createCow = async (cow: ICow): Promise<ICow | null> => {
  const checkSellerId = await User.findById(cow.sellerId);
  if (!checkSellerId) {
    throw new ApiError(
      httpStatus.BAD_REQUEST,
      'No user is matching with given sellerId!!!'
    );
  }
  const createdCow = (await Cow.create(cow)).populate('sellerId');
  if (!createdCow) {
    throw new ApiError(400, 'Failed to create user!');
  }
  return createdCow;
};

const getAllCows = async (
  filters: ICowFilters,
  paginationOptions: IPaginationOptions
): Promise<IGenericResponse<ICow[]>> => {
  const {
    searchTerm,
    minPrice = 0,
    maxPrice = Infinity,
    ...filtersData
  } = filters;

  const andConditions = [];

  // for filter price
  andConditions.push({
    $and: [{ price: { $gte: minPrice } }, { price: { $lte: maxPrice } }],
  });

  // for filter data
  if (searchTerm) {
    andConditions.push({
      $or: cowFilterableField.map(field => ({
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

  const { page, limit, skip, sortBy, sortOrder } =
    calculatePagination(paginationOptions);

  const sortConditions: { [key: string]: SortOrder } = {};

  if (sortBy && sortOrder) {
    sortConditions[sortBy] = sortOrder;
  }

  // if no condition is given
  const query = andConditions.length > 0 ? { $and: andConditions } : {};

  const result = await Cow.find(query)
    .sort(sortConditions)
    .skip(skip)
    .limit(limit)
    .populate('sellerId');

  const count = await Cow.countDocuments();

  return {
    meta: {
      page,
      limit,
      count,
    },
    data: result,
  };
};

const getSingleCow = async (id: string): Promise<ICow | null> => {
  const result = await Cow.findById(id).populate('sellerId');
  return result;
};

const updateCow = async (
  id: string,
  payload: Partial<ICow>,
  token: string
): Promise<ICow | null> => {
  if (payload.sellerId) {
    throw new ApiError(httpStatus.CONFLICT, "Can't change sellerId!!!");
  }
  const userInfo = (await jwt.verify(
    token,
    config.jwt.secret as Secret
  )) as JwtPayload;

  const cow = await Cow.findById(id).populate('sellerId');
  if (userInfo.phoneNumber !== cow?.sellerId?.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!!!');
  }

  const result = await Cow.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  }).populate('sellerId');
  return result;
};

const deleteCow = async (id: string, token: string): Promise<ICow | null> => {
  const userInfo = (await jwt.verify(
    token,
    config.jwt.secret as Secret
  )) as JwtPayload;

  const cow = await Cow.findById(id).populate('sellerId');
  if (userInfo.phoneNumber !== cow?.sellerId?.phoneNumber) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'This is not your cow!!!');
  }
  const result = await Cow.findByIdAndDelete(id);
  return result;
};

export const CowService = {
  createCow,
  getAllCows,
  getSingleCow,
  updateCow,
  deleteCow,
};
