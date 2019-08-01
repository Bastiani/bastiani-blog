/* eslint-disable no-console */
import mongoose, { Mongoose } from 'mongoose';

export default function connectDatabase(): Promise<Mongoose> {
  return new Promise((resolve, reject): void => {
    mongoose.Promise = global.Promise;
    mongoose.connection
      .on('error', error => reject(error))
      .on('close', () => console.log('Database connection closed.'))
      // @ts-ignore
      .once('open', () => resolve(mongoose.connections[0]));
    mongoose.connect(process.env.MONGO_URL || 'mongodb://localhost/bastiani-blog', { useNewUrlParser: true });
  });
}
