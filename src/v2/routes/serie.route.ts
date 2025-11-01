import { Router } from 'express';
import { SerieController } from '../controllers/serie.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';
import { Role } from '../enum/role.enum';

const router = Router();

router.get('/series/filtered', SerieController.getFiltered); 
router.get('/series', SerieController.getAll);
router.get('/series/:id', SerieController.getById);
router.post('/series', authenticateToken, authorizeRole(Role.ADMIN), SerieController.create);
router.patch('/series/:id', authenticateToken, authorizeRole(Role.ADMIN), SerieController.update);
router.delete('/series/:id', authenticateToken, authorizeRole(Role.ADMIN), SerieController.delete);


router.post('/series/:seriesId/seasons', authenticateToken, authorizeRole(Role.ADMIN), SerieController.addSeason);
router.get('/series/:seriesId/seasons', SerieController.getSeasons);
router.get('/series/:seriesId/seasons/:seasonNumber', SerieController.getSeasonByNumber);


router.post('/series/:seriesId/seasons/:seasonNumber/episodes', authenticateToken, authorizeRole(Role.ADMIN), SerieController.addEpisode);
router.get('/series/:seriesId/seasons/:seasonNumber/episodes', SerieController.getEpisodes);
router.get('/series/:seriesId/seasons/:seasonNumber/episodes/:episodeNumber', SerieController.getEpisodeByNumber);

export default router;
