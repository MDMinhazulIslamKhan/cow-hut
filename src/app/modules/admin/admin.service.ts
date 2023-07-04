import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import { IUser } from '../user/user.interface';
import User from '../user/user.model';

const createAdmin = async (admin: IUser): Promise<IUser | null> => {
  const checkNumber = await User.findOne({ phoneNumber: admin.phoneNumber });

  if (checkNumber) {
    throw new ApiError(httpStatus.CONFLICT, 'Already used this number!!!');
  }
  admin.role = 'admin';
  const createdAdmin = await User.create(admin);
  if (!createdAdmin) {
    throw new ApiError(400, 'Failed to create admin!');
  }

  return createdAdmin;
};
export const AdminService = {
  createAdmin,
};
