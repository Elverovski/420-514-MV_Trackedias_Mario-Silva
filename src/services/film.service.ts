
import { FilmModel as Film } from '../models/film.model';
import * as fs from 'fs';

const filepath = "./src/data/db.json";
const film: Film[] = [];

export class FilmService {
    public static async getAllFilms(): Promise<Film[]> {
        const filmdata = fs.readFileSync(filepath, "utf8");
        return JSON.parse(filmdata)["film"]
    }

    public static async getFilmById(id: string): Promise<Film | undefined> {
        const filmdata = fs.readFileSync(filepath, "utf8");
        const films: Film[] = JSON.parse(filmdata)["film"];
        return films.find(film => film.id === id);
    }       
}