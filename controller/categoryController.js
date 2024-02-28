const categoryModel = require("../model/categoryModel");

//========================  Create category  ========================//

exports.createCategory = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    let data = await categoryModel.create({
      name: name,
    });
    return res
      .status(201)
      .send({ success: true, message: "Create category", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Get all category  ========================//

exports.getAllCategory = async (req, res) => {
  try {
    let data = await categoryModel.find({ disable: false });
    if (!data) {
      return res
        .status(404)
        .send({ success: false, message: "Not found category" });
    }
    if (req.query.adminId) {
      let check = await categoryModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .send({ success: true, message: "Get All category", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Get By categoryId  ========================//

exports.getByCategoryId = async (req, res) => {
  try {
    let data = req.category;
    return res
      .status(200)
      .send({ success: true, message: "Get category", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Update category  ========================//

exports.updateCategory = async (req, res) => {
  try {
    let check = req.category;
    let { name } = req.body;
    let data = await categoryModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, message: "Upadte Successful", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Category disable  ========================//

exports.categoryDisable = async (req, res) => {
  try {
    let check = req.category;
    let data = await categoryModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Category is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Category is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
