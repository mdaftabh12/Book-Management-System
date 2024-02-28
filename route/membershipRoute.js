const membershipController = require("../controller/membershipController");
const { getByMembershipId } = require("../middleware/membershipMidd");
const { upload } = require("../middleware/multerMiddleware");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Membership route  =====================//

router.post(
  "/createMembership",
  upload.single("image"),
  membershipController.createMembership
);
router.get("/getAllMembership", auth, membershipController.getAllMembership);
router.get(
  "/getByMembershipId/:membershipId",
  getByMembershipId,
  membershipController.getByMembershipId
);
router.put(
  "/updateMembership/:membershipId",
  getByMembershipId,
  upload.single("image"),
  membershipController.updateMembership
);
router.put(
  "/disableMembership/:membershipId",
  getByMembershipId,
  membershipController.disableMembership
);

module.exports = router;
