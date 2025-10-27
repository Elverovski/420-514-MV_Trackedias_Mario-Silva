import { UserModel as User } from '../models/user.model';
import * as fs from 'fs';
import * as path from 'path';

const filepath = path.join(process.cwd(), 'src/v2/data/users.json');

if (!fs.existsSync(filepath)) fs.writeFileSync(filepath, "[]", "utf8");

export class UserService {
    public static async getAllUsers(): Promise<User[]> {
        const data = fs.readFileSync(filepath, "utf8");
        return JSON.parse(data || "[]");
    }

    public static async getUserById(id: number): Promise<User | undefined> {
        const users = await this.getAllUsers();
        return users.find(u => u.id === id);
    }

    public static async createUser(newUser: User): Promise<void> {
        const users = await this.getAllUsers();
        users.push(newUser);
        fs.writeFileSync(filepath, JSON.stringify(users, null, 2), "utf8");
    }

    public static async updateUser(updatedUser: User): Promise<void> {
        const users = await this.getAllUsers();
        const index = users.findIndex(u => u.id === updatedUser.id);
        if (index !== -1) users[index] = updatedUser;
        else users.push(updatedUser);
        fs.writeFileSync(filepath, JSON.stringify(users, null, 2), "utf8");
    }

    public static async deleteUser(id: number): Promise<void> {
        const users = await this.getAllUsers();
        const filtered = users.filter(u => u.id !== id);
        fs.writeFileSync(filepath, JSON.stringify(filtered, null, 2), "utf8");
    }
}
