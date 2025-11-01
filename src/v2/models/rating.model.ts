export type RatingTarget = 'film' | 'episode';

export class RatingModel {

  constructor(
    public userId: number,
    public target: RatingTarget, 
    public targetId: string,     
    public score: number,        
    public review?: string       
  ) {}
}
