import userRoutes from './user';
import postRoutes from './post';
import middleware from '../middleware';

export default (Router) => {
  const router = Router();

  const handleResponse = (key) => (req, res) => {
    res.status(res.locals[key].status || 200)
      .send({ data: { [key]: res.locals[key] } });
  };

  router.use('/auth', userRoutes(Router, handleResponse, middleware));
  router.use(middleware.user.jwt);
  router.use('/posts', postRoutes(Router, handleResponse, middleware));

  return router;
};
