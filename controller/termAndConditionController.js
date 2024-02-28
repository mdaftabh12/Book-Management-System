const termAndConditionModel = require("../model/termAndConditionModel");

//=================  Create term and condition  ===================//

exports.createTermAndCondition = async (req, res) => {
  try {
    let { name, termAndCondition } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required." });
    }
    if (!termAndCondition) {
      return res
        .status(400)
        .json({ success: false, message: "Term and Condition is required." });
    }
    let data = await termAndConditionModel.create({
      name: name,
      termAndCondition: termAndCondition,
    });
    return res.status(201).json({
      success: true,
      message: "Term and Condition added successfully.",
      data: data,
    });
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
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Term and Condition not found." });
    }
    let { name, termAndCondition } = req.body;

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
    return res.status(200).json({
      success: true,
      message: "Term and Condition updated successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//===================  Get all term and condition  ==================//

exports.getAllTermAndCondition = async (req, res) => {
  try {
    let termAndConditions = await termAndConditionModel.find({
      disable: false,
    });

    if (!termAndConditions.length) {
      return res.status(400).json({
        success: false,
        message: "No active term and conditions found.",
      });
    }

    if (req.query.adminId) {
      let allTermAndConditions = await termAndConditionModel.find();
      if (!allTermAndConditions.length) {
        return res.status(400).json({
          success: false,
          message: "No active term and conditions found.",
        });
      }
      return res.status(200).json({
        success: true,
        message: "All term and conditions retrieved by admin.",
        data: allTermAndConditions,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All active term and conditions retrieved successfully.",
      data: termAndConditions,
    });
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
      return res.status(404).json({
        success: false,
        message: "The requested term and condition was not found.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Term and condition details retrieved successfully.",
      data: check,
    });
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
      return res
        .status(404)
        .json({ success: false, message: "Term and condition not found." });
    }
    let data = await termAndConditionModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    let message = updatedTermAndCondition.disable
      ? "Term and condition has been disabled."
      : "Term and condition has been enabled.";

    return res.status(200).send({ success: true, message: message });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
