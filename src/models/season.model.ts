import { EpisodeModel as Episode } from '../models/episode.model'

export class SeasonModel {
    constructor(
        public seasonNumber: number,
        public releaseDate: Date,
        public episodes: Episode[]
    ){}
}