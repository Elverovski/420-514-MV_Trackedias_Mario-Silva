import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { logger } from '../../utils/logger';
import { StatusCodes } from '../enum/statuscode.enum';

export class UserController {

  public async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
      const users = await UserService.getAllUsers();
      res.status(StatusCodes.SUCCESS).json(users);
    } catch (error) {
      logger.error('Erreur getAllUsers', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur du serveur", error });
    }
  }

  public async getUserById(req: Request, res: Response): Promise<void> {
    try {
      const user = await UserService.getUserById(req.params.id);
      if (!user) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `Utilisateur ${req.params.id} non trouvé` });
        return;
      }
      res.status(StatusCodes.SUCCESS).json(user);
    } catch (error) {
      logger.error('Erreur getUserById', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: "Erreur du serveur", error });
    }
  }

  public async updateUser(req: Request, res: Response): Promise<void> {
    try {
      const updatedUser = await UserService.updateUser(req.params.id, req.body);
      if (!updatedUser) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `Utilisateur ${req.params.id} non trouvé` });
        return;
      }
      res.status(StatusCodes.SUCCESS).json({ message: "Utilisateur mis à jour", data: updatedUser });
    } catch (error: any) {
      logger.error('Erreur updateUser', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }

  public async deleteUser(req: Request, res: Response): Promise<void> {
    try {
      const deletedUser = await UserService.deleteUser(req.params.id);
      if (!deletedUser) {
        res.status(StatusCodes.NOT_FOUND).json({ message: `Utilisateur ${req.params.id} non trouvé` });
      }
      res.status(StatusCodes.SUCCESS).json({ message: "Utilisateur supprimé", data: deletedUser });
    } catch (error: any) {
      logger.error('Erreur deleteUser', { error });
      res.status(StatusCodes.BAD_REQUEST).json({ message: error.message || "Erreur du serveur", error });
    }
  }
}
