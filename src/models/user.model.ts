import { User } from '../interfaces/user.interface';
import { Media } from '../interfaces/media.interface';
import { Role } from '../enum/role.enum';

export class UserModel implements User {
  constructor(
    public id: number,
    public email: string,
    public password: string,
    public role: Role = Role.USER,
    public favorites: Media[]
    ) {}
}