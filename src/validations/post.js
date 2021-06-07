export default (body, param) => ({
  body: {
    create: {
      title: body('title')
        .notEmpty()
        .withMessage('Post title should be at least a character long')
        .isString()
        .withMessage('Post title must be string data type'),
      body: body('body')
        .notEmpty()
        .withMessage('Post body should be at least a character long')
        .isString()
        .withMessage('Post body must be string data type'),
    },
  },
  param: {
    id: param('id', 'Store id does not match MongoId format')
      .isMongoId(),
  },
});
