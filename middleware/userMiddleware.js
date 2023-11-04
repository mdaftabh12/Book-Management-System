const userModel = require("../model/userModel");

//====================  Get userId  ====================//
 
exports.getByUserId = async (req, res, next) => {
  try { 
    let checks = await userModel.findById({ _id: req.params.userId });

    if (!checks) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    } else {
      req.user = checks;
      next();
    } 
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};


