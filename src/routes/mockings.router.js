import { Router } from "express";
import MockingProductsEndpoint from "../controllers/mockings.controller.js";

const router = Router();

router.get("/", MockingProductsEndpoint);

export default router;
