const cartController = require("../controller/cartController");
const { couponApply } = require("../middleware/couponApplyMiddleware");
const express = require("express");
const router = express.Router();

//==================  Cart route  =====================//

router.post("/addToCart", cartController.addToCart);
router.post("/addQuantity", cartController.addQuantity);
router.post("/removeQuantity", cartController.removeQuantity);
router.post("/removeProductFromCart", cartController.removeProductFromCart);
router.get("/getByUserId/:userId", couponApply, cartController.getByUserId);
router.get("/getByCartId/:cartId", cartController.getByCartId);
router.delete("/cartDeleteByUserId/:userId", cartController.cartDeleteByUserId);

module.exports = router;
