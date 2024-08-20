import { Request, Response } from "express";
import { IUserService } from "../../../../../application/ports/in/IUserService";
import { IAuthService } from "../../../../../application/ports/in/IAuthService";

export class UserController {
  constructor(
    private userService: IUserService,
    private authService: IAuthService
  ) {}

  async getAllUsers(req: Request, res: Response) {
    const token = req.headers["x-token"];
    if (!token || !(await this.authService.verifyToken(token as string))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const users = await this.userService.getUsers();
    res.json(users);
  }

  async getUserById(req: Request, res: Response) {
    const token = req.headers["x-token"];
    if (!token || !(await this.authService.verifyToken(token as string))) {
      return res.status(401).json({ error: "Unauthorized" });
    }

    const user = await this.userService.getUserById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
  }

  async createUser(req: Request, res: Response) {
    try {
      const user = await this.userService.createUser(req.body);
      res.status(201).json(user);
    } catch (error) {
      if (error instanceof Error) {
        res.status(400).json({ error: error.message });
      }
    }
  }
}
