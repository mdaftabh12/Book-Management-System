const couponController = require("../controller/couponController");
const { upload } = require("../middleware/multerMiddleware");
const { getByCouponId } = require("../middleware/couponMiddleware");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Coupon route  =====================//

router.post(
  "/createCoupon",
  upload.single("couponImage"),
  couponController.createCoupon
);
router.get("/getAllCoupon", auth, couponController.getAllCoupon);
router.get(
  "/getByCouponId/:couponId",
  getByCouponId,
  couponController.getByCouponId
);

router.put(
  "/updateCoupon/:couponId",
  upload.single("couponImage"),
  getByCouponId,
  couponController.updateCoupon
);

router.put(
  "/couponDisable/:couponId",
  getByCouponId,
  couponController.couponDisable
);

module.exports = router;
