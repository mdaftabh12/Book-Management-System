const userModel = require("../model/userModel");
const jwt = require("jsonwebtoken");

//=====================  JWT token  =====================//

exports.auth = async (req, res, next) => {
  try {
    if (!req.query.adminId) {
      next();
      return;
    }
    let token = req.headers["authorization"];
    if (!token) {
      return res.status(400).send({
        success: false,
        message: "Token is required",
      });
    }
    let decode = await jwt.verify(token, process.env.SECRET_KEY);
    if (!decode) {
      return res.status(400).send({
        success: false,
        message: "Invailid token",
        isAuthorization: false,
      });
    }
    if (decode._id != req.query.adminId) {
      return res.status(400).send({
        success: false,
        message: "Invailid token",
      });
    }

    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
