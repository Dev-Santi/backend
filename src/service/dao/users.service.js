import usersModel from "../models/users.model.js";

export default class UsersService {
  constructor() {}

  create = async (body) => {
    let result = await usersModel.create(body);
    if (result) return result._id;
  };

  findByEmail = async (body) => {
    let result = await usersModel.findOne(body);
    return result;
  };

  findById = async (id) => {
    let result = await usersModel.findById(id);
    if (result) return result.products;
  };
}
