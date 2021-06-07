/* eslint-disable no-underscore-dangle */
export default class PostServices {
  constructor({ Post }, CustomError, ownsOne) {
    this.model = Post;
    this.CustomError = CustomError;
    this.ownsOne = ownsOne;
  }

  async create(arg) {
    const { user, input } = arg;
    const post = await this.model.create({ ...input });
    user.posts.push(post);
    await user.save();
    return { ...post._doc, status: 201 };
  }

  async getAll(filter = {}) {
    return this.model.find(filter, 'id title body createdAt updatedAt', { sort: '-createdAt' }).lean();
  }

  async verifyOne(id) {
    const post = await this.model.findById(id);
    if (post === null) throw new this.CustomError(404, 'Post not found');
    return post;
  }

  async getOne(post) {
    const data = await this.model.findById(post._id).lean();
    return data;
  }

  async updateOne(arg) {
    const { user, post, input } = arg;
    this.ownsOne(user.posts, post._id, 'Post can only be updated by owner');
    Object.entries(input).forEach(([key, value]) => { post[key] = value; });
    await post.save();
    const updatedPost = await this.getOne(post);
    return updatedPost;
  }

  async deleteOne(arg) {
    const { user, post } = arg;
    this.ownsOne(user.posts, post._id, 'Post can only be deleted by owner');
    await this.model.deleteOne({ _id: post._id });
    return { status: 204 };
  }
}
