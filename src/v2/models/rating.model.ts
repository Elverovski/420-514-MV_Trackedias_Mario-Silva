export type RatingTarget = 'movie' | 'episode';

export class RatingModel {
  public _id?: string;

  constructor(
    public userId: number,
    public target: RatingTarget, 
    public targetId: string,     
    public score: number,        
    public review?: string       
  ) {}
}
