const privacyPolicyModel = require("../model/privacyPolicyModel");

//========================  Create privacy policy  ========================//

exports.createPrivacyPolicy = async (req, res) => {
  try {
    let { name, privacyPolicy } = req.body;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!privacyPolicy) {
      return res
        .status(400)
        .json({ success: false, message: "Privacy Policy is required" });
    }
    let data = await privacyPolicyModel.create({
      name: name,
      privacyPolicy: privacyPolicy,
    });
    return res
      .status(201)
      .json({ success: true, message: "Privacy Policy Add", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update privacy policy  ========================//

exports.updatePrivacyPolicy = async (req, res) => {
  try {
    let check = await privacyPolicyModel.findById({
      _id: req.params.privacyPolicyId,
    });
    let { name, privacyPolicy } = req.body;
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }

    let data = await privacyPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          privacyPolicy: privacyPolicy,
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

//========================  Get all privacy policy  ========================//

exports.getAllPrivacyPolicy = async (req, res) => {
  try {
    let check = await privacyPolicyModel.find({ disable: false });
    if (!check.length) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    if (req.query.adminId) {
      let check = await privacyPolicyModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get All", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by privacyPolicyId  ========================//

exports.getByIdPrivacyPolicy = async (req, res) => {
  try {
    let check = await privacyPolicyModel.findById({
      _id: req.params.privacyPolicyId,
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

//========================  Disable privacy policy  ========================//

exports.privacyPolicyDisable = async (req, res) => {
  try {
    let check = await privacyPolicyModel.findById({
      _id: req.params.privacyPolicyId,
    });
    if (!check) {
      return res.status(404).json({ success: false, message: "Not found" });
    }
    let data = await privacyPolicyModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Privacy Policy is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Privacy Policy is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
