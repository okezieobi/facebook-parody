export default class UserServices {
  constructor({ User }, CustomError) {
    this.model = User;
    this.CustomError = CustomError;
  }

  async create(arg) {
    const userExists = await this.model
      .exists({ email: { $regex: arg.email, $options: 'i' } });
    if (userExists) throw new this.CustomError(406, `Account already exists with email ${arg.email}, please sign in or sign up with a different email`);
    await this.model.create(arg);
    const user = await this.model
      .findOne({ email: arg.email },
        '_id fullName email posts type createdAt').lean();
    return { ...user, status: 201 };
  }

  async auth(arg) {
    const userExists = await this.model
      .findOne({ email: { $regex: arg.email, $options: 'i' } }, 'email password').lean();
    if (userExists === null) throw new this.CustomError(404, `Account with ${arg.email} does not exist, please sign up by creating an account`);
    const verifyPassword = await this.model.comparePassword(userExists.password, arg.password);
    if (!verifyPassword) throw new this.CustomError(401, 'Password provided does not match user, please try again with the correct password');
    const user = await this.model
      .findOne({ email: userExists.email },
        '_id fullName email type posts createdAt updatedAt').populate('posts').lean();
    return user;
  }

  async authJWT(arg) {
    const user = await this.model.findById(arg);
    if (user === null) throw new this.CustomError(401, 'User not found, please sign up by creating an account or sign in');
    return user;
  }
}
