
import { FilmModel as Film } from '../models/film.model';
import * as fs from 'fs';

const filepath = "./src/data/db.json";

export class FilmService {
    public static async getAllFilms(): Promise<Film[]> {
        const filmdata = fs.readFileSync(filepath, "utf8");
        let film: Film[] = [];
        return JSON.parse(filmdata)["film"]
    }
    
}