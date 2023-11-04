const priceRangeModel = require("../model/priceRangeModel");

//====================  Get by priceRangeId  ====================//

exports.getByPriceRangeId = async (req, res, next) => {
  try {
    let check = await priceRangeModel.findById({
      _id: req.params.priceRangeId,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "priceRange Not found" });
    }
    req.priceRange = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
