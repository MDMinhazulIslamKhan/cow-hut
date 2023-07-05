import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from './user.interface';
import User from './user.model';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import { Secret } from 'jsonwebtoken';
import config from '../../../config';

const createUser = async (user: IUser): Promise<IUser | null> => {
  const checkNumber = await User.findOne({ phoneNumber: user.phoneNumber });

  if (checkNumber) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!');
  }
  const createdUser = await User.create(user);
  if (!createdUser) {
    throw new ApiError(400, 'Failed to create user!');
  }
  const result = await User.findById(createdUser._id);
  return result;
};

const getAllUsers = async (): Promise<IUser[]> => {
  const result = await User.find();
  return result;
};

const getMyProfile = async (token: string): Promise<IUser | null> => {
  const userInfo = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const result = await User.findOne({ phoneNumber: userInfo.phoneNumber });
  if (!result) {
    throw new ApiError(httpStatus.CONFLICT, 'Your profile is deleted!!!');
  }
  return result;
};

const deleteUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findByIdAndDelete(id);
  return result;
};

const getSingleUser = async (id: string): Promise<IUser | null> => {
  const result = await User.findById(id);
  return result;
};

const updateUser = async (
  token: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const userInfo = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  if (payload.phoneNumber && payload.role) {
    throw new ApiError(
      httpStatus.CONFLICT,
      "Phone number and role can't changed!!!"
    );
  }

  const result = await User.findOneAndUpdate(
    { phoneNumber: userInfo.phoneNumber },
    payload,
    {
      new: true,
    }
  );
  return result;
};
const updateUserByAdmin = async (
  id: string,
  payload: Partial<IUser>
): Promise<IUser | null> => {
  const checkNumber = await User.findOne({ phoneNumber: payload.phoneNumber });

  if (checkNumber) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!');
  }
  const result = await User.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const UserService = {
  createUser,
  getAllUsers,
  getSingleUser,
  getMyProfile,
  updateUserByAdmin,
  updateUser,
  deleteUser,
};
