import { Episode } from "./episode.interface";

export interface Saeson {
    seasonNumber: number;
    releaseDate: Date;
    episodes: Episode[]
}