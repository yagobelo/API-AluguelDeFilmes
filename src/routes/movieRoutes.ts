import { Router } from 'express';
import { CreateMovieController } from '../modules/movies/useCases/createMovie/CreateMovieController';
import { CreateMovieRentController } from '../modules/movies/CreateMovieRent/CreateMovieRentController';
import { GetMoviesController } from '../modules/movies/useCases/getMovies/getMoviesController';

const createMovieController = new CreateMovieController();
const createMovieRentController = new CreateMovieRentController();
const getMovies = new GetMoviesController();

const movieRoutes = Router();

movieRoutes.post('/', createMovieController.handle);
movieRoutes.post('/rent', createMovieRentController.handle);
movieRoutes.get('/', getMovies.handle);

export { movieRoutes };
