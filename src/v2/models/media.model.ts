
export abstract class MediaModel {
    constructor(
        public id: string,
        public title: string,
        public genre: string,
        public year: number,
        public rating: number
    ) {}

}