import { Movie } from '@prisma/client';
import { AppError } from '../../../../errors/AppError';
import { prisma } from '../../../../prisma/client';
import { CreateMovieDTO } from '../../dtos/CreateMovieDTOs';

export class CreateMovieUseCase {
  async execute({
    title,
    duration,
    release_at,
  }: CreateMovieDTO): Promise<Movie> {
    const movieExist = await prisma.movie.findUnique({
      where: {
        title,
      },
    });

    if (movieExist) {
      throw new AppError('Movie already exists!', 400);
    }

    const movie = await prisma.movie.create({
      data: {
        title,
        duration,
        release_at: new Date(release_at),
      },
    });

    return movie;
  }
}
