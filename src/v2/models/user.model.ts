import { Role } from '../enum/role.enum';
import { MediaModel as Media } from './media.model';

export class UserModel {

  constructor(
    public id: number,
    public email: string, 
    public username: string, 
    public password: string, 
    public role: Role = Role.USER,
    public favorites: Media[] = []
  ) {}
}
