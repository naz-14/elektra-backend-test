import { IAuthService } from "../ports/in/IAuthService";
import { IUserRepository } from "../ports/out/IUserRepository";
import jwt from "jsonwebtoken";
import { User } from "../../domain/entities/User";

const SECRET_KEY = process.env.SECRET_KEY || "secret";

export class AuthService implements IAuthService {
  constructor(private userRepository: IUserRepository) {}

  async login(
    identifier: string,
    password: string
  ): Promise<{ user: Omit<User, "password">; token: string }> {
    let user = await this.userRepository.findByUserName(identifier);
    if (!user) {
      user = await this.userRepository.findByPhone(identifier);
    }

    if (!user || user.password !== password) {
      throw new Error("Invalid credentials");
    }

    const token = jwt.sign(
      { id: user.id, userName: user.userName },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    await this.userRepository.saveToken(user.id!, token);

    const { password: _, ...userWithoutPassword } = user;
    return { user: userWithoutPassword, token };
  }

  async logout(token: string): Promise<void> {
    const decoded: any = jwt.verify(token, SECRET_KEY);
    await this.userRepository.saveToken(decoded.id, "");
  }

  async verifyToken(token: string): Promise<boolean> {
    try {
      const decoded: any = jwt.verify(token, SECRET_KEY);

      const user = await this.userRepository.findById(decoded.id);
      if (!user) {
        return false;
      }
      if (user.token !== token) {
        return false;
      }
      return true;
    } catch {
      return false;
    }
  }
}
