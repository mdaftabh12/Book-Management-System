const returnPolicyModel = require("../model/returnPolicyModel");

//========================  Create return policy  ========================//

exports.createReturnPolicy = async (req, res) => {
  try {
    let { name, returnPolicy } = req.body;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Please provide the name of the return policy.",
      });
    }
    if (!returnPolicy) {
      return res.status(400).json({
        success: false,
        message: "Please provide the return policy details.",
      });
    }

    let data = await returnPolicyModel.create({
      name: name,
      returnPolicy: returnPolicy,
    });

    return res.status(201).json({
      success: true,
      message: "Return policy added successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update return policy  ========================//

exports.updateReturnPolicy = async (req, res) => {
  try {
    let check = await returnPolicyModel.findById({
      _id: req.params.returnPolicyId,
    });
    let { name, returnPolicy } = req.body;
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Return policy not found." });
    }

    let data = await returnPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          returnPolicy: returnPolicy,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Return policy updated successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Get all return policy  ========================//

exports.getAllReturnPolicy = async (req, res) => {
  try {
    let check = await returnPolicyModel.find({ disable: false });

    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "No return policies found." });
    }

    if (req.query.adminId) {
      let check = await returnPolicyModel.find();
      return res.status(200).json({
        success: true,
        message: "All return policies retrieved successfully for admin.",
        data: check,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All active return policies retrieved successfully.",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by returnPolicyId  ========================//

exports.getByIdReturnPolicy = async (req, res) => {
  try {
    let check = await returnPolicyModel.findById({
      _id: req.params.returnPolicyId,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Return policy not found." });
    }
    return res.status(200).json({
      success: true,
      message: "Return policy retrieved successfully.",
      data: check,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Disable return policy  ========================//

exports.returnPolicyDisable = async (req, res) => {
  try {
    let check = await returnPolicyModel.findById({
      _id: req.params.returnPolicyId,
    });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Return policy not found." });
    }
    let data = await returnPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    const action = updatedPolicy.disable ? "disabled" : "enabled";
    const message = `Return policy is now ${action}.`;

    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
