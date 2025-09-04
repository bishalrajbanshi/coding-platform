import userController from "@modules/user/controller/user_controller";
import { Router } from "express";
const router = Router()


router.post("/", userController.create);
router.post("/login", userController.login);

export default router