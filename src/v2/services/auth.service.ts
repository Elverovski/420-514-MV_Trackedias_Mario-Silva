import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from "../schemas/user.schema";
import { Role } from '../enum/role.enum';
import { IUser } from '../interfaces/user.interface';
import { validateEmail, validateNom, validateUsername, validatePassword, validateRole } from "../../utils/regex";

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';
const JWT_EXPIRES_IN = '1h';

export class AuthService {

  static async register(userData: Partial<IUser>) {
    const { id, email, username, nom, password, role } = userData;

    if (!email || !username || !nom || !password) {
      throw new Error('Données manquantes');
    }

    if (!validateEmail(email)) throw new Error('Email invalide');
    if (!validateNom(nom)) throw new Error('Nom invalide');
    if (!validateUsername(username)) throw new Error('Nom d’utilisateur invalide');
    if (!validatePassword(password)) throw new Error('Mot de passe invalide');
    if (role && !validateRole(role)) throw new Error('Role invalide');

    const existingUser = await User.findOne({ email });
    if (existingUser) throw new Error('Utilisateur déjà existant');

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ id, email, nom, username, password: hashedPassword, role: role || Role.USER });

    await newUser.save();

    return { message: 'Utilisateur enregistré', user: newUser };
  }

  static async login(email: string, password: string) {
    const user = await User.findOne({ email });
    if (!user) throw new Error('Nom d’utilisateur ou mot de passe incorrect');

    const valid = await bcrypt.compare(password, user.password);
    if (!valid) throw new Error('Nom d’utilisateur ou mot de passe incorrect');

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    return { accessToken: token };
  }

  static verifyToken(token: string) {
    try {
      const decoded = jwt.verify(token, JWT_SECRET);
      return decoded;
    } catch {
      throw new Error('Token invalide ou expiré');
    }
  }
}
