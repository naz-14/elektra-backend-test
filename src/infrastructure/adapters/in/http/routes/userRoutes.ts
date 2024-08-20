import { Router } from "express";
import { UserController } from "../controllers/UserController";
import {
  authService,
  userService,
} from "../../../../config/DependencyInjector";

const router = Router();
const userController = new UserController(userService, authService);

router.get("/all", (req, res) => userController.getAllUsers(req, res));
router.get("/:id", (req, res) => userController.getUserById(req, res));
router.post("/new", (req, res) => userController.createUser(req, res));

export default router;
