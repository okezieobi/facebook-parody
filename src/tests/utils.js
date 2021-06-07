/* eslint-disable no-underscore-dangle */
/* eslint-disable no-undef */

import models from '../models';
import jwt from '../utils/jwt';

const user = {
  fullName: 'test-fullName', email: 'test@email.com', password: 'test-password',
};
const newUser = {
  fullName: 'test-fullName-new', email: 'test-new@email.com', password: 'test-password',
};

const secondUser = {
  fullName: 'test-fullName-new', email: 'test-second@email.com', password: 'test-password',
};
const userDoc = new models.User(user);
const secondUserDoc = new models.User(secondUser);
const secondToken = jwt.generate(secondUserDoc);
const token = jwt.generate(userDoc);
const user404 = {
  fullName: 'test-fullName-fake', email: 'test-fake@email.com', password: 'test-password',
};
const user404Doc = new models.User(user404);
const token401 = jwt.generate(user404Doc);

const post = { title: 'test-title', body: 'test-body' };
const newPost = { title: 'test-title-new', body: 'test-body-new' };
const postDoc = new models.Post(post);

export default {
  seed: { userDoc, postDoc, secondUserDoc },
  token,
  user,
  secondToken,
  post,
  newPost,
  newUser,
  user404,
  user404Doc,
  token401,
  models,
};
