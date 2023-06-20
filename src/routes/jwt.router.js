import { Router } from "express";
import { logUser, regUser } from "../controllers/jwt.controller.js";

const router = Router();

router.post("/login", logUser);

router.post("/register", regUser);

export default router;
