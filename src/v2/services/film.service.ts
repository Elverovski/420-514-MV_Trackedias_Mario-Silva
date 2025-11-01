import Film from "../schemas/film.schema";
import { IFilm } from "../interfaces/film.interface";

export class FilmService {
  public static async getAllFilms(): Promise<IFilm[]> {
    return await Film.find();
  }

  public static async getFilmById(id: string): Promise<IFilm | null> {
    return await Film.findOne({ id });
  }

  public static async createFilm(newFilm: Partial<IFilm>): Promise<IFilm> {
    const film = new Film(newFilm);
    return await film.save();
  }

  public static async updateFilm(id: string, updatedFilm: Partial<IFilm>): Promise<IFilm | null> {
    return await Film.findOneAndUpdate({ id }, updatedFilm, { new: true });
  }

  public static async deleteFilm(id: string): Promise<IFilm | null> {
    return await Film.findOneAndDelete({ id });
  }

  public static async getFilteredFilms(query: any) {
    const { title, genre, minYear, maxDur, page = 1, limit = 10 } = query;

    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genre = genre;
    if (minYear) filter.year = { $gte: parseInt(minYear) };
    if (maxDur) filter.duration = { $lte: parseInt(maxDur) };

    const p = Math.max(1, parseInt(page));
    const l = Math.min(100, Math.max(1, parseInt(limit)));

    const total = await Film.countDocuments(filter);
    const items = await Film.find(filter).skip((p - 1) * l).limit(l);

    return { items, total, page: p, pages: Math.ceil(total / l) };
  }

}
