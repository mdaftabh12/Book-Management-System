const termAndConditionModel = require("../model/termAndConditionModel");

//=================  Create term and condition  ===================//

exports.createTermAndCondition = async (req, res) => {
  try {
    let { name, termAndCondition } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!termAndCondition) {
      return res
        .status(400)
        .json({ success: false, message: "Term And Condition is required" });
    }
    let data = await termAndConditionModel.create({
      name: name,
      termAndCondition: termAndCondition,
    });
    return res
      .status(201)
      .json({ success: true, message: "Term And Condition Add", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  Update term and condition  ===================//

exports.updateTermAndCondition = async (req, res) => {
  try {
    let check = await termAndConditionModel.findById({
      _id: req.params.termAndConditionId,
    });
    let { name, termAndCondition } = req.body;
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    let data = await termAndConditionModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          termAndCondition: termAndCondition,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Update Successfull", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//===================  Get all term and condition  ==================//

exports.getAllTermAndCondition = async (req, res) => {
  try {
    let check = await termAndConditionModel.find({disable : false});
    if (!check.length) {
      return res
        .status(200)
        .json({ success: true, message: "Not found", data: [] });
    }
    if (req.query.adminId) {
      let check = await termAndConditionModel.find();
      return res.status(200).json({
        success: true,
        message: "Get all termAndCondition by admin",
        data: check,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get All", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//==================  Get by termAndConditionId  ================//

exports.getByIdTermAndCondition = async (req, res) => {
  try {
    let check = await termAndConditionModel.findById({
      _id: req.params.termAndConditionId,
    });
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get By Id", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  Disable term and condition  =================//

exports.termAndConditionDisable = async (req, res) => {
  try {
    let check = await termAndConditionModel.findById({
      _id: req.params.termAndConditionId,
    });
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    let data = await termAndConditionModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Term And Condition is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Term And Condition is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
