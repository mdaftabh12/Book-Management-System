const addressController = require("../controller/addressController");
const express = require("express");
const router = express.Router();
const { getByAddressId } = require("../middleware/addressMiddleware");
// const { getByUserId } = require("../middleware/userMiddleware");
const { auth } = require("../middleware/authMidd");

//==================  Address route  =====================//

router.post("/createAddress", addressController.createAddress);
router.get("/getAllAddress", auth, addressController.getAllAddress);
router.get(
  "/getByAddressId/:addressId",
  getByAddressId,
  addressController.getByAddressId
);
router.put(
  "/updateAddress/:addressId",
  getByAddressId,
  addressController.updateAddress
);
router.put(
  "/addressDisable/:addressId",
  getByAddressId,
  addressController.addressDisable
);

module.exports = router;
