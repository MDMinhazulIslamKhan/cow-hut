/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { Role } from './user.constant';

export type UserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  phoneNumber: string;
  role: Role;
  password: string;
  name: UserName;
  address: string;
  budget?: number;
  income?: number;
};

export type UserModel = {
  isUserExist(
    phoneNumber: string
  ): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
