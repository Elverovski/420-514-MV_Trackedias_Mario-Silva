import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';
import { logger } from '../../utils/logger';

export class MediaController {
  
  public async getAllMedia(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.getAllMedia();
      res.json(result);
    } catch (error) {
      logger.error('Erreur getAllMedia', { error });
      res.status(500).json({ message: "Erreur de serveur", error });
    }
  }

  public async getMediaById(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.getMediaById(req.params.id);
      if (!result) res.status(404).json({ message: `Media ${req.params.id} not found` });
      res.json(result);
    } catch (error) {
      logger.error('Erreur getMediaById', { error });
      res.status(500).json({ message: "Erreur du serveur", error });
    }
  }

  public async addMedia(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.addMedia(req.body);
      res.status(201).json(result);
    } catch (error: any) {
      logger.error('Erreur addMedia', { error });
      res.status(500).json({ message: "Erreur du serveur", error });
    }
  }

  public async patchMedia(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.patchMedia(req.params.id, req.body);
      res.json(result);
    } catch (error: any) {
      logger.error('Erreur patchMedia', { error });
      res.status(500).json({ message: "Erreur du serveur", error });
      
    }
  }
}
