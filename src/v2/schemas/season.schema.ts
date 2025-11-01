import { Schema } from "mongoose";
import { EpisodeSchema } from "./episode.schema";

export const SeasonSchema = new Schema({
  seasonNumber: { type: Number, required: true },
  releaseDate: { type: String, required: true },
  episodes: { type: [EpisodeSchema], default: [] },
});
