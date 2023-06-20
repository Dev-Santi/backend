import mongoose from "mongoose";
import mongoosePaginate from "mongoose-paginate-v2";

const numberRequired = {
  type: Number,
  required: true,
};

const stringRequired = {
  type: String,
  required: true,
};

const stringRequiredUnique = {
  type: String,
  required: true,
  unique: true,
};

const userCollection = "users";
const userSchema = new mongoose.Schema({
  first_name: stringRequired,
  last_name: stringRequired,
  email: stringRequiredUnique,
  age: numberRequired,
  password: stringRequired,
  cart: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "carts",
  },
  rol: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
});

userSchema.pre("findOne", function () {
  this.populate("cart");
});
userSchema.plugin(mongoosePaginate);
const usersModel = mongoose.model(userCollection, userSchema);
export default usersModel;
