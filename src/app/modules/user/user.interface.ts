/* eslint-disable no-unused-vars */
import { Model } from 'mongoose';
import { Role } from './user.constant';

export type UserName = {
  firstName: string;
  lastName: string;
};
export type IUser = {
  id: string;
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
  ): Promise<Pick<IUser, 'id' | 'phoneNumber' | 'password' | 'role'>>;
  isPasswordMatch(
    givenPassword: string,
    savePassword: string
  ): Promise<boolean>;
} & Model<IUser>;
