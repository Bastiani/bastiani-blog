import { Schema, model, Document } from 'mongoose';
import bcrypt from 'bcryptjs';

type UserInterface = {
  name?: string
  password?: string
  email: string
  active: boolean
  isAdmin: boolean
  authenticate(plainText: string): Promise<string | boolean>
  encryptPassword(password: string): Promise<string>
} & Document

const UserSchema = new Schema<UserInterface>(
  {
    name: {
      type: String,
      trim: true,
    },
    password: {
      type: String,
      hidden: true,
    },
    email: {
      type: String,
      required: true,
      index: true,
      lowercase: true,
      trim: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: false,
      default: false,
      description: 'Whether the user is admin or not',
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'User',
  },
);

UserSchema.index({ name: 'text' });
UserSchema.index({ email: 1 }, { unique: true });

UserSchema.pre('save', function hashPassword(next: any): Promise<string> | void {
  // Hash the password
  if (this.isModified('password')) {
    // @ts-ignore
    return this.encryptPassword(this.password)
      .then((hash: string): void => {
        // @ts-ignore
        this.password = hash;
        next();
      })
      .catch((err: string): void => next(err));
  }
  return next();
});

// @ts-ignore
UserSchema.methods = {
  async authenticate(plainText: string): Promise<string | boolean> {
    try {
      // @ts-ignore
      return await bcrypt.compare(plainText, this.password);
    } catch (err) {
      return false;
    }
  },
  async encryptPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 8);
  },
};

export default model<UserInterface>('User', UserSchema);
