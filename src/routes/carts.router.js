import { Router } from "express";
import {
  addProduct,
  createCart,
  getCartProducts,
  removeAll,
  removeProduct,
  updateCart,
  updateQuanty,
  purchase,
} from "../controllers/carts.controller.js";

const router = Router();

//Endpoints
//--Create a cart
router.post("/", createCart);

//--Get cart products
router.get("/:cid", getCartProducts);

//--Add product to a cart
router.post("/:cid/product/:pid", addProduct);

//--Remove product from cart
router.delete("/:cid/product/:pid", removeProduct);

//--Remove all products from cart
router.delete("/:cid", removeAll);

//--Update cart
router.put("/:cid", updateCart);

//--Update quanty
router.put("/:cid/product/:pid", updateQuanty);

//--Purchase
router.post("/:cid/purchase", purchase);

export default router;
