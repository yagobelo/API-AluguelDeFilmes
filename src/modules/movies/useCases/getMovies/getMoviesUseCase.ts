import { Movie } from '@prisma/client';
import { prisma } from '../../../../prisma/client';

export class GetMoviesUseCase {
  async execute(): Promise<Movie[]> {
    const movies = await prisma.movie.findMany({
      orderBy: {
        release_at: 'desc',
      },
    });

    return movies;
  }
}
