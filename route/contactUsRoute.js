const contactUsController = require("../controller/contactUsController");
const { getByUserId } = require("../middleware/userMiddleware");
const express = require("express");
const router = express.Router();

//==================  ContactUs route  =====================//

router.post(
  "/createContactUs/:userId",
  getByUserId,
  contactUsController.createContactUs
);
router.get(
  "/getByContactUsId/:contactUsId",
  contactUsController.getByContactUsId
);
router.get("/getByAllContactUs", contactUsController.getByAllContactUs);
router.put(
  "/updateContactUs/:contactUsId",
  contactUsController.updateContactUs
);

module.exports = router;
