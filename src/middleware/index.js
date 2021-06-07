import controllers from '../controllers';
import validations from '../validations';
import UserMiddleware from './user';
import PostMiddleware from './post';

export default {
  user: new UserMiddleware(validations, controllers),
  post: new PostMiddleware(validations, controllers),
};
