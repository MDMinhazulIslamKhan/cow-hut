import bcrypt from 'bcrypt';
import { Schema, model } from 'mongoose';
import { IUser, UserModel } from './user.interface';
import { userRoles } from './user.constant';
import config from '../../../config';

const userSchema = new Schema<IUser, UserModel>(
  {
    phoneNumber: {
      type: String,
      required: true,
      unique: true,
    },
    role: {
      type: String,
      required: true,
      enum: userRoles,
    },
    password: {
      type: String,
      required: true,
      select: 0,
    },
    name: {
      firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
    },
    address: {
      type: String,
      required: true,
    },
    budget: {
      type: Number,
    },
    income: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

/*---        static method below            ---*/
userSchema.statics.isUserExist = async function (
  phoneNumber: string
): Promise<Pick<IUser, 'phoneNumber' | 'password' | 'role'> | null> {
  return await User.findOne(
    { phoneNumber },
    { phoneNumber: 1, password: 1, role: 1 }
  );
};

userSchema.statics.isPasswordMatch = async function (
  givenPassword: string,
  savePassword: string
): Promise<boolean> {
  return await bcrypt.compare(givenPassword, savePassword);
};

userSchema.pre('save', async function (next) {
  // hashing password
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_rounds)
  );
  next();
});

const User = model<IUser, UserModel>('User', userSchema);

export default User;
