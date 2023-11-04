const categorymodel = require("../model/categoryModel");

//=====================  Get by categoryId  =====================//

exports.getByCategoryId = async (req, res, next) => {
  try {
    let checks = await categorymodel.findById({ _id: req.params.categoryId });
    if (!checks) {
      return res
        .status(404)
        .json({ success: false, message: "Category not found" });
    }
    req.category = checks;
    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
