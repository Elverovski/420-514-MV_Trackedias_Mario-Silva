import { Request, Response } from "express";
import { FilmService } from "../services/film.service";
import { StatusCodes } from "../enum/statuscode.enum";
import { logger } from "../../utils/logger";

export class FilmController {
    public static async getAllFilms(req: Request, res: Response) {
        try {
            const films = await FilmService.getAllFilms();
            res.status(StatusCodes.SUCCESS).json(films);
        } catch (err) {
            logger.error("Erreur getAllFilms", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    public static async getFilteredFilms(req: Request, res: Response) {
        try {
            const result = await FilmService.getFilteredFilms(req.query);
            res.status(StatusCodes.SUCCESS).json(result);
        } catch (err) {
            logger.error("Erreur getFilteredFilms", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }
 
    public static async getFilmById(req: Request, res: Response) {
        try {
            const film = await FilmService.getFilmById(req.params.id);
            if (!film)
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Film introuvable" });
            res.status(StatusCodes.SUCCESS).json(film);
        } catch (err) {
            logger.error("Erreur getFilmById", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    public static async createFilm(req: Request, res: Response) {
        try {
            const userRole = (req as any).user?.role;
            if (userRole !== "Admin")
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Accès refusé" });

            const film = await FilmService.createFilm(req.body);
            res.status(StatusCodes.CREATED).json(film);
        } catch (err) {
            logger.error("Erreur createFilm", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    public static async updateFilm(req: Request, res: Response) {
        try {
            const userRole = (req as any).user?.role;
            if (userRole !== "Admin")
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Accès refusé" });

            const film = await FilmService.updateFilm(req.params.id, req.body);
            res.status(StatusCodes.SUCCESS).json(film);
        } catch (err) {
            logger.error("Erreur updateFilm", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    public static async deleteFilm(req: Request, res: Response) {
        try {
            const userRole = (req as any).user?.role;
            if (userRole !== "Admin")
                return res.status(StatusCodes.FORBIDDEN).json({ message: "Accès refusé" });

            const deleted = await FilmService.deleteFilm(req.params.id);
            res.status(StatusCodes.SUCCESS).json(deleted);
        } catch (err) {
            logger.error("Erreur deleteFilm", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }
}
