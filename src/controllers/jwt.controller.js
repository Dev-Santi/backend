import UsersService from "../service/dao/users.service.js";
import CartsService from "../service/dao/carts.service.js";
import { createHash, isValidPassword, generateJWToken } from "../utils.js";
/* Error handling */
import CustomError from "../service/errors/CustomError.js";
import EErrors from "../service/errors/enums.js";
import {
  generateLoginUserErrorInfo,
  generateUserErrorInfo,
} from "../service/errors/messages/creation-error.messages.js";

const usersService = new UsersService();
const cartsService = new CartsService();

const logUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await usersService.findByEmail({ email: email });
    if (!user) {
      //Custom Error
      CustomError.createError({
        name: "User Login Error",
        cause: generateLoginUserErrorInfo(email),
        message: "Error al iniciar sesion",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }

    if (!isValidPassword(user, password)) {
      //Custom Error
      CustomError.createError({
        name: "User Login Error",
        cause: generateLoginUserErrorInfo(email),
        message: "Error al iniciar sesion",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const tokenUser = {
      name: `${user.first_name} ${user.last_name}`,
      email: user.email,
      age: user.age,
      rol: user.rol,
    };
    if (user.rol !== "admin") {
      tokenUser.cart = user.cart.id;
    }
    createToken(tokenUser);
    res.status(200).send({ message: "Login successful!" });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error });
  }

  //Functions
  function createToken(tokenUser) {
    const access_token = generateJWToken(tokenUser);
    res.cookie("jwtCookieToken", access_token, {
      maxAge: 120000,
      httpOnly: true,
      // httpOnly: false // expone la cookie
    });
  }
};

const regUser = async (req, res) => {
  try {
    const { first_name, last_name, email, age, rol, password } = req.body;

    const exists = await usersService.findByEmail({ email: email });
    if (exists) {
      //Custom Error
      CustomError.createError({
        name: "User register error",
        cause: generateUserErrorInfo({ first_name, last_name, email, age }),
        message: "Error al registrar al usuario",
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    const user = {
      first_name,
      last_name,
      email,
      rol,
      age,
      password: createHash(password),
    };
    //Si es un usuario, le asignamos un carrito
    if (user.rol !== "admin") user.cart = await cartsService.create();
    const result = await usersService.create(user);
    res.status(201).send({
      status: "success",
      message: "Usuario creado con éxito con ID: " + result.id,
    });
  } catch (error) {
    return res.status(500).send({ status: "error", error: error });
  }
};

export { logUser, regUser };
