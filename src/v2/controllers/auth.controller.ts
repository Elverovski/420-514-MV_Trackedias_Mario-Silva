import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { StatusCodes } from '../enum/statuscode.enum';

export class AuthController {

  static async register(req: Request, res: Response) {
    try {
      const result = await AuthService.register(req.body);
      res.status(StatusCodes.ACCEPTED).json(result);
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }

  static async login(req: Request, res: Response) {
    try {
      const result = await AuthService.login(req.body.email, req.body.password);
      res.status(StatusCodes.SUCCESS).json(result);
    } catch (err: any) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: err.message });
    }
  }
}
