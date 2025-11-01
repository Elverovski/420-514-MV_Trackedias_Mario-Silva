import { Request, Response } from "express";
import { SerieService } from "../services/serie.service";
import { StatusCodes } from "../enum/statuscode.enum";
import { logger } from "../../utils/logger";

export class SerieController {
    static async getAll(req: Request, res: Response) {
        try {
            const series = await SerieService.getAllSeries();
            res.status(StatusCodes.SUCCESS).json(series);
        } catch (err) {
            logger.error("Erreur getAllSeries", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async getById(req: Request, res: Response) {
        try {
            const serie = await SerieService.getSerieById(req.params.id);
            if (!serie) return res.status(StatusCodes.NOT_FOUND).json({ message: "Série introuvable" });
            res.status(StatusCodes.SUCCESS).json(serie);
        } catch (err) {
            logger.error("Erreur getSerieById", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async create(req: Request, res: Response) {
        try {
            const newSerie = await SerieService.createSerie(req.body);
            res.status(StatusCodes.CREATED).json(newSerie);
        } catch (err) {
            logger.error("Erreur createSerie", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async update(req: Request, res: Response) {
        try {
            const updatedSerie = await SerieService.updateSerie(req.params.id, req.body);
            if (!updatedSerie) return res.status(StatusCodes.NOT_FOUND).json({ message: "Série introuvable" });
            res.status(StatusCodes.SUCCESS).json(updatedSerie);
        } catch (err) {
            logger.error("Erreur updateSerie", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async delete(req: Request, res: Response) {
        try {
            const deletedSerie = await SerieService.deleteSerie(req.params.id);
            if (!deletedSerie) return res.status(StatusCodes.NOT_FOUND).json({ message: "Série introuvable" });
            res.status(StatusCodes.SUCCESS).json({ message: "Série supprimée avec succès" });
        } catch (err) {
            logger.error("Erreur deleteSerie", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async getSeasons(req: Request, res: Response) {
        try {
            const seasons = await SerieService.getSeasons(req.params.seriesId);
            if (!seasons) return res.status(StatusCodes.NOT_FOUND).json({ message: "Série introuvable" });
            res.status(StatusCodes.SUCCESS).json(seasons);
        } catch (err) {
            logger.error("Erreur getSeasons", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async getSeasonByNumber(req: Request, res: Response) {
        try {
            const season = await SerieService.getSeasonByNumber(req.params.seriesId, Number(req.params.seasonNumber));
            if (!season) return res.status(StatusCodes.NOT_FOUND).json({ message: "Saison introuvable" });
            res.status(StatusCodes.SUCCESS).json(season);
        } catch (err) {
            logger.error("Erreur getSeasonByNumber", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async addSeason(req: Request, res: Response) {
        try {
            const updatedSerie = await SerieService.addSeason(req.params.seriesId, req.body);
            res.status(StatusCodes.CREATED).json(updatedSerie);
        } catch (err) {
            logger.error("Erreur addSeason", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async getFiltered(req: Request, res: Response) {
        try {
            const result = await SerieService.getFilteredSeries(req.query);
            res.status(StatusCodes.SUCCESS).json(result);
        } catch (err) {
            logger.error("Erreur getFilteredSeries", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async getEpisodes(req: Request, res: Response) {
        try {
            const minDuration = req.query.minDuration ? Number(req.query.minDuration) : undefined;

            const episodes = await SerieService.getEpisodes(req.params.seriesId, Number(req.params.seasonNumber), minDuration);

            if (!episodes || episodes.length === 0)
                return res.status(StatusCodes.NOT_FOUND).json({ message: "Aucun épisode trouvé" });

            res.status(StatusCodes.SUCCESS).json(episodes);
        } catch (err) {
            logger.error("Erreur getEpisodes", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }



    static async getEpisodeByNumber(req: Request, res: Response) {
        try {
            const episode = await SerieService.getEpisodeByNumber(req.params.seriesId, Number(req.params.seasonNumber), Number(req.params.episodeNumber));
            if (!episode) return res.status(StatusCodes.NOT_FOUND).json({ message: "Épisode introuvable" });
            res.status(StatusCodes.SUCCESS).json(episode);
        } catch (err) {
            logger.error("Erreur getEpisodeByNumber", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }

    static async addEpisode(req: Request, res: Response) {
        try {
            const updatedSerie = await SerieService.addEpisode(req.params.seriesId, Number(req.params.seasonNumber), req.body);
            res.status(StatusCodes.CREATED).json(updatedSerie);
        } catch (err) {
            logger.error("Erreur addEpisode", err);
            res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur serveur" });
        }
    }


}
