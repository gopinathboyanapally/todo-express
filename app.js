import express from 'express';
import cors from 'cors';

import taskRouter from './routes/tasks.js';

const app = express();

const loggingMiddleware = (req, res, next) => {
  console.info(`${req.method} - ${req.url}`);
  next();
};

app.use(cors());
app.use(express.json());
app.use(loggingMiddleware);
app.use(taskRouter);

const port = process.env.PORT || 8080;

app.listen(port, error => {
  if (error) {
    console.error('This is a server error', error);
  } else {
    console.log(`Server listening on port ${port}`);
  }
});
