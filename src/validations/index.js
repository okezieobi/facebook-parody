import {
  validationResult, body, header, param,
} from 'express-validator';

import userValidation from './user';
import postValidation from './post';

const handleValidationErr = (status = 400) => (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) next();
  else next({ message: errors.array(), status });
};

const validateUser = userValidation(body, header);
const validatePost = postValidation(body, param);

export default {
  user: {
    signup: [...Object.values(validateUser.body.create),
      handleValidationErr()],
    login: [...Object.entries(validateUser.body.create)
      .filter(([key]) => key === 'email' || key === 'password')
      .map((array) => array[1]),
    handleValidationErr()],
    jwt: [validateUser.header.jwt, handleValidationErr(401)],
  },
  post: {
    create: [...Object.values(validatePost.body.create), handleValidationErr()],
    id: [validatePost.param.id, handleValidationErr()],
  },
};
