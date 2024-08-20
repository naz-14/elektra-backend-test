import { Router } from "express";
import UserRotes from "./userRoutes";
import AuthRoutes from "./authRoutes";

const router = Router();
router.use("/auth", AuthRoutes);
router.use("/users", UserRotes);

export default router;
