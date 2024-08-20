import { User } from "../../../domain/entities/User";

export interface IAuthService {
  login(
    identifier: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }>;
  logout(token: string): Promise<void>;
  verifyToken(token: string): Promise<boolean>;
}
