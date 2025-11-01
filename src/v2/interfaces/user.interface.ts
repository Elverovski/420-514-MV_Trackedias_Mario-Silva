import { Document, Types } from "mongoose";
import { Role } from "../enum/role.enum";
import { MediaModel as Media } from "../models/media.model";

export interface IUser extends Document {
  id: string;
  email: string;
  nom: string;
  username: string;
  password: string;
  role: Role;
  favorites: Types.ObjectId[] | Media[];
  createdAt?: Date;
  updatedAt?: Date;
}
