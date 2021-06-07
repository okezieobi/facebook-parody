export default (Router, handleResponse, { user: { signup, login } }) => {
  const router = Router();

  router.post('/signup', signup, handleResponse('user'));

  router.post('/login', login, handleResponse('user'));

  return router;
};
