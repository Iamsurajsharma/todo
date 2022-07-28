const userModel = require("../models/user.model");
const { successHandler } = require("../utils/middleware/handlers");
const jwt = require("jsonwebtoken");

class UserController {
  /**
   * @function login
   * @description user login
   */
  async login(req, res, next) {
    try {
      if (!req.body.email && !req.body.password)
        throw new Error("email and password are required");
      const userData = await userModel.findOne({
        email: req.body.email,
        password: req.body.password,
      });
      if (!userData) throw new Error("User not found");
      const token = jwt.sign({ id: userData._id }, "fooBaar");
      return successHandler(200, "Success", { token }, res);
    } catch (error) {
      next(error);
    }
  }
  /**
   *
   * @function signUp
   * @description user signup
   */
  async signUp(req, res, next) {
    try {
      if (!req.body.email && !req.body.password)
        throw new Error("email and password are required");
      await userModel.create(req.body);
      return successHandler(201, "Success", {}, res);
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new UserController();
