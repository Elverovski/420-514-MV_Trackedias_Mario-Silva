import { Media } from '../interfaces/media.interface';

export interface Film extends Media {
    duration: number;
    watched: boolean;
}