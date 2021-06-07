import services from '../services';
import UserController from './user';
import PostController from './post';

const handleServices = async ({
  service, method, input, res, next, data,
}) => {
  res.locals[data] = await service[method](input).catch(next);
  next();
};

export default {
  user: new UserController(services, handleServices),
  post: new PostController(services, handleServices),
};
