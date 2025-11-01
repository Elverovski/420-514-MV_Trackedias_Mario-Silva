import { FilmService } from "./film.service";
import { SerieService } from "./serie.service";
import { Statut } from "../enum/statut.enum";
import { validateTitre, validateDuration, validateStatuts } from "../../utils/regex";
import { logger } from "../../utils/logger";

export class MediaService {

  static async getAllMedia() {
    const films = await FilmService.getAllFilms();
    const series = await SerieService.getAllSeries();
    logger.info("🎬 Récupération de tous les médias depuis MongoDB");
    return { films, series };
  }

  static async getMediaById(id: string) {
    const film = await FilmService.getFilmById(id);
    if (film) return { type: "film", data: film };

    const serie = await SerieService.getSerieById(id);
    if (serie) return { type: "serie", data: serie };

    logger.warn(`Média non trouvé: ${id}`);
    return null;
  }

  static async addMedia(data: any, userRole: string) {
    if (userRole !== "Admin") throw new Error("Action réservée aux administrateurs");

    const { id, title, genre, year, rating, duration, watched, status, seasons, type } = data;

    if (!id || !validateTitre(title)) throw new Error("ID ou titre invalide");
    if (!validateDuration(duration)) throw new Error("Durée invalide");

    if (type === "film") {
      const newFilm = await FilmService.createFilm({ id, title, genre, year, rating, duration, watched });
      logger.info(`Film ajouté : ${newFilm.id}`);
      return { message: "Film ajouté", data: newFilm };
    }

    if (type === "serie") {
      if (!status || !validateStatuts(status)) throw new Error("Statut invalide pour série");
      const newSerie = await SerieService.createSerie({ id, title, genre, year, rating, duration, status: status as Statut, seasons: seasons || [] });
      logger.info(`Série ajoutée : ${newSerie.id}`);
      return { message: "Série ajoutée", data: newSerie };
    }

    throw new Error("Type invalide, doit être 'film' ou 'serie'");
  }

  static async patchMedia(id: string, data: any, userRole: string) {
    if (userRole !== "Admin") throw new Error("Action réservée aux administrateurs");

    const { title, genre, year, rating, duration, watched, status, seasons, type } = data;

    if (title && !validateTitre(title)) throw new Error("Titre invalide");
    if (duration && !validateDuration(duration)) throw new Error("Durée invalide");

    if (type === "film") {
      const updatedFilm = await FilmService.updateFilm(id, { title, genre, year, rating, duration, watched });
      if (!updatedFilm) throw new Error("Film non trouvé");
      logger.info(`Film mis à jour : ${id}`);
      return { message: "Film mis à jour", data: updatedFilm };
    }

    if (type === "serie") {
      if (status && !validateStatuts(status)) throw new Error("Statut invalide");
      const updatedSerie = await SerieService.updateSerie(id, { title, genre, year, rating, duration, status, seasons });
      if (!updatedSerie) throw new Error("Série non trouvée");
      logger.info(`Série mise à jour : ${id}`);
      return { message: "Série mise à jour", data: updatedSerie };
    }

    throw new Error("Type invalide, doit être 'film' ou 'serie'");
  }
}
