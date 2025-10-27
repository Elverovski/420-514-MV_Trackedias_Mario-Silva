import { FilmService } from './film.service';
import { SerieService } from './serie.service';
import { FilmModel } from '../models/film.model';
import { SerieModel } from '../models/serie.model';
import { Statut } from '../enum/statut.enum';
import { validateTitre, validateDuration, validateStatus } from '../../utils/regex';
import { logger } from '../../utils/logger';

export class MediaService {
    static async getAllMedia() {
        const films = await FilmService.getAllFilms();
        const series = await SerieService.getAllSeries();
        logger.info('Recuperation de tous les medias ');
        return { film: films, serie: series };
    }

    static async getMediaById(id: string) {
        if (id.startsWith('f')) {
            const film = await FilmService.getFilmById(id);
            if (film) {
                logger.info(`Film trouvé: ${id}`);
                return { type: 'film', data: film };
            }
        } else if (id.startsWith('s')) {
            const serie = await SerieService.getSerieById(id);
            if (serie) {
                logger.info(`Série trouvée: ${id}`);
                return { type: 'serie', data: serie };
            }
        }
        logger.warn(`Media non trouvé: ${id}`);
        return null;
    }

    static async addMedia(data: any) {
        const { id, title, genre, year, rating, duration, watched, status, seasons } = data;

        // Validation RegEx
        if (!validateTitre(title)) throw new Error("Titre invalide");
        if (!validateDuration(duration)) throw new Error("Durée invalide");

        // Si film
        if (id.startsWith('f')) {
            const newFilm = new FilmModel(id, title, genre, year, rating, duration, watched);
            await FilmService.createFilm(newFilm);
            logger.info(`Film ajouté: ${id}`);
            return { message: "Film ajouté", data: newFilm };

            // Si serie
        } else if (id.startsWith('s')) {
            // Validation RegEx
            if (!status || !validateStatus(status)) throw new Error("Statut invalide pour serie");

            const newSerie = new SerieModel(id, title, genre, year, rating, status as Statut, duration);
            newSerie.seasons = seasons || [];
            await SerieService.createSerie(newSerie);
            logger.info(`Série ajoutée: ${id}`);
            return { message: "Série ajoutée", data: newSerie };
        }

        throw new Error("ID invalide, il doit commencer par 'f' ou 's'");
    }

    static async patchMedia(id: string, data: any) {
        const { title, genre, year, rating, duration, watched, status, seasons } = data;

        // Validation RegEx
        if (title && !validateTitre(title)) throw new Error("Titre invalide");
        if (duration && !validateDuration(duration)) throw new Error("Durée invalide");

        // Si Film
        if (id.startsWith('f')) {
            const existingFilm = await FilmService.getFilmById(id);
            if (!existingFilm) throw new Error("Film non trouvé");


            const updatedFilm = new FilmModel(
                id,
                title ?? existingFilm.title,
                genre ?? existingFilm.genre,
                year ?? existingFilm.year,
                rating ?? existingFilm.rating,
                duration ?? existingFilm.duration,
                watched ?? existingFilm.watched
            );
            await FilmService.updateFilm(updatedFilm);
            logger.info(`Film mis à jour partiellement: ${id}`);
            return { message: "Film mis à jour partiellement", data: updatedFilm };
        // Si serie 
        } else if (id.startsWith('s')) {
            const existingSerie = await SerieService.getSerieById(id);
            if (!existingSerie) throw new Error("Serie non trouvée");

            // Validation RegEx
            if (status && !validateStatus(status)) throw new Error("Statut invalide");

            const updatedSerie = new SerieModel(
                id,
                title ?? existingSerie.title,
                genre ?? existingSerie.genre,
                year ?? existingSerie.year,
                rating ?? existingSerie.rating,
                status ? (status as Statut) : existingSerie.status,
                duration ?? existingSerie.duration
            );
            updatedSerie.seasons = seasons ?? existingSerie.seasons;
            await SerieService.updateSerie(updatedSerie);
            logger.info(`Serie mise a jour partiellement: ${id}`);
            return { message: "Serie mise a jour partiellement", data: updatedSerie };

        } else {
            throw new Error("ID invalide, il doit commencer par 'f' ou 's'");
        }
    }
}
