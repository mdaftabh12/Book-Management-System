const productController = require("../controller/productController");
const { upload } = require("../middleware/multerMiddleware");
const express = require("express");
const router = express.Router();
const multer = require("multer");
const { getByProductId } = require("../middleware/productMiddleware");
const { getByUserId } = require("../middleware/userMiddleware");
const { auth } = require("../middleware/authMidd");
const { dateWiseFilter } = require("../middleware/dateWiseFilterMiddleware");

//==================  Product route  =====================//

router.post(
  "/createProduct",
  upload.fields([{ name: "image" }, { name: "pictures" }]),
  productController.createProduct
);

router.get("/getAllProduct", auth, productController.getAllProduct);
router.get(
  "/getByProductId/:productId/:_id",
  getByProductId,
  getByUserId,
  auth,
  productController.getByProductId
);
router.put(
  "/updateProduct/:productId/:_id",
  upload.fields([{ name: "image" }, { name: "pictures" }]),
  getByProductId,
  getByUserId,
  auth,
  productController.updateProduct
);
router.put(
  "/disable/:productId",
  getByProductId,
  productController.productDisable
);
router.post("/productFilter", dateWiseFilter, productController.productFilter);

module.exports = router;
