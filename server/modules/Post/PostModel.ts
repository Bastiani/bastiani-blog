import { Document, model, Schema, Types } from 'mongoose';

const { ObjectId } = Schema.Types;

type PostInterface = {
  description: string;
  image: string;
  title: string;
  text: string;
  slug: string;
  user: Types.ObjectId;
  active: boolean;
} & Document;

const PostSchema = new Schema<PostInterface>(
  {
    image: {
      type: String
    },
    slug: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    title: {
      type: String,
      trim: true,
      required: true
    },
    description: {
      type: String,
      trim: true,
      required: true
    },
    text: {
      type: String,
      required: true
    },
    user: {
      type: ObjectId,
      ref: 'User',
      index: true
    },
    active: {
      type: Boolean,
      default: true,
      required: true
    }
  },
  {
    timestamps: {
      createdAt: 'createdAt',
      updatedAt: 'updatedAt'
    },
    collection: 'Post'
  }
);

export default model<PostInterface>('Post', PostSchema);
