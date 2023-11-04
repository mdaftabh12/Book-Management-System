const returnPolicyModel = require("../model/returnPolicyModel");

//========================  Create return policy  ========================//

exports.createReturnPolicy = async (req, res) => {
  try {
    let { name, returnPolicy } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!returnPolicy) {
      return res
        .status(400)
        .json({ success: false, message: "Return Policy is required" });
    }
    let data = await returnPolicyModel.create({
      name: name,
      returnPolicy: returnPolicy,
    });
    return res
      .status(201)
      .json({ success: true, message: "Return Policy Add", data: data });
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
      return res.status(404).json({ success: false, message: "Not found" });
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
    return res
      .status(200)
      .json({ success: true, message: "Update Successfull", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Get all return policy  ========================//

exports.getAllReturnPolicy = async (req, res) => {
  try {
    let check = await returnPolicyModel.find({ disable: false });
    if (!check.length) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (req.query.adminId) {
      let check = await returnPolicyModel.find();
      return res
        .status(200)
        .json({
          success: true,
          message: "Get all returnPolicyModel by admin",
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

//========================  Get by returnPolicyId  ========================//

exports.getByIdReturnPolicy = async (req, res) => {
  try {
    let check = await returnPolicyModel.findById({
      _id: req.params.returnPolicyId,
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

//========================  Disable return policy  ========================//

exports.returnPolicyDisable = async (req, res) => {
  try {
    let check = await returnPolicyModel.findById({
      _id: req.params.returnPolicyId,
    });
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    let data = await returnPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Return Policy is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Return Policy is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
