import { Request, Response } from 'express';
import { MediaService } from '../services/media.service';
import { logger } from '../../utils/logger';
import { StatusCodes } from '../enum/statuscode.enum';

export class MediaController {
  public async getAllMedia(req: Request, res: Response): Promise<void> {
    try {
      const result = await MediaService.getAllMedia();
      const films = result.films.map(f => f.toObject ? f.toObject() : f);
      const series = result.series.map(s => s.toObject ? s.toObject() : s);
      res.status(StatusCodes.SUCCESS).json({ films, series });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur du serveur", error });
    }
  }

  public async getMediaById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    try {
      const result = await MediaService.getMediaById(id);

      if (!result) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `Media ${id} no encontrado` });
        return;
      }

      const data = result.data.toObject ? result.data.toObject() : result.data;
      res.status(StatusCodes.SUCCESS).json({ type: result.type, data });
    } catch (error) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Error del servidor", error });
    }
  }


  public async addMedia(req: Request, res: Response): Promise<void> {
    try {
      const userRole = (req as any).user?.role;
      const result = await MediaService.addMedia(req.body, userRole);
      const data = result.data.toObject ? result.data.toObject() : result.data;
      res.status(StatusCodes.ACCEPTED).json({ message: result.message, data });
    } catch (error: any) {

      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }

  public async patchMedia(req: Request, res: Response): Promise<void> {
    try {
      const userRole = (req as any).user?.role;
      const result = await MediaService.patchMedia(req.params.id, req.body, userRole);
      const data = result.data.toObject ? result.data.toObject() : result.data;
      res.status(StatusCodes.SUCCESS).json({ message: result.message, data });
    } catch (error: any) {

      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }
}
