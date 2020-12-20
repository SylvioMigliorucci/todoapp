/* eslint-disable prettier/prettier */
import { Router } from 'express';
import ProjectController from './app/controllers/ProjectController';
import TaskController from './app/controllers/TaskController';
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

routes.get('/projects/:project_id/tasks', TaskController.index);
routes.post('/projects/:project_id/tasks', TaskController.store);
routes.put('/projects/:project_id/tasks/:id', TaskController.update);
routes.delete('/projects/:project_id/tasks/:id', TaskController.destroy);


export default routes;