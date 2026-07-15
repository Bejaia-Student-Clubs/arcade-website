import express, {Request, Response} from "express";
import { register, login, logout, refresh, me } from "../controllers/authController.js"; 
import { validateRequest } from "../middleware/validateRequest.js"; 
import { registerSchema } from "../validators/authValidators.js";

//interface AuthenticatedRequest extends Request {
//    user?: any;
//}

const router = express.Router();

router.post("/register",validateRequest(registerSchema), register);
router.post("/login" , login);
router.post("/logout" , logout);
router.post("/refresh", refresh);
router.get("/me", me);


export default router;