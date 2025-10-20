import { Router } from 'express';
import { MediaController } from '../controllers/media.controller'

const router = Router();
const mediaController = new MediaController();

router.get('/medias', mediaController.getAllMedia);
router.get('/medias/:id', mediaController.getMediaById);
router.post('/medias', mediaController.addMedia);
router.patch('/medias/:id', mediaController.patchMedia);

export default router;