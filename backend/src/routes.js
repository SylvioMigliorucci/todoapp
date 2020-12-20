/* eslint-disable prettier/prettier */
import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';


const routes = new Router();


routes.post('/signin', UserController.store);
routes.post('/login', UserController.index);

routes.use(authMiddleware);

routes.get('/projects', ProjectController.index);
routes.post('/projects', ProjectController.store);
routes.put('/projects/:id', ProjectController.update);
routes.delete('/projects/:id', ProjectController.destroy);

export default routes;