import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { authenticateToken, authorizeRole } from '../middlewares/auth.middleware';
import { Role } from '../enum/role.enum';

const router = Router();
const mediaController = new MediaController();

router.get('/medias', mediaController.getAllMedia.bind(mediaController));
router.get('/medias/:id', mediaController.getMediaById.bind(mediaController));
router.post('/medias', authenticateToken, authorizeRole(Role.ADMIN), mediaController.addMedia.bind(mediaController));
router.patch('/medias/:id', authenticateToken, authorizeRole(Role.ADMIN), mediaController.patchMedia.bind(mediaController));

export default router;
