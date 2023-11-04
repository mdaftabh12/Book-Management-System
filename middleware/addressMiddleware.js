const addressModel = require("../model/addressModel");

//=====================  Get by addressId  =====================//
 
exports.getByAddressId = async (req, res, next) => {
  try { 
    let checks = await addressModel.findById({ _id: req.params.addressId });
    if (!checks) {
      return res 
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    req.address = checks;
    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
