import User from "../schemas/user.schema";
import { IUser } from "../interfaces/user.interface";
import { validateEmail, validateNom, validateUsername, validateRole } from "../../utils/regex";

export class UserService {

    public static async getAllUsers(): Promise<IUser[]> {
        return await User.find();
    }

    public static async getUserById(id: string): Promise<IUser | null> {
        return await User.findOne({ id });
    }

    public static async getUserByEmail(email: string): Promise<IUser | null> {
        return await User.findOne({ email });
    }

    public static async updateUser(id: string, updatedData: Partial<IUser>): Promise<IUser | null> {

        if (updatedData.email && !validateEmail(updatedData.email)) throw new Error('Email invalide');
        if (updatedData.nom && !validateNom(updatedData.nom)) throw new Error('Nom invalide');
        if (updatedData.username && !validateUsername(updatedData.username)) throw new Error('Nom d’utilisateur invalide');
        if (updatedData.role && !validateRole(updatedData.role)) throw new Error('Role invalide');

        return await User.findOneAndUpdate({ id }, updatedData, { new: true });
    }

    public static async deleteUser(id: string): Promise<IUser | null> {
        return await User.findOneAndDelete({ id });
    }

}
