import { Router } from "express";
import { AuthController } from "../controllers/AuthController";
import { authService } from "../../../../config/DependencyInjector";

const router = Router();
const authController = new AuthController(authService);

router.post("/login", (req, res) => authController.login(req, res));
router.post("/logout", (req, res) => authController.logout(req, res));

export default router;
