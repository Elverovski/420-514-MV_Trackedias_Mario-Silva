import { Document } from "mongoose";

export interface IFilm extends Document {
  id_film: string;  
  title: string;
  genre: string;
  year: number;
  rating: number;
  duration: number;
  watched: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
