import { Document, Types } from "mongoose";
import { Statut } from "../enum/statut.enum";
import { MediaModel as Media } from "../models/media.model";
import { SeasonModel as Season } from "../models/season.model";

export interface ISerie extends Document {
  id: string;
  title: string;
  genre: string;
  year: number;
  rating: number;
  status: Statut;
  duration: number;
  seasons: Types.ObjectId[] | Season[];
  createdAt?: Date;
  updatedAt?: Date;
}
