const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const { upload } = require("../middleware/multerMiddleware");
const { getByUserId } = require("../middleware/userMiddleware");
const { auth } = require("../middleware/authMidd");

//==================  User route  =====================//

router.post("/userRegister", userController.userRegister);
router.post("/userLogin", userController.userLogin);
router.post("/otpVerify", userController.otpVerify);
router.get(
  "/getByUserId/:userId",
  getByUserId,
  auth,
  userController.getByUserId
);
router.get("/getAllUsers", auth, userController.getAllUsers);
router.put(
  "/updateUser/:userId",
  upload.single("picture"),
  getByUserId,
  auth,
  userController.updateUser
);

router.post("/adminLogin", userController.adminLogin);
router.put("/userDisable/:userId", getByUserId, userController.userDisable);

module.exports = router;
