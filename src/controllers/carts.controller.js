import CartsService from "../service/dao/carts.service.js";
import TicketsService from "../service/dao/tickets.service.js";

const cartsService = new CartsService();
const ticketsService = new TicketsService();

const createCart = async (req, res) => {
  try {
    res.send(await cartsService.create()).status(200);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const getCartProducts = async (req, res) => {
  try {
    const result = await cartsService.getById(req.params.cid);
    if (result) {
      res.send(result).status(200);
    } else res.send({ msg: "Cart not found" }).status(400);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const addProduct = async (req, res) => {
  try {
    const result = await cartsService.addProduct(
      req.params.cid,
      req.params.pid
    );
    if (result) res.send({ msg: "The product has been added!" }).status(200);
    else res.send({ msg: "Invalid cartID/productID" }).status(400);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const removeProduct = async (req, res) => {
  try {
    const deleted = await cartsService.deleteProduct(
      req.params.cid,
      req.params.pid
    );
    if (deleted) res.send(deleted);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const removeAll = async (req, res) => {
  try {
    const deleted = await cartsService.deleteAll(req.params.cid);
    if (deleted) res.send(deleted);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const updateCart = async (req, res) => {
  try {
    const query = req.body;
    const updated = await cartsService.updateCart(req.params.cid, query);
    res.send(updated);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const updateQuanty = async (req, res) => {
  try {
    const query = req.body;
    const updQuanty = await cartsService.updateQuanty(
      req.params.cid,
      req.params.pid,
      query
    );
    res.send(updQuanty);
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

const purchase = async (req, res) => {
  try {
    const cartResponse = await cartsService.purchase(req.params.cid);
    const ticketResponse = await ticketsService.create(
      cartResponse.amount,
      cartResponse.userEmail
    );
    res.send({
      ticketResponse,
      noCompleted: cartResponse.noCompleted,
    });
  } catch (error) {
    res.send({ error: error }).status(500);
  }
};

export {
  createCart,
  getCartProducts,
  addProduct,
  removeProduct,
  removeAll,
  updateCart,
  updateQuanty,
  purchase,
};
