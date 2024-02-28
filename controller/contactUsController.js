const contactUsModel = require("../model/contactUsModel");

//========================  Create contactUs  ========================//

exports.createContactUs = async (req, res) => {
  try {
    let { company, name, email, message, phone } = req.body;
    let userId = req.user;
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "UserId is required" });
    }
    if (!company) {
      return res
        .status(400)
        .json({ success: false, message: "Company is required" });
    }
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "Email is required" });
    }
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "Message is required" });
    }
    if (!phone) {
      return res
        .status(400)
        .json({ success: false, message: "Phone Number is required" });
    }
    let contactUs = await contactUsModel.create({
      userId: userId,
      company: company,
      name: name,
      email: email,
      message: message,
      phone: phone,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create ContactUs", data: contactUs });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by contactUsId  ========================//

exports.getByContactUsId = async (req, res) => {
  try {
    let check = await contactUsModel.findById({ _id: req.params.contactUsId });
    if (!check) {
      return res
        .status(400)
        .json({ success: false, message: "contactUs not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get By contactUsId", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all contactUs  ========================//

exports.getByAllContactUs = async (req, res) => {
  try {
    let check = await contactUsModel.find();
    if (!check.length) {
      return res
        .status(400)
        .json({ success: false, message: "contactUs not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get All contactUs", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update contactUs  ========================//

exports.updateContactUs = async (req, res) => {
  try {
    let { company, name, email, message, phone } = req.body;
    let check = await contactUsModel.findById({ _id: req.params.contactUsId });
    if (!check) {
      return res
        .status(400)
        .json({ success: false, message: "ContactUs not found" });
    }
    let contactUs = await contactUsModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          company: company,
          name: name,
          email: email,
          message: message,
          phone: phone,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({
        success: true,
        message: "ContactUs Update Successful",
        data: contactUs,
      });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
