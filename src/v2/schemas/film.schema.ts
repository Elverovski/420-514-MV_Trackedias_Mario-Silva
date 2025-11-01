import mongoose, { Schema } from "mongoose";
import { IFilm } from "../interfaces/film.interface";

const FilmSchema = new Schema({
  id: { type: String, unique: true, required: true }, 
  title: { type: String, required: true },
  genre: { type: String, required: true },
  year: { type: Number, required: true },
  rating: { type: Number, min: 0, max: 10, default: 0 },
  duration: { type: Number, required: true },
  watched: { type: Boolean, default: false },
}, { timestamps: true });

const Film = mongoose.model<IFilm>("Film", FilmSchema);
export default Film;
