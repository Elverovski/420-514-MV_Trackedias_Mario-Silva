import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { StatusCodes } from '../enum/statuscode.enum';

export class UserController {

  static async getAllUsers(req: Request, res: Response) {
    const users = await UserService.getAllUsers();
    res.status(StatusCodes.SUCCESS).json(users);
  }

  static async getUserById(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });
    res.status(StatusCodes.SUCCESS).json(user);
  }

  static async createUser(req: Request, res: Response) {
    try {
      await UserService.createUser(req.body);
      res.status(StatusCodes.ACCEPTED).json({ message: 'Utilisateur créé' });
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });

    await UserService.updateUser({ ...req.body, id });
    res.status(StatusCodes.SUCCESS).json({ message: 'Utilisateur mis à jour' });
  }

  static async deleteUser(req: Request, res: Response) {
    const id = Number(req.params.id);
    const user = await UserService.getUserById(id);
    if (!user) return res.status(StatusCodes.NOT_FOUND).json({ message: 'Utilisateur non trouvé' });

    await UserService.deleteUser(id);
    res.status(StatusCodes.SUCCESS).json({ message: 'Utilisateur supprimé' });
  }
}
