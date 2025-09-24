import { Media } from '../interfaces/media.interface';

export interface Serie extends Media {
    status: "En cours"|"Terminée"
    Duration: number;
}