import { Request, Response } from 'express';
import { CreateMovieRentUseCase } from '../CreateMovieRent/CreateMovieUseCase';

export class CreateMovieRentController {
  async handle(req: Request, res: Response) {
    const { movieId, userId } = req.body;

    const createMovieRentUseCase = new CreateMovieRentUseCase();

    await createMovieRentUseCase.execute({ movieId, userId });

    return res.status(201).json();
  }
}
