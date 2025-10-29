import { MediaModel as Media } from './media.model';

export class FilmModel extends Media {
  public _id?: string;

  constructor(
    id: string,
    title: string,
    genre: string,
    year: number,
    rating: number,
    public duration: number,
    public watched: boolean
  ) {
    super(id, title, genre, year, rating);
  }
}
