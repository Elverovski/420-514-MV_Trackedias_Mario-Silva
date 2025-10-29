import { RatingModel, RatingTarget } from '../models/rating.model';
import * as fs from 'fs';
import * as path from 'path';
import { logger } from '../../utils/logger';

const FILE_PATH = path.join(process.cwd(), 'src/data/ratings.json');

function readRatings(): RatingModel[] {
  if (!fs.existsSync(FILE_PATH)) fs.writeFileSync(FILE_PATH, '[]', 'utf-8');
  const raw = fs.readFileSync(FILE_PATH, 'utf-8');
  return JSON.parse(raw) as RatingModel[];
}

function writeRatings(ratings: RatingModel[]) {
  fs.writeFileSync(FILE_PATH, JSON.stringify(ratings, null, 2), 'utf-8');
}

export class RatingService {

  static async addRating(rating: RatingModel) {
    const ratings = readRatings();
    ratings.push(rating);
    writeRatings(ratings);
    logger.info(`Rating ajouté par user ${rating.userId} sur ${rating.target} ${rating.targetId}`);
    return rating;
  }

  static async getAllRatings() {
    return readRatings();
  }

  static async getRatingById(id: string) {
    const ratings = readRatings();
    return ratings.find(r => r._id === id) || null;
  }

  static async getAverageRating(target: RatingTarget, targetId: string) {
    const ratings = readRatings().filter(r => r.target === target && r.targetId === targetId);
    if (ratings.length === 0) return 0;
    const avg = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
    return parseFloat(avg.toFixed(2));
  }
}
