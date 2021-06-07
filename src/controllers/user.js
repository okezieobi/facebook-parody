import jwt from '../utils/jwt';

export default class UserController {
  constructor({ user }, handleServices) {
    this.service = user;
    this.login = this.login.bind(this);
    this.signup = this.signup.bind(this);
    this.authJWT = this.authJWT.bind(this);
    this.handleServices = handleServices;
    this.setJWT = (req, res, next) => {
      res.locals.user.token = jwt.generate(res.locals.user);
      next();
    };
  }

  signup({ body }, res, next) {
    return this.handleServices({
      service: this.service, method: 'create', input: body, res, next, data: 'user',
    });
  }

  login({ body }, res, next) {
    return this.handleServices({
      service: this.service, method: 'auth', input: body, res, next, data: 'user',
    });
  }

  async authJWT({ headers }, res, next) {
    jwt.verify(headers)
      .then((decoded) => this.handleServices({
        service: this.service, method: 'authJWT', res, next, data: 'user', input: decoded,
      }))
      .catch((err) => {
        if (process.env.NODE_ENV === 'development') next(err);
        else next({ status: 401, message: err.message });
      });
  }
}
