import { Request, Response } from "express";
import { IAuthService } from "../../../../../application/ports/in/IAuthService";

export class AuthController {
  constructor(private authService: IAuthService) {}

  async login(req: Request, res: Response) {
    try {
      const { identifier, password } = req.body;
      const { user, token } = await this.authService.login(
        identifier,
        password
      );
      res.json({ user, token });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }

  async logout(req: Request, res: Response) {
    try {
      const token = req.headers["x-token"];
      await this.authService.logout(token as string);
      res.status(200).json({ message: "Logout successful" });
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}
