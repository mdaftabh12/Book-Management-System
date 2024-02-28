const priceRangeModel = require("../model/priceRangeModel");

//========================  Create price range  ========================//

exports.createPriceRange = async (req, res) => {
  try {
    let { min, max } = req.body;
    if (!min) {
      return res
        .status(400)
        .json({ success: false, message: "Min is required" });
    }
    if (!max) {
      return res
        .status(400)
        .json({ success: false, message: "Max is required" });
    }
    let priceRange = await priceRangeModel.create({
      min: min,
      max: max,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create priceRange", data: priceRange });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by priceRangeId  ========================//

exports.getByPriceRangeId = async (req, res) => {
  try {
    let priceRange = req.priceRange;
    return res.status(200).json({
      success: true,
      message: "Get By priceRangeId",
      data: priceRange,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all price range  ========================//

exports.getAllPriceRange = async (req, res) => {
  try {
    let check = await priceRangeModel.find({ disable: false });
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "priceRange not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all PriceRange", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update price range  ========================//

exports.updatePriceRange = async (req, res) => {
  try {
    let { min, max } = req.body;
    let priceRange = req.priceRange;
    let data = await priceRangeModel.findByIdAndUpdate(
      { _id: priceRange._id },
      {
        $set: {
          min: min,
          max: max,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: false,
      message: "priceRange update successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Disable price range   ========================//

exports.disablePriceRange = async (req, res) => {
  try {
    let priceRange = req.priceRange;
    let data = await priceRangeModel.findByIdAndUpdate(
      { _id: priceRange._id },
      {
        $set: {
          disable: !priceRange.disable,
        },
      },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .json({ success: true, message: "priceRange is Enable" });
    }
    return res
      .status(200)
      .json({ success: true, message: "priceRange is Disable" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
