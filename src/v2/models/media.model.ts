
export abstract class MediaModel {
    public _id?: string; 
    constructor(
        public id: string,
        public title: string,
        public genre: string,
        public year: number,
        public rating: number
    ) {}

}