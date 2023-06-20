import { productsModel } from "../models/products.model.js";

export default class ProductsService {
  constructor() {}

  get = async (_limit, _page, _category, _minStock, _sort) => {
    try {
      //Get querys
      let limit = validateLimit(_limit);
      let page = validatePage(_page);
      let categoryFilter = validateCategory(_category);
      let stockFilter = validateStock(_minStock);
      let sort = validateSort(_sort);

      //Links (1 for next page, -1 for prev page)
      const pageLink = (number) => {
        const link = `http://localhost:9091/api/views/products?page=${
          page + number
        }&limit=${limit}&category=${categoryFilter.content}&sort=${
          sort.content
        }&stock=${stockFilter.content}`;
        return link;
      };

      //Stages
      const categoryStage = {
        $match: { category: categoryFilter.content },
      };
      const stockStage = {
        //Shows all products with the entered stock or higher
        $match: { stock: { $gt: stockFilter.content - 1 } },
      };
      const sortStage = {
        $sort: { price: sort.value },
      };

      //Conditional pipeline
      const pipeline = [];
      categoryFilter.isValid && pipeline.push(categoryStage);
      stockFilter.isValid && pipeline.push(stockStage);
      sort.isValid && pipeline.push(sortStage);

      //Result
      let result;
      if (pipeline.length === 0) {
        result = await productsModel.paginate(
          {},
          { limit: limit, page: page, lean: true }
        );
      } else {
        const aggregate = productsModel.aggregate([...pipeline]);
        if (aggregate) {
          result = await productsModel.aggregatePaginate(aggregate, {
            limit: limit,
            page: page,
            lean: true,
          });
        }
      }
      if (result.docs.length === 0) {
        result.status = "No products found";
      } else result.status = "success";

      if (result.status === "success") {
        result.hasPrevPage
          ? (result.prevLink = pageLink(-1))
          : (result.prevLink = null);
        result.hasNextPage
          ? (result.nextLink = pageLink(1))
          : (result.nextLink = null);
      }

      //response format
      const response = {
        status: result.status,
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.prevLink,
        nextLink: result.nextLink,
      };

      //response
      return response;
    } catch (error) {
      return { msg: error };
    }
  };

  getById = async (id) => {
    let result = await productsModel.findById(id);
    return result;
  };

  save = async (product) => {
    let result = await productsModel.create(product);
    return result;
  };

  update = async (id, object) => {
    let result = await productsModel.findByIdAndUpdate(id, object);
    return result;
  };

  delete = async (id) => {
    let result = await productsModel.findByIdAndDelete(id);
    return result;
  };
}

//Validate functions
function validateLimit(limit) {
  if (!limit || limit < 0) return 10;
  else return parseInt(limit);
}

function validatePage(page) {
  if (!page || page < 1) return 1;
  else return parseInt(page);
}

function validateCategory(query) {
  //--get all categories from the products schema
  const categories = productsModel.schema.path("category").enumValues;
  const category = { content: query, isValid: false };

  if (categories.includes(category.content)) {
    category.isValid = true;
  }
  return category;
}

function validateStock(query) {
  const stock = { content: parseInt(query), isValid: false };

  if (Number.isInteger(stock.content) && stock.content >= 0) {
    stock.isValid = true;
  } else stock.content = undefined;
  return stock;
}

function validateSort(sort) {
  const sortObj = { content: sort, value: undefined, isValid: false };

  if (sortObj.content === "asc" || sortObj.content === "desc") {
    sortObj.isValid = true;
    sortObj.content === "asc" ? (sortObj.value = 1) : (sortObj.value = -1);
  }
  return sortObj;
}
