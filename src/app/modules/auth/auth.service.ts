import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';
import ApiError from '../../../errors/ApiError';
import User from '../user/user.model';
import {
  ILoginUser,
  ILoginUserResponse,
  IRefreshTokenResponse,
} from './auth.interface';
import config from '../../../config';
import { jwtHelpers } from '../../../helpers/jwtHelpers';

const loginUser = async (payload: ILoginUser): Promise<ILoginUserResponse> => {
  const { phoneNumber, password } = payload;

  const isUserExist = await User.isUserExist(phoneNumber);

  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist.");
  }

  if (!(await User.isPasswordMatch(password, isUserExist.password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Password is incorrect.');
  }

  const { phoneNumber: userPhoneNumber, role } = isUserExist;
  //   create access token and refresh token

  const accessToken = jwtHelpers.createToken(
    { phoneNumber: userPhoneNumber, role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  const refreshToken = jwtHelpers.createToken(
    { phoneNumber: userPhoneNumber, role },
    config.jwt.refresh_secret as Secret,
    config.jwt.refresh_expire_in as string
  );

  return {
    accessToken,
    refreshToken,
  };
};

const refreshToken = async (
  refreshToken: string
): Promise<IRefreshTokenResponse> => {
  let verifiedToken;

  try {
    verifiedToken = jwtHelpers.verifyToken(
      refreshToken,
      config.jwt.refresh_secret as Secret
    );
  } catch (error) {
    throw new ApiError(httpStatus.FORBIDDEN, 'Invalid refresh token!!!');
  }

  const isUserExist = await User.isUserExist(verifiedToken.phoneNumber);
  if (!isUserExist) {
    throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist!!!");
  }

  // generate access token
  const newAccessToken = jwtHelpers.createToken(
    { phoneNumber: isUserExist.phoneNumber, role: isUserExist.role },
    config.jwt.secret as Secret,
    config.jwt.expire_in as string
  );

  return {
    accessToken: newAccessToken,
  };
};

export const AuthService = {
  loginUser,
  refreshToken,
};
