import { Router } from 'express';
import { RatingController } from '../controllers/rating.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new RatingController();

router.post('/ratings', authenticateToken, controller.addRating.bind(controller));
router.get('/ratings', controller.getAllRatings.bind(controller));
router.get('/ratings/:id', controller.getRatingById.bind(controller));
router.get('/ratings/avg/:target/:targetId', controller.getAverageRating.bind(controller));
router.delete('/ratings/:id', authenticateToken, controller.deleteRating.bind(controller));

export default router;
