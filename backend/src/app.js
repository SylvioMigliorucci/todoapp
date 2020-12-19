import './bootstrap';
import 'express-async-errors';
import express from 'express';
import cors from 'cors';
import path from 'path';
import Youch from 'youch';
import cron from 'node-cron';
import ServiceError from './util/ServiceError';
import SendPushAboutPayment from './app/jobs/SendPushAboutPayment';

import routes from './routes';
import './database';

// eslint-disable-next-line no-underscore-dangle
global.__rootProject = path.resolve(__dirname, '..');

class App {
  constructor() {
    this.server = express();

    this.middlewares();
    this.routes();
    this.exceptionHandler();
    this.jobs();
  }

  jobs() {
    cron.schedule('33 17 * * *', () => {
      SendPushAboutPayment();
    });
  }

  middlewares() {
    this.server.use(cors());
    this.server.use(express.json({ limit: '50mb' }));

    // serve static files
    this.server.use(express.static(path.join(__dirname, '../public')));
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      const errorStatus = err.status || 500;
      const errorMessage = err.message || 'Internal server error';

      if (
        process.env.NODE_ENV === 'development' ||
        process.env.NODE_ENV === 'test'
      ) {
        const errors = await new Youch(err, req).toJSON();

        return res
          .status(errorStatus)
          .json({ error: errorMessage, developmentError: errors });
      }

      if (err instanceof ServiceError) {
        return res.status(err.status).json({ error: errorMessage });
      }
      return res.status(500).json({ error: errorMessage });
    });
  }
}

export default new App().server;
