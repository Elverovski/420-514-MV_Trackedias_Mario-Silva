import { MediaModel as Media } from '../models/media.model'

export class FilmModel extends Media {
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
