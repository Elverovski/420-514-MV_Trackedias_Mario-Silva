
import { FilmModel as Film } from '../models/film.model';
import * as fs from 'fs';

const filepath = "./src/data/db.json";
const film: Film[] = [];

export class FilmService {

    // Methode GET pour obtenir touts les films
    public static async getAllFilms(): Promise<Film[]> {
        const data = fs.readFileSync(filepath, "utf8");
        return JSON.parse(data)["film"]
    }

    // Methode GET pour obtenir un film specifique par le id
    public static async getFilmById(id: string): Promise<Film | undefined> {
        const data = fs.readFileSync(filepath, "utf8");
        const films: Film[] = JSON.parse(data)["film"];
        return films.find(film => film.id === id);
    }


    // Methode POST pour creer un film
    public static async createFilm(newFilm: Film): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["film"]) data["film"] = [];
        data["film"].push(newFilm);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }
}