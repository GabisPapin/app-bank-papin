import 'reflect-metadata';
import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import routes from './routes';
import { dataSource } from '@shared/http/typeorm';

const port = Number(process.env.SERVER_PORT);

const app = express();

app.use(cors());
app.use(express.json());

app.use(routes);

dataSource.initialize().then(() => {
  app.listen(port, () => {
    console.log(`Server started on port ${port}! 🏆`);
  });
});
