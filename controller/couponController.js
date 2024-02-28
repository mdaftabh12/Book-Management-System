const couponModel = require("../model/couponModel");

//========================  Create coupon  ========================//

exports.createCoupon = async (req, res) => {
  try {
    let {
      name,
      category,
      couponCode,
      minOrderValue,
      maxDiscount,
      discountInPercent,
    } = req.body;
    let couponImage = req.file ? req.file.path : null;
    let check = await couponModel.findOne({ couponCode: req.body.couponCode });
    if (check) {
      return res
        .status(400)
        .json({ success: false, message: "Already exist coupon" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!category) {
      return res
        .status(400)
        .json({ success: false, message: "category is required" });
    }
    if (!couponCode) {
      return res
        .status(400)
        .json({ success: false, message: "couponCode is required" });
    }
    if (!minOrderValue) {
      return res
        .status(400)
        .json({ success: false, message: "minOrderValue is required" });
    }
    if (!maxDiscount) {
      return res
        .status(400)
        .json({ success: false, message: "maxDiscount is required" });
    }
    if (!discountInPercent) {
      return res
        .status(400)
        .json({ success: false, message: "discountInPercent is required" });
    }
    if (!couponImage) {
      return res
        .status(400)
        .json({ success: false, message: "couponImage is required" });
    }
    let data = await couponModel.create({
      name: name,
      category: category,
      couponCode: couponCode,
      minOrderValue: minOrderValue,
      maxDiscount: maxDiscount,
      discountInPercent: discountInPercent,
      couponImage: couponImage,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create Coupon", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all coupon  ========================//

exports.getAllCoupon = async (req, res) => {
  try {
    let check = await couponModel.find();
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "Coupon Not found" });
    }
    if (req.query.adminId) {
      let check = await couponModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all coupon", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by couponId  ========================//

exports.getByCouponId = async (req, res) => {
  try {
    let coupon = req.coupon;
    return res
      .status(200)
      .json({ success: true, message: "Get by couponId", data: coupon });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update coupon  ========================//

exports.updateCoupon = async (req, res) => {
  try {
    let {
      name,
      category,
      couponCode,
      minOrderValue,
      maxDiscount,
      discountInPercent,
    } = req.body;
    let couponImage = req.file ? req.file.path : null;
    let coupon = req.coupon;
    let data = await couponModel.findByIdAndUpdate(
      { _id: req.params.couponId },
      {
        $set: {
          name: name,
          category: category,
          couponCode: couponCode,
          minOrderValue: minOrderValue,
          maxDiscount: maxDiscount,
          discountInPercent: discountInPercent,
          couponImage: couponImage,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Coupon update successful", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Coupon disable  ========================//

exports.couponDisable = async (req, res) => {
  try {
    let coupon = req.coupon;
    let data = await couponModel.findByIdAndUpdate(
      { _id: req.params.couponId },
      {
        $set: {
          disable: !coupon.disable,
        },
      },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .json({ success: true, message: "Coupon is Enable" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Coupon is Disable" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
