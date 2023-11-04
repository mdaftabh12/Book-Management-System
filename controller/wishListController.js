const wishListModel = require("../model/wishListModel");
const moment = require("moment")

//=====================  Create wishlist  =====================//

exports.createWishList = async (req, res) => {
  try {
    let { userId, productId } = req.params;
    // let user = req.user;
    // let product = req.product;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }
    let data = await wishListModel.create({
      userId: userId,
      productId: productId,
    });
    return res
      .status(201)
      .json({ success: true, message: "Wish list create", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//==============  Get all wishlist by userId  =================//

exports.getAllWishListByUserId = async (req, res) => {
  try {
    let check = await wishListModel.find({ userId: req.params.userId });
    if (!check.length) {
      return res
        .status(404)
        .json({ success: true, message: "Not found any wish list" });
    }
    return res.status(200).json({
      success: true,
      message: "Get all wish list by user",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  Get by wishlistId  =====================//

exports.getByWishListId = async (req, res) => {
  try {
    let check = await wishListModel.findById({ _id: req.params.wishListId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Wish list not found" });
    }
    let od = check.createdAt.getDate(); 
    console.log(od)
    let d = moment()
    let curr = d.format("YYYY M D H m s");
    console.log(curr);
    return res
      .status(200)
      .json({ success: true, message: "Get wish list", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=================  Delete one by wishlistId  =================//

exports.deleteOneByWishListId = async (req, res) => {
  try {
    let check = await wishListModel.findByIdAndDelete({ _id: req.params.wishListId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Wish list not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Delete wish list", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
