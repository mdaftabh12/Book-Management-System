const returnPolicyController = require("../controller/returnPolicyController");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Return policy route  =====================//

router.post("/createReturnPolicy", returnPolicyController.createReturnPolicy);
router.put(
  "/update/:returnPolicyId",
  returnPolicyController.updateReturnPolicy
);
router.get("/getAll", auth, returnPolicyController.getAllReturnPolicy);
router.get(
  "/getById/:returnPolicyId",
  returnPolicyController.getByIdReturnPolicy
);
router.put(
  "/disable/:returnPolicyId",
  returnPolicyController.returnPolicyDisable
);

module.exports = router;
