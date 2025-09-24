import { Media } from '../interfaces/media.interface';

export abstract class MediaModel implements Media{
    constructor(
        public id: string,
        public title: string,
        public genre: string,
        public year: number,
        public rating: number
    ){}
}