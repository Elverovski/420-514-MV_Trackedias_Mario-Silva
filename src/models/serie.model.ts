import { MediaModel as Media } from '../models/media.model';
import { Statut } from '../enum/statut.enum';

export class SerieModel extends Media {
  constructor(
    id: string,
    title: string,
    genre: string,
    year: number,
    rating: number,
    public status: Statut,
    public duration: number
  ) {
    super(id, title, genre, year, rating);
  }
}
