const tactimonialController = require("../controller/tactimonialController");
const { upload } = require("../middleware/multerMiddleware");
const { getByTactimonialId } = require("../middleware/tactimonialMidd");
const express = require("express");
const router = express.Router();

//==================  Tactimonial route  =====================//

router.post(
  "/createTactimonial",
  upload.single("image"),
  tactimonialController.createTactimonial
);
router.get(
  "/getByTactimonialId/:tactimonialId",
  getByTactimonialId,
  tactimonialController.getByTactimonialId
);
router.get("/getAllTactimonial", tactimonialController.getAllTactimonial);
router.put(
  "/updateTactimonial/:tactimonialId",
  getByTactimonialId,
  upload.single("image"),
  tactimonialController.updateTactimonial
);
router.put(
  "/disableTactimonial/:tactimonialId",
  getByTactimonialId,
  tactimonialController.disableTactimonial
);

module.exports = router;
