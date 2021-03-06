/* eslint-disable no-console */
import mongoose, { Schema, model } from 'mongoose';

import userSchema from './user';
import postSchema from './post';
import env from '../utils/env';

const models = {
  User: model('User', userSchema(Schema)),
  Post: model('Post', postSchema(Schema)),
};
mongoose.connect(env.databaseURL,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  });
const db = mongoose.connection;

const databaseSetup = () => {
  db.once('open', () => console.log('connected to database'));
};

if (process.env.NODE_ENV === 'development') {
  databaseSetup();
  Object.values(models).forEach(async (modelProp) => { await modelProp.deleteMany(); });
} else {
  databaseSetup();
}

export default {
  ...models, db,
};
