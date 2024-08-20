import { UserService } from "../../application/services/UserService";
import { AuthService } from "../../application/services/AuthService";
import { UserRepository } from "../adapters/out/db/repositories/MongoUserRepository";
import { IUserService } from "../../application/ports/in/IUserService";
import { IUserRepository } from "../../application/ports/out/IUserRepository";
import { IAuthService } from "../../application/ports/in/IAuthService";

// Repositorios
const userRepository: IUserRepository = new UserRepository();

// Servicios
const userService: IUserService = new UserService(userRepository);
const authService: IAuthService = new AuthService(userRepository);

export { userService, authService };
