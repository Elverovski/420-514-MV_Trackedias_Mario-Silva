import { Request, Response } from 'express';
import { RatingService } from '../services/rating.service';
import { RatingModel } from '../models/rating.model';
import { StatusCodes } from '../enum/statuscode.enum';
import { logger } from '../../utils/logger';

export class RatingController {

  public async addRating(req: Request, res: Response) {
    try {
      const { userId, target, targetId, score, review } = req.body;
      if (!userId || !target || !targetId || score === undefined) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: 'Données manquantes' });
      }
      const newRating = new RatingModel(userId, target, targetId, score, review);
      const result = await RatingService.addRating(newRating);
      res.status(StatusCodes.ACCEPTED).json(result);
    } catch (error: any) {
      logger.error('Erreur addRating', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message });
    }
  }

  public async getAllRatings(req: Request, res: Response) {
    try {
      const result = await RatingService.getAllRatings();
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (error) {
      logger.error('Erreur getAllRatings', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Erreur du serveur' });
    }
  }

  public async getRatingById(req: Request, res: Response) {
    try {
      const result = await RatingService.getRatingById(req.params.id);
      if (!result) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Rating non trouvé' });
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (error) {
      logger.error('Erreur getRatingById', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Erreur du serveur' });
    }
  }

  public async getAverageRating(req: Request, res: Response) {
    try {
      const { target, targetId } = req.params;
      const avg = await RatingService.getAverageRating(target as 'movie' | 'episode', targetId);
      res.status(StatusCodes.SUCCESS).json({ target, targetId, average: avg });
    } catch (error) {
      logger.error('Erreur getAverageRating', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: 'Erreur du serveur' });
    }
  }
}
