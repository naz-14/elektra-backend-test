import { IUserService } from "../ports/in/IUserService";
import { IUserRepository } from "../ports/out/IUserRepository";
import { User } from "../../domain/entities/User";

export class UserService implements IUserService {
  constructor(private userRepository: IUserRepository) {}

  getUsers(): Promise<User[]> {
    return this.userRepository.findAll();
  }

  getUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  createUser(user: User): Promise<User> {
    return this.userRepository.save(user);
  }
}
