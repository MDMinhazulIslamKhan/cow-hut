import { Model, Types } from 'mongoose';
import { Breed, Category, Label, Location } from './cow.constant';
import { IUser } from '../user/user.interface';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  sellerId: IUser & Types.ObjectId;
};
export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = {
  searchTerm?: string;
  maxPrice?: number;
  minPrice?: number;
};
