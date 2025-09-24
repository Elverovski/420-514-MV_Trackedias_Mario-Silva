import { Film } from '../interfaces/film.interface';

export class FilmModel implements Film {
    constructor(
        public id: string,
        public title: string,
        public genre: string,
        public year: number,
        public rating: number,
        public duration: number,
        public watched: boolean
    ){}
}