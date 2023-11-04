const supportPolicyModel = require("../model/supportPolicyModel");

//========================  Create support policy  ========================//

exports.createSupportPolicy = async (req, res) => {
  try {
    let { name, supportPolicy } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!supportPolicy) {
      return res
        .status(400)
        .json({ success: false, message: "Support Policy is required" });
    }
    let data = await supportPolicyModel.create({
      name: name,
      supportPolicy: supportPolicy,
    });
    return res
      .status(201)
      .json({ success: true, message: "Support Policy Add", data: data });
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
      return res.status(404).json({ success: false, message: "Not found" });
    }

    let data = await supportPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          supportPolicy: supportPolicy,
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

//======================== Get all support policy  ========================//

exports.getAllSupportPolicy = async (req, res) => {
  try {
    let check = await supportPolicyModel.find({ disable: false });
    if (!check.length) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (req.query.adminId) {
      let check = await supportPolicyModel.find();
      return res.status(200).json({
        success: true,
        message: "Get all supportPolicy by admin",
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

//========================  Get By supportPolicyId  ========================//

exports.getByIdSupportPolicy = async (req, res) => {
  try {
    let check = await supportPolicyModel.findById({
      _id: req.params.supportPolicyId,
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

//========================  Disable support policy  ========================//

exports.supportPolicyDisable = async (req, res) => {
  try {
    let check = await supportPolicyModel.findById({
      _id: req.params.supportPolicyId,
    });
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    let data = await supportPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Support Policy is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Support Policy is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
