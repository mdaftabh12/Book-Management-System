const cartModel = require("../model/cartModel");
const userMiddeleware = require("../middleware/userMiddleware");
const productMiddleware = require("../middleware/productMiddleware");
const productModel = require("../model/productModel");
const couponModel = require("../model/couponModel");

//======================== Add Cart  ========================//

exports.addToCart = async (req, res) => {
  try {
    let { userId, productId } = req.body;
    let obj = {};
    let check = await productModel.findById({ _id: productId });
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductId is rquired" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is rquired" });
    }
    if (userId) {
      obj.userId = userId;
    }
    if (productId) {
      obj.productId = productId;
    }
    let findCart = await cartModel.findOne(obj);
    if (findCart) {
      return res.status(200).json({
        success: true,
        message: "Please Update Quantity",
        data: findCart,
      });
    }
    let data = await cartModel.create({
      userId: userId,
      productId: productId,
      price: check.price,
    });
    return res
      .status(201)
      .json({ success: true, message: "Add cart", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Add quantity  ========================//

exports.addQuantity = async (req, res) => {
  try {
    let { userId, productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductId is rquired" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is rquired" });
    }
    let check = await cartModel
      .findOne({ userId, productId })
      .populate("productId");
    let price = Number(check.productId.price);
    let data = await cartModel.findOneAndUpdate(
      { userId, productId },
      {
        $set: {
          quantity: Number(check.quantity) + 1,
          price: price * Number(check.quantity + 1),
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Quantity Update", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Remove quantity  ========================//

exports.removeQuantity = async (req, res) => {
  try {
    let { userId, productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductId is rquired" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is rquired" });
    }
    let check = await cartModel
      .findOne({ userId, productId })
      .populate("productId");
    let price = check.productId.price;
    let quantity = check.quantity - 1;
    let data = await cartModel.findOneAndUpdate(
      { userId, productId },
      {
        $set: {
          quantity: quantity,
          price: check.price - price,
        },
      },
      { new: true }
    );
    if (data.quantity == 0) {
      let data = await cartModel.findOneAndDelete({ userId, productId });
      return res
        .status(200)
        .json({ success: true, message: "Cart Remove", data: data });
    }
    return res
      .status(200)
      .json({ success: true, message: "Quantity Remove", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Remove product from cart  ========================//

exports.removeProductFromCart = async (req, res) => {
  try {
    let { userId, productId } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "ProductId is rquired" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is rquired" });
    }
    let data = await cartModel.findOneAndDelete({ userId, productId });
    if (!data) {
      return res
        .status(404)
        .json({ success: false, message: "Not found cart" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Remove Product From Cart", data: data });
  } catch (error) {
    return res.status(500).json({ success: true, message: error.message });
  }
};

//========================  Get by userId  ========================//

exports.getByUserId = async (req, res) => {
  try {
    let bill = req.bill;
    let coupon = req.coupon;
    return res.status(200).json({
      success: true,
      message: "All Cart by User",
      data: coupon,
      BillDetails: bill,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by cartId  ========================//

exports.getByCartId = async (req, res) => {
  try {
    let check = await cartModel.findById({ _id: req.params.cartId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Cart not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get Cart", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Cart delete by userId  ========================//

exports.cartDeleteByUserId = async (req, res) => {
  try {
    let check = await cartModel.deleteMany({ userId: req.params.userId });
    return res
      .status(200)
      .json({ success: true, message: "Cart delete successful", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
