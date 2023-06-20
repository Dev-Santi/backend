import { Router } from "express";
import ProductsService from "../service/dao/products.service.js";
import passport from "passport";
import jwt from "jsonwebtoken";

const productService = new ProductsService();
const router = Router();

//Middleware para que solo pueda acceder un administrador
const rolMiddleware = (req, res, next) => {
  const cookieValue = req.cookies.jwtCookieToken;
  const decoded = jwt.decode(cookieValue);
  if (decoded.user.rol === "admin") next();
  else
    res
      .status(401)
      .send("No tiene los permisos necesarios para acceder a este sitio");
};

//Logins
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    return err;
  }
});

//Register
router.get("/register", async (req, res) => {
  try {
    res.render("register");
  } catch (err) {
    return err;
  }
});

//Products
router.get(
  "/products",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    try {
      let products = await productService.get(
        req.query.limit,
        req.query.page,
        req.query.category,
        req.query.minStock,
        req.query.sort
      );
      //Get the JWT info
      const cookieValue = req.cookies.jwtCookieToken;
      const decoded = jwt.decode(cookieValue);
      //Is an admin or an user?
      let isUser = decoded.user.rol === "user" ? true : false;
      products.userRol = isUser;
      products.userName = decoded.user.name;
      products.userCart = decoded.user.cart;
      //Render
      res.render("products", products);
    } catch (err) {
      return err;
    }
  }
);

//Product manager
router.get(
  "/product-manager",
  [passport.authenticate("jwt", { session: false }), rolMiddleware],
  async (req, res) => {
    try {
      res.render("productManager");
    } catch (err) {
      return err;
    }
  }
);

//chat
router.get(
  "/chat",
  passport.authenticate("jwt", {
    session: false,
  }),
  async (req, res) => {
    //Get the JWT info
    const cookieValue = req.cookies.jwtCookieToken;
    const decoded = jwt.decode(cookieValue);
    let access = true;
    if (decoded.user.rol === "admin") access = false;
    const user = {
      name: decoded.user.name,
      rol: decoded.user.rol,
      access: access,
    };
    res.render("chat", user);
  }
);

export default router;
