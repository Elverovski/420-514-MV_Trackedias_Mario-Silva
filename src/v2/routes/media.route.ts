import { Router } from 'express';
import { MediaController } from '../controllers/media.controller';
import { authorizeRole } from '../middlewares/auth.middleware';
import { Role } from '../enum/role.enum'; 

const router = Router();
const mediaController = new MediaController();

router.get('/medias', mediaController.getAllMedia);
router.get('/medias/:id', mediaController.getMediaById);

router.post('/medias', authorizeRole(Role.ADMIN), mediaController.addMedia);
router.patch('/medias/:id', authorizeRole(Role.ADMIN), mediaController.patchMedia);

export default router;