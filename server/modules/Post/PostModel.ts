import { Document, model, Schema, Types } from 'mongoose';

const { ObjectId } = Schema.Types;

type PostInterface = {
  title: string
  text: string
  user: Types.ObjectId
  active: boolean
} & Document;

const PostSchema = new Schema<PostInterface>(
  {
    title: {
      type: String,
      trim: true,
    },
    text: {
      type: String,
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
      index: true,
    },
    active: {
      type: Boolean,
      default: true,
      required: true,
    },
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt',
    },
    collection: 'Post',
  },
);

export default model<PostInterface>('Post', PostSchema);
