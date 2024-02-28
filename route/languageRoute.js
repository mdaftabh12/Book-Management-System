const languageController = require("../controller/languageController");
const { getByLanguageId } = require("../middleware/languageMiddleware");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Language route  =====================//

router.post("/createLanguage", languageController.createLanguage);
router.get("/getAllLanguage", auth, languageController.getAllLanguage);
router.get(
  "/getByLanguageId/:languageId",
  getByLanguageId,
  languageController.getByLanguageId
);
router.put(
  "/updateLanguage/:languageId",
  getByLanguageId,
  languageController.updateLanguage
);
router.put(
  "/languageDisable/:languageId",
  getByLanguageId,
  languageController.languageDisable
);

module.exports = router;
