import { Request, Response } from "express";
import { RatingService } from "../services/rating.service";
import { StatusCodes } from "../enum/statuscode.enum";

export class RatingController {

  public async addRating(req: Request, res: Response) {
    try {
      const userId = (req as any).user?.id; 
      if (!userId) {
        return res.status(StatusCodes.UNAUTHORIZED).json({ message: "Token invalide" });
      }

      const rating = await RatingService.addRating({ ...req.body, userId });
      res.status(StatusCodes.CREATED).json({ message: "Rating ajouté", data: rating });
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message || "Erreur serveur" });
    }
  }

  public async getAllRatings(req: Request, res: Response) {
    try {
      const ratings = await RatingService.getAllRatings();
      res.status(StatusCodes.SUCCESS).json(ratings);
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  public async getRatingById(req: Request, res: Response) {
    try {
      const rating = await RatingService.getRatingById(req.params.id);
      if (!rating) return res.status(StatusCodes.NOT_FOUND).json({ message: "Rating non trouvé" });
      res.status(StatusCodes.SUCCESS).json(rating);
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  public async getAverageRating(req: Request, res: Response) {
    try {
      const { target, targetId } = req.params;
      if (!["film", "episode"].includes(target)) {
        return res.status(StatusCodes.BAD_REQUEST).json({ message: "Target invalide" });
      }
      const avg = await RatingService.getAverageRating(target as "film" | "episode", targetId);
      res.status(StatusCodes.SUCCESS).json({ target, targetId, average: avg });
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  public async deleteRating(req: Request, res: Response) {
    try {
      const rating = await RatingService.deleteRating(req.params.id);
      if (!rating) return res.status(StatusCodes.NOT_FOUND).json({ message: "Rating non trouvé" });
      res.status(StatusCodes.SUCCESS).json({ message: "Rating supprimé", data: rating });
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
}
