import Rating from "../schemas/rating.schema";
import { IRating } from "../interfaces/rating.interface";

export class RatingService {

    public static async addRating(data: Partial<IRating>): Promise<IRating> {
        const { userId, target, targetId, score, review } = data;

        if (!userId) throw new Error("userId manquant");
        if (!target || !["film", "episode"].includes(target)) throw new Error("Target invalide");
        if (!targetId) throw new Error("targetId manquant");
        if (typeof score !== "number" || score < 1 || score > 5) throw new Error("Score invalide : 1-5");

        const rating = new Rating({ userId, target, targetId, score, review });
        return rating.save();
    }

    public static async getAllRatings(): Promise<IRating[]> {
        return Rating.find();
    }

    public static async getRatingById(id: string): Promise<IRating | null> {
        return Rating.findById(id);
    }

    public static async getRatingsByTarget(target: "film" | "episode", targetId: string): Promise<IRating[]> {
        return Rating.find({ target, targetId });
    }

    public static async getAverageRating(target: "film" | "episode", targetId: string): Promise<number> {
        const ratings = await Rating.find({ target, targetId });
        if (!ratings.length) return 0;
        const avg = ratings.reduce((sum, r) => sum + r.score, 0) / ratings.length;
        return parseFloat(avg.toFixed(2));
    }

    public static async deleteRating(id: string): Promise<IRating | null> {
        return Rating.findByIdAndDelete(id);
    }
}
