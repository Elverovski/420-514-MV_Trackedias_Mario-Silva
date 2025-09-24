import { Media } from '../interfaces/media.interface';
import { Role } from '../enum/role.enum';

export interface User {
    id: number;
    email: string;
    password: string;
    role: Role;
    favorites: Media[];
}