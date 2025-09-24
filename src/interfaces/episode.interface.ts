import { Media } from "./media.interface";

export interface Episode extends Media{
    duration: number;
    episodeNumber: number;
    watched: boolean;
}