import bcrypt from 'bcrypt';
import { Request, Response, RequestHandler } from 'express';
import { UserService } from './user.service';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import httpStatus from 'http-status';
import { IUser } from './user.interface';

const createUser: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const user = req.body;

    const result = await UserService.createUser(user);

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'User create Successfully',
    });
  }
);

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await UserService.getAllUsers();

  sendResponse<IUser[]>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});

const myProfile = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization as string;

  const result = await UserService.getMyProfile(token);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});
const updateUser = catchAsync(async (req: Request, res: Response) => {
  const token = req?.headers?.authorization as string;
  const user = req.body;

  // password hashing
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }
  const result = await UserService.updateUser(token, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users updated Successfully',
    data: result,
  });
});

const updateUserByAdmin = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;
  const user = req.body;

  // password hashing
  if (user.password) {
    user.password = await bcrypt.hash(user.password, 10);
  }

  const result = await UserService.updateUserByAdmin(id, user);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users updated Successfully',
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.deleteUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users deleted Successfully',
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id;

  const result = await UserService.getSingleUser(id);

  sendResponse<IUser>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Users retrieved Successfully',
    data: result,
  });
});
export const UserController = {
  createUser,
  myProfile,
  getAllUsers,
  updateUser,
  updateUserByAdmin,
  deleteUser,
  getSingleUser,
};
