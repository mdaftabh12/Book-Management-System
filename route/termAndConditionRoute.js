const termAndConditionController = require("../controller/termAndConditionController");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Term and condition route  =====================//

router.post(
  "/createTermAndCondition",
  termAndConditionController.createTermAndCondition
);
router.put(
  "/update/:termAndConditionId",
  termAndConditionController.updateTermAndCondition
);
router.get("/getAll", auth, termAndConditionController.getAllTermAndCondition);
router.get(
  "/getById/:termAndConditionId",
  termAndConditionController.getByIdTermAndCondition
);
router.put(
  "/disable/:termAndConditionId",
  termAndConditionController.termAndConditionDisable
);

module.exports = router;
