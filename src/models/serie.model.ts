import { MediaModel as Media } from '../models/media.model';
import { Status } from '../enum/status.enum';

export class SerieModel extends Media {
  constructor(
    id: string,
    title: string,
    genre: string,
    year: number,
    rating: number,
    public status: Status,
    public duration: number
  ) {
    super(id, title, genre, year, rating);
  }
}
