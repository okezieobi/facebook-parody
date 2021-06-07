export default class PostMiddleware {
  constructor(validations, controllers) {
    this.createOne = [...validations.post.create, controllers.post.createOne];
    this.getAll = controllers.post.findAll;
    this.verifyOne = [...validations.post.id, controllers.post.verifyOne];
    this.updateOne = controllers.post.updateOne;
    this.deleteOne = controllers.post.deleteOne;
    this.getOne = controllers.post.getOne;
  }
}
