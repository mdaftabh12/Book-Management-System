const supportPolicyModel = require("../model/supportPolicyModel");

//========================  Create support policy  ========================//

exports.createSupportPolicy = async (req, res) => {
  try {
    let { name, supportPolicy } = req.body;
    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide a name for the support policy.",
      });
    }
    if (!supportPolicy) {
      return res.status(400).json({
        success: false,
        message: "Please provide the support policy details.",
      });
    }
    let data = await supportPolicyModel.create({
      name: name,
      supportPolicy: supportPolicy,
    });
    return res.status(201).json({
      success: true,
      message: "Support policy has been added successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update support policy  ========================//

exports.updateSupportPolicy = async (req, res) => {
  try {
    let check = await supportPolicyModel.findById({
      _id: req.params.supportPolicyId,
    });
    let { name, supportPolicy } = req.body;
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Support policy not found." });
    }

    let updatedSupportPolicyData = await supportPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          supportPolicy: supportPolicy,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Support policy updated successfully.",
      data: updatedSupportPolicyData,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Get all support policy  ========================//

exports.getAllSupportPolicy = async (req, res) => {
  try {
    let supportPolicies = await supportPolicyModel.find({ disable: false });

    if (!supportPolicies.length) {
      return res
        .status(404)
        .json({ success: false, message: "No active support policies found." });
    }

    if (req.query.adminId) {
      let allSupportPolicies = await supportPolicyModel.find();
      return res.status(200).json({
        success: true,
        message: "All support policies retrieved successfully by admin.",
        data: allSupportPolicies,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All active support policies retrieved successfully.",
      data: supportPolicies,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get By supportPolicyId  ========================//

exports.getByIdSupportPolicy = async (req, res) => {
  try {
    let supportPolicy = await supportPolicyModel.findById(
      req.params.supportPolicyId
    );

    if (!supportPolicy) {
      return res
        .status(404)
        .json({ success: false, message: "Support policy not found." });
    }

    return res.status(200).json({
      success: true,
      message: "Support policy retrieved successfully.",
      data: supportPolicy,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Disable support policy  ========================//

exports.supportPolicyDisable = async (req, res) => {
  try {
    let check = await supportPolicyModel.findById({
      _id: req.params.supportPolicyId,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Support policy not found." });
    }
    let data = await supportPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    let message = updatedSupportPolicy.disable
      ? "Support policy has been disabled."
      : "Support policy has been enabled.";

    return res.status(200).json({ success: true, message: message });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
