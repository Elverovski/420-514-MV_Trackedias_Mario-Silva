import { FilmModel as Film } from '../models/film.model';
import * as fs from 'fs';
import * as path from 'path';

const filepath = path.join(process.cwd(), 'src/v2/data/films.json');

if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]", "utf8");

export class FilmService {
    public static async getAllFilms(): Promise<Film[]> {
        const data = fs.readFileSync(filepath, "utf8");
        return JSON.parse(data || "[]");
    }

    public static async getFilmById(id: string): Promise<Film | undefined> {
        const films = await this.getAllFilms();
        return films.find(f => f.id === id);
    }

    public static async createFilm(newFilm: Film): Promise<void> {
        const films = await this.getAllFilms();
        films.push(newFilm);
        fs.writeFileSync(filepath, JSON.stringify(films, null, 2), "utf8");
    }

    public static async updateFilm(updatedFilm: Film): Promise<void> {
        const films = await this.getAllFilms();
        const index = films.findIndex(f => f.id === updatedFilm.id);
        if (index !== -1) films[index] = updatedFilm;
        else films.push(updatedFilm);
        fs.writeFileSync(filepath, JSON.stringify(films, null, 2), "utf8");
    }

    public static async deleteFilm(id: string): Promise<void> {
        const films = await this.getAllFilms();
        const filtered = films.filter(f => f.id !== id);
        fs.writeFileSync(filepath, JSON.stringify(filtered, null, 2), "utf8");
    }
}
