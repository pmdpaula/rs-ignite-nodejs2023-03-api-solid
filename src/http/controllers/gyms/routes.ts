import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', create);
};
