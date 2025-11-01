import mongoose, { Schema } from "mongoose";
import { IRating } from "../interfaces/rating.interface";

const RatingSchema = new Schema<IRating>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  target: { type: String, enum: ["film", "episode"], required: true },
  targetId: { type: String, required: true },
  score: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String, trim: true }
}, { timestamps: true });

const Rating = mongoose.model<IRating>("Rating", RatingSchema);
export default Rating;
