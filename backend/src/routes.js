/* eslint-disable prettier/prettier */
import { Router } from 'express';
import UserController from './app/controllers/UserController';
import authMiddleware from './app/middlewares/auth';


const routes = new Router();


routes.post('/signin', UserController.store);

// routes.use(authMiddleware);
export default routes;