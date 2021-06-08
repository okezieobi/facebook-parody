/* eslint-disable no-underscore-dangle */
export default class PostController {
  constructor({ post }, handleServices) {
    this.service = post;
    this.createOne = this.createOne.bind(this);
    this.findAll = this.findAll.bind(this);
    this.updateOne = this.updateOne.bind(this);
    this.verifyOne = this.verifyOne.bind(this);
    this.getOne = this.getOne.bind(this);
    this.deleteOne = this.deleteOne.bind(this);
    this.handleServices = handleServices;
  }

  createOne({ body }, res, next) {
    const arg = {
      user: res.locals.user,
      input: body,
    };
    return this.handleServices({
      service: this.service, method: 'create', input: arg, res, next, data: 'post',
    });
  }

  findAll({ query: { owner } }, res, next) {
    const arg = {
      user: res.locals.user,
      owner,
    };
    return this.handleServices({
      service: this.service, method: 'getAll', input: arg, res, next, data: 'posts',
    });
  }

  verifyOne({ params: { id } }, res, next) {
    return this.handleServices({
      service: this.service, method: 'verifyOne', input: id, res, next, data: 'post',
    });
  }

  getOne(req, res, next) {
    return this.handleServices({
      service: this.service, method: 'getOne', input: res.locals.post, res, next, data: 'post',
    });
  }

  updateOne({ body: { title, body } }, res, next) {
    const arg = {
      user: res.locals.user,
      post: res.locals.post,
      input: {
        title: title || res.locals.post.title,
        body: body || res.locals.post.body,
      },
    };
    return this.handleServices({
      service: this.service, method: 'updateOne', input: arg, res, next, data: 'post',
    });
  }

  deleteOne(req, res, next) {
    const arg = {
      user: res.locals.user,
      post: res.locals.post,
    };
    return this.handleServices({
      service: this.service, method: 'deleteOne', input: arg, res, next, data: 'post',
    });
  }
}
