import { EpisodeModel as Episode } from './episode.model';

export class SeasonModel {
  constructor(
    public seriesId: string,
    public seasonNumber: number, 
    public releaseDate: Date,
    public episodes: Episode[] = [] 
  ) {}
}
