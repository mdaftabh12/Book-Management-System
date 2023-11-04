const languageModel = require("../model/languageModel");

//===================== Get by languageId  =====================//

exports.getByLanguageId = async (req, res, next) => {
  try {
    let checks = await languageModel.findById({ _id: req.params.languageId });
    if (!checks) {
      return res
        .status(404)
        .json({ success: false, message: "Language not found" });
    } 
    req.language = checks;
    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
