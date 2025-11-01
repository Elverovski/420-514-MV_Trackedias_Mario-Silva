import { MediaModel as Media } from './media.model';
import { SeasonModel as Season } from './season.model';
import { Statut } from '../enum/statut.enum';

export class SerieModel extends Media {
  public seasons: Season[];
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
    this.seasons = [];
  }
}
