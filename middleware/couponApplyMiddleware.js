const cartModel = require("../model/cartModel");
const couponModel = require("../model/couponModel");

//=====================  Coupon apply  =====================//

exports.couponApply = async (req, res, next) => {
  try {
    let userId = req.params;
    let check = await cartModel
      .find({ userId: req.params.userId })
      .populate("productId");
    if (!check.length) {
      return res.status(404).json({ success: false, message: "Not Found" });
    }
    let coupon = req.query.coupon;
    let checkCoupon = await couponModel.findOne({ couponCode: coupon });

    let netAmount = 0;
    let price = 0;
    let discount = 0;
    let checks = false;
    for (let i = 0; i < check.length; i++) {
      netAmount += check[i].price;
      check[i]._doc.discount = 0;
      if (checkCoupon) {
        checks = true;
        if (checkCoupon.category.includes(check[i].productId.categoryId)) {
          price += check[i].price;
          discount = price * (checkCoupon.discountInPercent / 100);
          check[i]._doc.discount =
            check[i].price * (checkCoupon.discountInPercent / 100);
        }
      }
    }
    let payableAmount = Math.ceil(netAmount);
    let tax = (payableAmount / 100) * 18;
    let obj = {
      netAmount: netAmount,
      payableAmount: payableAmount + Math.ceil(tax),
      Tax: 18,
      taxAmount: Math.ceil(tax),
    };
    if (checks && checkCoupon.disable == false) {
      if (checkCoupon.minOrderValue <= obj.payableAmount) {
        if (checkCoupon.maxDiscount <= discount) {
          discount = checkCoupon.maxDiscount;
        }
      }
    }
    obj.discount = discount;
    obj.payableAmount = payableAmount + Math.ceil(tax) - discount;
    req.coupon = check;
    req.bill = obj;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
