const reviewController = require("../controller/reviewController");
const { auth } = require("../middleware/authMidd");
const { getByProductId } = require("../middleware/productMiddleware");
const { getByUserId } = require("../middleware/userMiddleware");

//==================  Review route  =====================//

const expree = require("express");
const router = expree.Router();

router.post("/createReview", reviewController.createReview);
router.get(
  "/getAllReviewByProductId/:productId",
  getByProductId,
  reviewController.getAllReviewByProductId
);
router.get(
  "/getAllReviewByuserId/:userId",
  getByUserId,
  reviewController.getAllReviewByUserId
);
router.put("/updateReview/:reviewId", reviewController.updateReview);
router.get("/getAllReview", auth, reviewController.getAllReview);

module.exports = router;
