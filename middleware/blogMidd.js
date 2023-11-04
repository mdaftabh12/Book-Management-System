const blogModel = require("../model/blogModel");

//=====================  Get by blogId  =====================//

exports.getByBlogId = async (req, res, next) => {
  try {
    let check = await blogModel.findById({ _id: req.params.blogId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    req.blogId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};


