const orderModel = require("../model/orderModel");

//====================  Get addressId  ====================//
 
exports.getByOrderId = async (req, res, next) => {
  try { 
    let checks = await orderModel.findById({ _id: req.params.orderId });
    if (!checks) {
      return res 
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    req.order = checks;
    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
