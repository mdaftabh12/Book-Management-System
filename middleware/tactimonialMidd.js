const tactimonialModel = require("../model/tactimonialModel");

//====================  Get by tactimonialId  ====================//

exports.getByTactimonialId = async (req, res, next) => {
  try {
    let check = await tactimonialModel.findById({
      _id: req.params.tactimonialId,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Tactimonial Not found" });
    }
    req.tactimonial = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
