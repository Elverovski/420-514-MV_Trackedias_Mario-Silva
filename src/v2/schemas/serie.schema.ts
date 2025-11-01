import mongoose, { Schema } from "mongoose";
import { ISerie } from "../interfaces/serie.interface";
import { SeasonSchema } from "./season.schema";

const SerieSchema = new Schema<ISerie>({
  id: { type: String, unique: true, required: true },
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  status: { type: String, enum: ["EN_COURS", "TERMINEE", "ANNULEE"], required: true },
  duration: { type: Number, required: true },
  seasons: [SeasonSchema],
}, { timestamps: true });

export default mongoose.model<ISerie>("Serie", SerieSchema);