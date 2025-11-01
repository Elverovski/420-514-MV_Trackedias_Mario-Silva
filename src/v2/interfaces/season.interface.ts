import { IEpisode } from './episode.interface';

export interface ISeason {
  seasonNumber: number;
  releaseDate: string;    
  episodes: IEpisode[];
}