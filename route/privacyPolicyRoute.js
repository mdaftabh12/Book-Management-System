const privacyPolicyController = require("../controller/privacyPolicyController");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Privacy policy route  =====================//

router.post(
  "/createPrivacyPolicy",
  privacyPolicyController.createPrivacyPolicy
);
router.put(
  "/update/:privacyPolicyId",
  privacyPolicyController.updatePrivacyPolicy
);
router.get("/getAll", auth, privacyPolicyController.getAllPrivacyPolicy);
router.get(
  "/getById/:privacyPolicyId",
  privacyPolicyController.getByIdPrivacyPolicy
);
router.put(
  "/disable/:privacyPolicyId",
  privacyPolicyController.privacyPolicyDisable
);

module.exports = router;
