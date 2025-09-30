import { Request, Response } from 'express';
import { FilmService } from '../services/film.service';
import { SerieService } from '../services/serie.service';
 
export class MediaController {
  public async getAllMedia(req: Request, res: Response): Promise<void> {
    const films = await FilmService.getAllFilms()
    const series = await SerieService.getAllSeries()

    const medias = {film: films, serie: series}
    res.json(medias)
  }

  


  
}