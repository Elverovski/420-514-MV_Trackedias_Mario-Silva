import Serie from "../schemas/serie.schema";
import { ISerie } from "../interfaces/serie.interface";
import { ISeason } from "../interfaces/season.interface";
import { IEpisode } from "../interfaces/episode.interface";

export class SerieService {

  public static async getAllSeries(): Promise<ISerie[]> {
    return await Serie.find();
  }

  public static async getSerieById(id: string): Promise<ISerie | null> {
    return await Serie.findOne({ id });
  }

  public static async createSerie(newSerie: Partial<ISerie>): Promise<ISerie> {
    const serie = new Serie(newSerie);
    return await serie.save();
  }

  public static async updateSerie(id: string, updatedData: Partial<ISerie>): Promise<ISerie | null> {
    return await Serie.findOneAndUpdate({ id }, updatedData, { new: true });
  }

  public static async deleteSerie(id: string): Promise<ISerie | null> {
    return await Serie.findOneAndDelete({ id });
  }

  public static async addSeason(seriesId: string, newSeason: ISeason): Promise<ISerie | null> {
    return await Serie.findOneAndUpdate({ id: seriesId }, { $push: { seasons: newSeason } }, { new: true });
  }

  public static async getSeasons(seriesId: string): Promise<ISeason[] | null> {
    const serie = await Serie.findOne({ id: seriesId });
    return serie ? (serie.seasons as ISeason[]) : null;
  }

  public static async getSeasonByNumber(seriesId: string, seasonNumber: number): Promise<ISeason | null> {
    const serie = await Serie.findOne({ id: seriesId, "seasons.seasonNumber": seasonNumber }, { "seasons.$": 1 });
    const season = serie?.seasons?.[0] as ISeason | undefined;
    return season || null;
  }


  public static async addEpisode(seriesId: string, seasonNumber: number, newEpisode: IEpisode): Promise<ISerie | null> {
    return await Serie.findOneAndUpdate({ id: seriesId, "seasons.seasonNumber": seasonNumber }, { $push: { "seasons.$.episodes": newEpisode } }, { new: true });
  }

  public static async getEpisodes(seriesId: string, seasonNumber: number, minDuration?: number): Promise<IEpisode[] | null> {

    const serie = await Serie.findOne({ id: seriesId }, { seasons: { $elemMatch: { seasonNumber } } });

    const season = serie?.seasons?.[0] as ISeason | undefined;
    if (!season) return null;

    let episodes = season.episodes || [];
    if (typeof minDuration === "number" && !isNaN(minDuration)) {
      episodes = episodes.filter(ep => ep.duration >= minDuration);
    }

    return episodes;
  }



  public static async getEpisodeByNumber(seriesId: string, seasonNumber: number, episodeNumber: number): Promise<IEpisode | null> {
    const serie = await Serie.findOne({ id: seriesId, "seasons.seasonNumber": seasonNumber }, { "seasons.$": 1 });
    const season = serie?.seasons?.[0] as ISeason | undefined;
    const episode = season?.episodes?.find(ep => ep.episodeNumber === episodeNumber);
    return episode || null;
  }

  public static async getFilteredSeries(query: any) {
    const { title, genre, status, minYear, maxYear, page = 1, limit = 10 } = query;

    const filter: any = {};
    if (title) filter.title = { $regex: title, $options: "i" };
    if (genre) filter.genre = genre;
    if (status) filter.status = { $regex: status, $options: "i" };
    if (minYear) filter.year = { $gte: parseInt(minYear) };
    if (maxYear) filter.year = { ...(filter.year || {}), $lte: parseInt(maxYear) };

    const p = Math.max(1, parseInt(page));
    const l = Math.min(100, Math.max(1, parseInt(limit)));

    const total = await Serie.countDocuments(filter);
    const items = await Serie.find(filter).skip((p - 1) * l).limit(l);

    return { items, total, page: p, pages: Math.ceil(total / l) };
  }
}
