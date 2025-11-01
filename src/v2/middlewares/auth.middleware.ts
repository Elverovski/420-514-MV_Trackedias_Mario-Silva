import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { Role } from '../enum/role.enum';
import { StatusCodes } from '../enum/statuscode.enum';

const JWT_SECRET = process.env.JWT_SECRET || 'SECRET_KEY';

interface JwtPayload {
  id: number;
  email: string;
  role: Role;
}

export function authenticateToken(req: Request, res: Response, next: NextFunction) {
  const authHeader = req.headers['authorization'];
  const token = authHeader?.split(' ')[1]; 

  if (!token) {
    return res.status(StatusCodes.FORBIDDEN || 403).json({ message: 'Token manquant' });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    (req as any).user = decoded; 
    next();
  } catch (err) {
    return res.status(StatusCodes.FORBIDDEN || 403).json({ message: 'Token invalide ou expiré' });
  }
}


export function authorizeRole(role: Role) {
  return (req: Request, res: Response, next: NextFunction) => {
    const user = (req as any).user as JwtPayload;
    if (!user || user.role !== role) {
      return res.status(StatusCodes.UNAUTHORIZED || 401).json({ message: 'Accès refusé' });
    }
    next();
  };
}
