const wishListController = require("../controller/wishListController");
const { getByUserId } = require("../middleware/userMiddleware");
const { getByProductId } = require("../middleware/productMiddleware");
const express = require("express");
const router = express.Router();

//==================  Wishlist route  =====================//

router.post(
  "/createWishList/:userId/:productId",
  wishListController.createWishList
);
router.get(
  "/getAllWishListByUserId/:userId",
  wishListController.getAllWishListByUserId
);
router.get("/getByWishListId/:wishListId", wishListController.getByWishListId);
router.delete(
  "/deleteOneByWishListId/:wishListId",
  wishListController.deleteOneByWishListId
);

module.exports = router;
