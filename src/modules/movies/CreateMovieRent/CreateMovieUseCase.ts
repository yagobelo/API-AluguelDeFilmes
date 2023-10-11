import { AppError } from '../../../errors/AppError';
import { prisma } from '../../../prisma/client';
import { CreateMovieRentDTO } from '../dtos/CreateMovieRentDTOs';

export class CreateMovieRentUseCase {
  async execute({ movieId, userId }: CreateMovieRentDTO): Promise<void> {
    const movieExist = prisma.movie.findUnique({
      where: {
        id: movieId,
      },
    });
    if (!movieExist) {
      throw new AppError('Movie does not exist!', 400);
    }

    const movieRented = await prisma.movieRent.findFirst({
      where: {
        movieId,
      },
    });
    if (movieRented) {
      throw new AppError('Movie already rented!', 400);
    }

    const userExist = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (!userExist) {
      throw new AppError('User does not exist!', 400);
    }

    await prisma.movieRent.create({
      data: {
        movieId,
        userId,
      },
    });
  }
}
