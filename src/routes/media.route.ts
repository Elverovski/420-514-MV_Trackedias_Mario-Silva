import { Router } from 'express';
import { MediaController } from '../controllers/media.controller'

const router = Router();
const userController = new MediaController();

router.get('/medias', userController.getAllMedia);


export default router;