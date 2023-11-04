const priceRangeController = require("../controller/priceRangeController");
const { getByPriceRangeId } = require("../middleware/priceRangeMidd");
const express = require("express");
const router = express.Router();

//==================  Price range route  =====================//

router.post("/createPriceRange", priceRangeController.createPriceRange);
router.get(
  "/getByPriceRangeId/:priceRangeId",
  getByPriceRangeId,
  priceRangeController.getByPriceRangeId
);
router.get("/getAllPriceRange", priceRangeController.getAllPriceRange);
router.put(
  "/updatePriceRange/:priceRangeId",
  getByPriceRangeId,
  priceRangeController.updatePriceRange
);
router.put(
  "/disablePriceRange/:priceRangeId",
  getByPriceRangeId,
  priceRangeController.disablePriceRange
);

module.exports = router;
