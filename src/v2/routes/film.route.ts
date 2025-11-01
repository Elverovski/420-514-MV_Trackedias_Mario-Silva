import { Router } from 'express';
import { FilmController } from '../controllers/film.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';
import { Role } from '../enum/role.enum';

const router = Router();

router.get('/films', FilmController.getAllFilms);
router.get('/films/:id', FilmController.getFilmById);
router.post('/films', authenticateToken, authorizeRole(Role.ADMIN), FilmController.createFilm);
router.patch('/films/:id', authenticateToken, authorizeRole(Role.ADMIN), FilmController.updateFilm);
router.delete('/films/:id', authenticateToken, authorizeRole(Role.ADMIN), FilmController.deleteFilm)
router.get("/movies", FilmController.getFilteredFilms);;

export default router;
