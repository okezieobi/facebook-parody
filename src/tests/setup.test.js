import 'jest-chain';
import 'jest-extended';

import utils from './utils';

beforeAll(async () => {
  await utils.models.User.deleteMany();
  await utils.models.Post.deleteMany();
  const post = await utils.seed.postDoc.save();
  utils.seed.userDoc.posts.push(post);
  await utils.seed.userDoc.save();
  await utils.seed.secondUserDoc.save();
});

afterAll(async () => {
  await utils.models.db.close();
});
