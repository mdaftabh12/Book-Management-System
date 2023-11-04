const couponModel = require("../model/couponModel");

//=====================  Get by couponId  =====================//

exports.getByCouponId = async (req, res, next) => {
  try {
    let check = await couponModel.findById({ _id: req.params.couponId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon not found" });
    }
    req.coupon = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
