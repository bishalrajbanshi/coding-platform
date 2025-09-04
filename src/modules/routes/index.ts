import { Router } from "express";
import userRoutes from "@modules/user/routes/user_routes";
import devRouter from '@modules/dev/routes/dev_routes';
const router = Router()

router.use("/user", userRoutes);
router.use('/dev', devRouter)



export default router