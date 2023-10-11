import 'express-async-errors';
import express, { NextFunction, Request, Response } from 'express';
import routes from './routes';
import { AppError } from './errors/AppError';

const server = express();

server.use(express.json());

server.use(routes);

server.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({
      status: 'error',
      message: err.message,
    });
  }

  return res.status(500).json({
    status: 'error',
    message: `Internal server error - ${err.message}`,
  });
});

server.listen(3000, () => console.log('Server running! 🚀'));
