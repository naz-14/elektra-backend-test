import { User } from "../../../domain/entities/User";

export interface IUserService {
  getUserById(id: string): Promise<User | null>;
  getUsers(): Promise<User[]>;
  createUser(user: User): Promise<User>;
}
