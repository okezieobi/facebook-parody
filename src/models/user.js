import bcrypt from '../utils/bcrypt';

export default (Schema) => {
  const schema = new Schema({
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      enum: ['Client', 'Admin'],
      default: 'Client',
    },
    posts: [{ type: Schema.Types.ObjectId, ref: 'Post' }],
  }, { timestamps: true });

  schema.pre('save', function encryptPassword(next) {
    if (this.isModified('password')) {
      this.password = bcrypt.hashString(this.password);
      next();
    } else next();
  });

  schema.statics.comparePassword = (hashedPassword = '', password = '') => bcrypt.compareString(hashedPassword, password);
  return schema;
};
