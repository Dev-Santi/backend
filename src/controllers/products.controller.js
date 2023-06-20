import ProductService from "../service/dao/products.service.js";
import CustomError from "../service/errors/CustomError.js";
import {
  generateProductNotFoundErrorInfo,
  generateUpdateProductErrorInfo,
} from "../service/errors/messages/creation-error.messages.js";
import EErrors from "../service/errors/enums.js";

const productsService = new ProductService();

const getProducts = async (req, res) => {
  try {
    res
      .send(
        await productsService.get(
          req.query.limit,
          req.query.page,
          req.query.category,
          req.query.minStock,
          req.query.sort
        )
      )
      .status(200);
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

//Get product By id
const getById = async (id) => {
  try {
    const result = await productsService.getById(req.params.ID);
    return result;
  } catch (error) {
    return null;
  }
};

const getProductsById = async (req, res) => {
  try {
    const result = await getById(req.params.ID);
    if (!result) {
      //Custom Error
      CustomError.createError({
        name: "Get products by ID error",
        cause: generateProductNotFoundErrorInfo(req.params.ID),
        message: "Error al intentar obtener el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }
    res.send(result).status(200);
  } catch (error) {
    res.status(500).send({ status: "Error", error: error });
  }
};

//Addproduct
const addProduct = async (req, res) => {
  try {
    const newProduct = req.body;
    res.status(201).send(await productsService.save(newProduct));
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

//Update Product
const update = async (productID, productUpdate) => {
  try {
    const update = await productsService.update(productID, productUpdate);
    return update;
  } catch (error) {
    return null;
  }
};

const updateProduct = async (req, res) => {
  try {
    const productID = req.params.pid;
    const productUpdate = req.body;
    const isUpdated = await update(productID, productUpdate);
    if (!isUpdated) {
      //Custom Error
      CustomError.createError({
        name: "Update product by ID error",
        cause: generateUpdateProductErrorInfo(req.params.ID),
        message: "Error al intentar actualizar el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }
    res.send({ msg: "The product has been updated!" });
  } catch (error) {
    res.status(500).send({ status: "Error", error: error });
  }
};

//Delete a product
const del = async () => {
  try {
    const Deleted = await productsService.delete(req.params.pid);
    return Deleted;
  } catch (error) {
    return null;
  }
};

const deleteProduct = async (req, res) => {
  try {
    const isDeleted = await del(req.params.pid);
    if (!isDeleted) {
      //Custom Error
      CustomError.createError({
        name: "Delete product error",
        cause: generateProductNotFoundErrorInfo(req.params.ID),
        message: "Error al intentar obtener el producto",
        code: EErrors.DATABASE_ERROR,
      });
    }
    res.send({ msg: "The product has been deleted" });
  } catch (error) {
    res.status(500).send({ error: error });
  }
};

export {
  getProducts,
  getProductsById,
  addProduct,
  updateProduct,
  deleteProduct,
};
