import { Document, Types } from "mongoose";

export interface IRating extends Document {
  userId: Types.ObjectId;       
  target: "film" | "episode";
  targetId: string;
  score: number;
  review?: string;
  createdAt?: Date;
  updatedAt?: Date;
}
