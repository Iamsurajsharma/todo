const jwt = require("jsonwebtoken");
const userModel = require("../../models/user.model");
module.exports.errorHandler = function (error, req, res, next) {
  const statusCode = error.statusCode ? error.statusCode : 500;
  const message = error.message ? error.message : "Something we wrong";
  res.status(statusCode).json({
    success: false,
    statusCode: statusCode,
    message: message,
  });
};

module.exports.successHandler = function (statusCode, message, data = {}, res) {
  res.status(statusCode).json({
    message: message,
    success: true,
    data: data,
  });
};

module.exports.invalidRoute = function (req, res, next) {
  res.status(404).json({
    sucess: false,
    message: "Invalid Route",
    statusCode: 404,
  });
};

module.exports.routeLogger = function (req, res, next) {
  console.log("******* Request Starts Here *******");
  console.log(`Body ${JSON.stringify(req.body)}`);
  console.log(`Params ${JSON.stringify(req.params)}`);
  console.log(`Query ${JSON.stringify(req.query)}`);
  console.log("******* Request Ends Here *******");
  next();
};

module.exports.verifyUser = function (req, res, next) {
  if (req.headers.authorization) {
    let authMethod = req.headers.authorization.split(" ")[0],
      authToken = req.headers.authorization.split(" ")[1];
    if (authMethod === "Bearer" && authToken) {
      jwt.verify(authToken, "fooBaar", async (error, decoded) => {
        if (error)
          return res
            .status(401)
            .send({ success: false, message: "Invalid Autherization" });
        const userData = await userModel.findOne({ _id: decoded.id });
        if (userData) {
          next();
        } else {
          return res
            .status(401)
            .send({ success: false, message: "Invalid Autherization" });
        }
      });
    } else {
      return res
        .status(401)
        .send({ success: false, message: "Invalid Autherization" });
    }
  } else {
    res.status(401).send({ success: false, message: "Invalid Autherization" });
  }
};
