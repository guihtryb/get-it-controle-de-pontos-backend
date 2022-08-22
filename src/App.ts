import express, { Router } from 'express';
import cors from 'cors';
import path from 'path';

export default class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.config();
  }

  private config() {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(
      '/images',
      express.static(path.join(__dirname, '../public/images')),
    );
  }

  public addRouter(router: Router) {
    this.app.use(router);
  }

  public startServer(PORT: number | string = 3001) {
    this.app.listen(
      PORT,
      () => console.log(`Server running on localhost:${PORT}`),
    );
  }
}