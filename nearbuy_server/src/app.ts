import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

import publicRoutes from './routes/public-routes';
import privateRoutes from './routes/private-routes';
import { tokenValidation } from './middlewares/authorization';
import { notFound } from './middlewares/404';

class App {
  public express: express.Application;

  public constructor() {
    dotenv.config();
    this.express = express();
    this.middlewares();
    this.publicRoutes();
    this.privateRoutes();
    this.notFound();
  }

  private middlewares() {
    this.express.use(cors());
    this.express.use(express.json());
    this.express.use(cookieParser());
  }
  
  private publicRoutes() {
    this.express.use(publicRoutes);
  }

  private privateRoutes() {
    this.express.use(tokenValidation);
    this.express.use(privateRoutes);
  }

  private notFound() {
    this.express.use(notFound);
  }
}

export default new App().express;