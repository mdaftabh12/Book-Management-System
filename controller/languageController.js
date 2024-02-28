const languageModel = require("../model/languageModel");

//========================  Create language  ========================//

exports.createLanguage = async (req, res) => {
  try {
    let { name } = req.body;
    if (!name) {
      return res
        .status(400)
        .send({ success: false, message: "Name is required" });
    }
    let data = await languageModel.create({
      name: name,
    });
    return res
      .status(201)
      .send({ success: true, message: "Create Language", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Get all language  ========================//

exports.getAllLanguage = async (req, res) => {
  try {
    let data = await languageModel.find({ disable: false });
    if (!data) {
      return res
        .status(404)
        .send({ success: false, message: "Language Not found" });
    }
    if (req.query.adminId) {
      let check = await languageModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .send({ success: true, message: "Get All Language", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Get by languageId  ========================//

exports.getByLanguageId = async (req, res) => {
  try {
    let data = req.language;
    return res
      .status(200)
      .send({ success: true, message: "Get Language", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Update language  ========================//

exports.updateLanguage = async (req, res) => {
  try {
    let check = req.language;
    let { name } = req.body;
    let data = await languageModel.findByIdAndUpdate(
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
      .send({
        success: true,
        message: "Language Upadte Successful",
        data: data,
      });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//========================  Language disable  ========================//

exports.languageDisable = async (req, res) => {
  try {
    let check = req.language;
    let data = await languageModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Language is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Language is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
