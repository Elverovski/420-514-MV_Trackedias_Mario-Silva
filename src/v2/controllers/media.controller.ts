import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';
import { logger } from '../../utils/logger';
import { StatusCodes } from '../enum/statuscode.enum';

export class MediaController {

  public async getAllMedia(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.getAllMedia();
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (error) {
      logger.error('Erreur getAllMedia', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur de serveur", error });
    }
  }

  public async getMediaById(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.getMediaById(req.params.id);
      if (!result) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `Media ${req.params.id} not found` });
        return;
      }
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (error) {
      logger.error('Erreur getMediaById', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur du serveur", error });
    }
  }

  public async addMedia(req: Request, res: Response): Promise<void> {
    try {
      const userRole = (req as any).user?.role; 
      const result = await MediaService.addMedia(req.body, userRole);
      res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error: any) {
      logger.error('Erreur addMedia', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }

  public async patchMedia(req: Request, res: Response): Promise<void> {
    try {
      const userRole = (req as any).user?.role; 
      const result = await MediaService.patchMedia(req.params.id, req.body, userRole);
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (error: any) {
      logger.error('Erreur patchMedia', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }
}
