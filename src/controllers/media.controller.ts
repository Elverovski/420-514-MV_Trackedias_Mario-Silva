import { Request, Response } from 'express';
import { FilmService } from '../services/film.service';
import { SerieService } from '../services/serie.service';
import { FilmModel } from '../models/film.model';
import { SerieModel } from '../models/serie.model';
import { Statut } from '../enum/statut.enum';
import { validateTitre, validateDuration, validateStatus } from '../utils/regex';


export class MediaController {
  public async getAllMedia(req: Request, res: Response): Promise<void> {
    const films = await FilmService.getAllFilms()
    const series = await SerieService.getAllSeries()

    const medias = { film: films, serie: series }
    res.json(medias)
  }

  public async getMediaById(req: Request, res: Response): Promise<void> {
    const id = req.params.id;

    if (id.startsWith('f')) {
      const film = await FilmService.getFilmById(id);
      if (film) {
        res.json({ type: 'film', data: film });
        return;
      }
    } else if (id.startsWith('s')) {
      const serie = await SerieService.getSerieById(id);
      if (serie) {
        res.json({ type: 'serie', data: serie });
        return;
      }
    }
    res.status(404).json({ message: `Media with ID ${id} not found` });
  }


  // Methode POST pour ajouter un media
  public async addMedia(req: Request, res: Response): Promise<void> {
    const { id, title, genre, year, rating, duration, watched, status, seasons } = req.body;

    if (!id || !title || !genre || !year || !rating || !duration) {
      res.status(400).json({ message: "Champs obligatoires manquants" });
      return;
    }

    // Validation
    if (!validateTitre(title)) { res.status(400).json({ message: "Titre invalide" }); return; }
    if (!validateDuration(duration)) { res.status(400).json({ message: "Durée invalide" }); return; }

    if (id.startsWith('f')) {
      // C'est un film
      const newFilm = new FilmModel(id, title, genre, year, rating, duration, watched || false);
      await FilmService.createFilm(newFilm);
      res.status(201).json({ message: "Film ajouté", data: newFilm });
      return;
    } else if (id.startsWith('s')) {
      // C'est une série
      if (!status || !validateStatus(status)) {
        res.status(400).json({ message: "Statut invalide pour la serie" });
        return;
      }

      const newSerie = new SerieModel(id, title, genre, year, rating, status as Statut, duration);
      newSerie.seasons = seasons || [];
      await SerieService.createSerie(newSerie);

      res.status(201).json({ message: "Serie ajoutée", data: newSerie });
      return;
    }

    res.status(400).json({ message: "Le ID est invalide, il doit commencer par 'f' pour film ou 's' pour série" });
  }


}






