const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");
const { getByCategoryId } = require("../middleware/categoryMiddleware");
const { auth } = require("../middleware/authMidd");

//==================  Category route  =====================//

router.post("/createCategory", categoryController.createCategory);
router.get("/getAllCategory", auth, categoryController.getAllCategory);
router.get(
  "/getByCategoryId/:categoryId",
  getByCategoryId,
  categoryController.getByCategoryId
);
router.put(
  "/updateCategory/:categoryId",
  getByCategoryId,
  categoryController.updateCategory
);
router.put(
  "/categoryDisable/:categoryId",
  getByCategoryId,
  categoryController.categoryDisable
);

module.exports = router;
