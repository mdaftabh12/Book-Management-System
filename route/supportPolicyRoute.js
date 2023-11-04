const supportPolicyController = require("../controller/supportPolicyController");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Support policy route  =====================//

router.post(
  "/createSupportPolicy",
  supportPolicyController.createSupportPolicy
);
router.put(
  "/update/:supportPolicyId",
  supportPolicyController.updateSupportPolicy
);
router.get("/getAll", auth, supportPolicyController.getAllSupportPolicy);
router.get(
  "/getById/:supportPolicyId",
  supportPolicyController.getByIdSupportPolicy
);
router.put(
  "/disable/:supportPolicyId",
  supportPolicyController.supportPolicyDisable
);

module.exports = router;
