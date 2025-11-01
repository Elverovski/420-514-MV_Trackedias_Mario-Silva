import { Schema } from "mongoose";

export const EpisodeSchema = new Schema({
  id: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  episodeNumber: { type: Number, required: true },
  watched: { type: Boolean, default: false },
});