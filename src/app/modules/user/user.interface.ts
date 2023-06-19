import { Model } from 'mongoose';
import { Role } from './user.constant';

export type IUser = {
  phoneNumber: string;
  role: Role;
  password: string;
  name: {
    firstName: string;
    lastName: string;
  };
  address: string;
  budget: number;
  income: number;
};
export type UserModel = Model<IUser, Record<string, unknown>>;
