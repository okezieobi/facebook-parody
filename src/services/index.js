import models from '../models';
import UserServices from './user';
import PostServices from './post';

class CustomError extends Error {
  constructor(status, ...params) {
    // Pass remaining arguments (including vendor specific ones) to parent constructor
    super(...params);
    // Maintains proper stack trace for where our error was thrown (only available on V8)
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, CustomError);
    }
    this.name = 'CustomError';
    // Custom debugging information
    this.status = status;
    this.date = new Date();
  }
}

const ownsOne = (parent, child, error) => {
  const ownsChild = parent.includes(child);
  if (!ownsChild) throw new CustomError(406, error);
};

export default {
  user: new UserServices(models, CustomError),
  post: new PostServices(models, CustomError, ownsOne),
};
