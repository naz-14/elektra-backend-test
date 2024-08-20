import { User } from "../../../domain/entities/User";

export interface IUserRepository {
  findById(id: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByPhone(phone: string): Promise<User | null>;
  findByUserName(userName: string): Promise<User | null>;
  save(user: User): Promise<User>;
  saveToken(userId: string, token: string): Promise<void>;
}
