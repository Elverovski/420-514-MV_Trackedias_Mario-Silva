import { UserService } from './user.service';
import { UserModel } from '../models/user.model';
import { Role } from '../enum/role.enum';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
import { StatusCodes } from '../enum/statuscode.enum';

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';
const JWT_EXPIRES_IN = '1h';

export class AuthService {

  static async register(userData: Partial<UserModel>) {
    const {
      id,
      email,
      password,
      role
    }: {
      id?: number;
      email?: string;
      password?: string;
      role?: Role;
    } = userData;

    if (!id || !email || !password) {
      throw new Error('Données manquantes');
    }

    const existingUser = await UserService.getUserById(id);
    if (existingUser) throw new Error('Utilisateur déjà existant');

    const hashedPassword = await bcrypt.hash(password, 10);


    const newUser = new UserModel(
      id,
      email,
      hashedPassword,
      role || Role.USER
    );

    await UserService.createUser(newUser);

    return { message: 'Utilisateur enregistré', user: newUser };
  }

  static async login(email: string, password: string) {
    const users = await UserService.getAllUsers();
    const user = users.find(u => u.email === email);
    if (!user) throw new Error('Nom d’utilisateur ou mot de passe incorrect');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Nom d’utilisateur ou mot de passe incorrect');

    const token = jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { accessToken: token };
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch (err) {
      throw new Error('Token invalide ou expiré');
    }
  }
}
