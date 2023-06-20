import { faker } from "@faker-js/faker";

const createRandomNumber = (max) => {
  const randomNumber = Math.floor(Math.random() * max + 1);
  return randomNumber;
};

const createThumbnailsForMockingProduct = () => {
  const thumbnails = [];
  for (let i = 0; i < createRandomNumber(3); i++) {
    thumbnails.push(faker.image.urlLoremFlickr({ category: "business" }));
  }
  return thumbnails;
};

const createOneMockingProduct = () => {
  const newProduct = {
    _id: faker.database.mongodbObjectId(),
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    code: faker.string.alphanumeric(10),
    price: faker.commerce.price(),
    status: true,
    stock: createRandomNumber(80),
    category: faker.commerce.department(),
    thumbnails: createThumbnailsForMockingProduct(),
    __v: 0,
  };
  return newProduct;
};

const mockingProducts = [];
for (let i = 0; i < 100; i++) {
  const newMockingProduct = createOneMockingProduct();
  mockingProducts.push(newMockingProduct);
}

const JsonResponse = {
  status: "success",
  payload: [...mockingProducts],
  totalPages: 1,
  prevPage: null,
  nextPage: null,
  page: 1,
  hasPrevPage: false,
  hasNextPage: false,
  prevLink: null,
  nextLink: null,
};

const mockingProductsEndpoint = async (req, res) => {
  try {
    res.json(JsonResponse);
  } catch (err) {
    res.status(500).send({ status: "Error", payload: err });
  }
};

export default mockingProductsEndpoint;
