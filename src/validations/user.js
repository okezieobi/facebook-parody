export default (body, header) => ({
  body: {
    create: {
      email: body('email', 'Please enter a valid email address')
        .isEmail(),
      password: body('password')
        .notEmpty()
        .withMessage('Password should be at least a character long')
        .isString()
        .withMessage('Password must be string data type'),
      fullName: body('fullName')
        .notEmpty()
        .withMessage('Full name should be at least a character long')
        .isString()
        .withMessage('Full name must be string data type'),
    },
  },
  header: {
    jwt: header('token', 'Token does not match Json Web Token format')
      .isJWT(),
  },
});
