import { Router } from "express";
import { runCode } from "../controller/dev_controller";
const router = Router();

router.post('/run', runCode)


export default router;