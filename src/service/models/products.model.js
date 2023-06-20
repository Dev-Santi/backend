import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const productsCollection = "products";

//Schemas
const stringTypeSchemaUniqueRequired = {
  type: String,
  unique: true,
  required: true,
};

const numberTypeSchemaNonUniqueRequired = {
  type: Number,
  required: true,
};

const productsSchema = new mongoose.Schema({
  title: stringTypeSchemaUniqueRequired,
  description: stringTypeSchemaUniqueRequired,
  code: stringTypeSchemaUniqueRequired,
  price: numberTypeSchemaNonUniqueRequired,
  status: Boolean,
  stock: numberTypeSchemaNonUniqueRequired,
  category: {
    type: String,
    lowercase: true,
    enum: ["electric", "beauty", "personal care", "pets"],
    required: true,
  },
  thumbnails: {
    type: [{ type: String, minlength: 15 }],
  },
});

productsSchema.plugin(mongooseAggregatePaginate);
productsSchema.plugin(mongoosePaginate);
export const productsModel = mongoose.model(productsCollection, productsSchema);
