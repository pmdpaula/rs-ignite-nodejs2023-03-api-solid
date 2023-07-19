import { verifyJwt } from '@/http/middlewares/verify-jwt';
import { FastifyInstance } from 'fastify';
import { search } from './search';
import { nearby } from './nearby';
import { create } from './create';
import { verifyUserRole } from '@/http/middlewares/verify-user-role';

export const gymsRoutes = async (app: FastifyInstance) => {
  app.addHook('onRequest', verifyJwt);

  app.get('/gyms/search', search);
  app.get('/gyms/nearby', nearby);

  app.post('/gyms', { onRequest: [verifyUserRole('ADMIN')] }, create);
};
