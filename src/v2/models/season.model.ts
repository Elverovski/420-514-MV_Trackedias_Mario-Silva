import { EpisodeModel } from "./episode.model";

export interface SeasonModel {
  seasonNumber: number;
  releaseDate: string;
  episodes: EpisodeModel[];
}
