import { Document, model, Schema, Types } from 'mongoose';

const { ObjectId } = Schema.Types;

type PostInterface = {
  title: string;
  text: string;
  slug: string;
  user: Types.ObjectId;
  active: boolean;
} & Document;

const PostSchema = new Schema<PostInterface>(
  {
    slug: {
      type: String,
      trim: true,
      required: true,
      index: true
    },
    title: {
      type: String,
      trim: true
    },
    text: {
      type: String
    },
    user: {
      type: ObjectId,
      ref: 'User',
      required: true,
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
