import { FilmModel as Film } from '../models/film.model';
import * as fs from 'fs';

const filepath = "./src/data/db.json";
const film: Film[] = [];

export class FilmService {

    // Methode GET pour obtenir touts les films
    public static async getAllFilms(): Promise<Film[]> {
        return JSON.parse(fs.readFileSync(filepath, "utf8"))["film"]
    }

    // Methode GET pour obtenir un film specifique par le id
    public static async getFilmById(id: string): Promise<Film | undefined> {
        const films: Film[] = JSON.parse(fs.readFileSync(filepath, "utf8"))["film"];
        return films.find(film => film.id === id);
    }


    // Methode POST pour creer un film
    public static async createFilm(newFilm: Film): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["film"]) data["film"] = [];
        data["film"].push(newFilm);
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }

    // METHODE PUT pour mettre a jour un film
    public static async updateFilm(newFilm: Film): Promise<void> {

        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["film"]) data["film"] = [];

        const existingFilm = data["film"].findIndex((f: Film) => f.id === newFilm.id);
        if (existingFilm !== -1) {
            data["film"][existingFilm] = newFilm;
        } else {
            data["film"].push(newFilm);
        }
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }


    // METHODE DELETE pour efface un film 
    public static async deleteFilm(id: string): Promise<void> {
        const data = JSON.parse(fs.readFileSync(filepath, "utf8"));
        if (!data["film"]) data["film"] = [];
        const films = data["film"].filter((f: Film) => f.id !== id);
        data["film"] = films;
        fs.writeFileSync(filepath, JSON.stringify(data, null, 2), "utf8");
    }


}