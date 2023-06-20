import mongoose from "mongoose";

const cartsCollection = "carts";

//Schemas
const cartsSchema = new mongoose.Schema({
  products: {
    type: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "products",
          required: true,
        },
        quanty: {
          type: Number,
          required: true,
        },
      },
    ],
  },
});

cartsSchema.pre("findOne", function () {
  this.populate("products.product");
});
export const cartsModel = mongoose.model(cartsCollection, cartsSchema);
