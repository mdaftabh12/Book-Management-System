const wishListModel = require("../model/wishListModel");
const moment = require("moment");

//=====================  Create wishlist  =====================//

exports.createWishList = async (req, res) => {
  try {
    let { userId, productId } = req.params;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid userId." });
    }
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide a valid productId." });
    }
    let wishListItem = await wishListModel.create({
      userId: userId,
      productId: productId,
    });
    return res.status(201).json({
      success: true,
      message: "Wish list item created successfully.",
      data: wishListItem,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//==============  Get all wishlist by userId  =================//

exports.getAllWishListByUserId = async (req, res) => {
  try {
    let wishListItems = await wishListModel.find({ userId: req.params.userId });
    if (!wishListItems.length) {
      return res.status(404).json({
        success: true,
        message: "No wish list items found for the user.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Retrieved all wish list items for the user successfully.",
      data: wishListItems,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  Get by wishlistId  =====================//

exports.getByWishListId = async (req, res) => {
  try {
    let wishListItem = await wishListModel.findById({
      _id: req.params.wishListId,
    });
    if (!wishListItem) {
      return res
        .status(404)
        .json({ success: false, message: "Wish list item not found." });
    }
    let od = wishListItem.createdAt.getDate();
    let d = moment();
    let curr = d.format("YYYY M D H m s");
    return res.status(200).json({
      success: true,
      message: "Retrieved wish list item successfully.",
      data: wishListItem,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=================  Delete one by wishlistId  =================//

exports.deleteOneByWishListId = async (req, res) => {
  try {
    let deletedWishListItem = await wishListModel.findByIdAndDelete({
      _id: req.params.wishListId,
    });

    if (!deletedWishListItem) {
      return res
        .status(404)
        .json({ success: false, message: "Wish list item not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Wish list item deleted successfully.",
      data: deletedWishListItem,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
