import { Router } from "express";
import userRoutes from "@modules/user/routes/user_routes";
const router = Router()

router.use("/user", userRoutes);


export default router