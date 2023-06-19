import { Model } from 'mongoose';
import { Breed, Category, Label, Location } from './cow.constant';

export type ICow = {
  name: string;
  age: number;
  price: number;
  location: Location;
  breed: Breed;
  weight: number;
  label: Label;
  category: Category;
  sellerId: string;
};
export type CowModel = Model<ICow, Record<string, unknown>>;

export type ICowFilters = { searchTerm?: string };
