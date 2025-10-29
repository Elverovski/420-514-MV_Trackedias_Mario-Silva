import { Router } from 'express';
import { RatingController } from '../controllers/rating.controller';
import { authenticateToken } from '../middlewares/auth.middleware';

const router = Router();
const controller = new RatingController();

router.post('/', authenticateToken, controller.addRating);
router.get('/', controller.getAllRatings);
router.get('/:id', controller.getRatingById);
router.get('/average/:target/:targetId', controller.getAverageRating);

export default router;
