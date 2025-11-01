import mongoose, { Schema } from "mongoose"
import { IUser } from "../interfaces/user.interface"; 

const UserSchema = new Schema({
    id: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true, match: /^[^\s@]+@[^\s@]+.[^\s@]+$/ },
    nom: { type: String, required: true},
    username: { type: String, required: true, minlength: 3, maxlength: 30, match: /^[a-zA-Z0-9._-]+$/},
    password: { type: String, required: true},
    role: { type: String, enum: ["Admin", "User"], default: "User"},
    favorites: [{ type: mongoose.Types.ObjectId, ref: "Media" }],
}, { timestamps: true })

const User = mongoose.model<IUser>("User", UserSchema);
export default User;