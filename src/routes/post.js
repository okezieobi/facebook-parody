export default (Router, handleResponse,
  {
    post: {
      createOne, getAll, verifyOne, updateOne, getOne, deleteOne,
    },
  }) => {
  const router = Router();

  router.route('/')
    .post(createOne, handleResponse('post'))
    .get(getAll, handleResponse('posts'));

  router.use('/:id', verifyOne);
  router.route('/:id')
    .put(updateOne, handleResponse('post'))
    .get(getOne, handleResponse('post'))
    .delete(deleteOne, handleResponse('post'));

  return router;
};
