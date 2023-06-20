import { cartsModel } from "../models/carts.model.js";
import { productsModel } from "../models/products.model.js";
import usersModel from "../models/users.model.js";

export default class CartsService {
  constructor() {}

  create = async () => {
    let result = await cartsModel.create({});
    return result._id;
  };

  getById = async (id) => {
    let result = await cartsModel.findById(id).lean();
    if (result) return result.products;
    else return result;
  };

  addProduct = async (cartId, productId) => {
    const cart = await cartsModel.findById(cartId);
    const product = await productsModel.findById(productId);
    //The cart and the product exists?
    if (cart && product) {
      //Is the product in the cart?
      let itemIndex = cart.products.findIndex(
        (e) => e.product._id == productId
      );
      if (itemIndex !== -1) {
        //The product is already in the cart
        cart.products[itemIndex].quanty++;
      }
      //If it's not...
      else {
        cart.products.push({
          product: productId,
          quanty: 1,
        });
      }
      //Update changes
      const result = await cartsModel.findByIdAndUpdate(cartId, cart);
      return result;
    }
  };

  deleteProduct = async (cartId, productId) => {
    const cart = await cartsModel.findById(cartId);
    const productIndex = cart.products.findIndex(
      (e) => e.product._id == productId
    );
    if (productIndex != -1) {
      cart.products.splice(productIndex, 1);
      //Update changes
      const result = await cartsModel.findByIdAndUpdate(cartId, cart);
      return result;
    } else return { msg: "Invalid cartID/productID" };
  };

  deleteAll = async (cartId) => {
    let cart = await cartsModel.findById(cartId);
    cart.products = [];
    //Update changes
    const result = await cartsModel.findByIdAndUpdate(cartId, cart);
    return result;
  };

  updateCart = async (cartId, query) => {
    const cart = await cartsModel.findById(cartId);
    cart.products = query;
    //Update changes
    const result = await cartsModel.findByIdAndUpdate(cartId, cart);
    return result;
  };

  updateQuanty = async (cartId, productId, quanty) => {
    const newQuanty = quanty.quanty;
    if (newQuanty) {
      const cart = await cartsModel.findById(cartId);
      const productIndex = cart.products.findIndex(
        (e) => e.product._id == productId
      );

      if (productIndex != -1) {
        cart.products[productIndex].quanty = newQuanty;
        //Update changes
        const result = await cartsModel.findByIdAndUpdate(cartId, cart);
        return result;
      } else return { msg: "invalid cartID/productID" };
    } else return { msg: "undefined quanty" };
  };

  //Purchase
  purchase = async (cartId) => {
    let cart = await cartsModel.findById(cartId);
    let noCompleted = [];
    let amount = 0;
    for (let i = 0; i < cart.products.length; i++) {
      //If there is stock:
      if (cart.products[i].product.stock >= cart.products[i].quanty) {
        let product = await productsModel.findById(cart.products[i].product.id);
        product.stock -= cart.products[i].quanty;
        amount += product.price * cart.products[i].quanty;
        await productsModel.findByIdAndUpdate(product.id, product);
      } else {
        noCompleted.push(cart.products[i]);
      }
    }
    cart.products = noCompleted;
    await cartsModel.findByIdAndUpdate(cartId, cart);
    const user = await usersModel.findOne({ cart: cartId });
    return {
      amount: amount,
      userEmail: user.email,
      noCompleted: cart.products,
    };
  };
}
