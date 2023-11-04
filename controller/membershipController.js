const membershipModel = require("../model/membershipModel");
const fs = require("fs");

//========================  Create membership  ========================//

exports.createMembership = async (req, res) => {
  try {
    let { title, subtitle, price, duration, features, discountPercent } =
      req.body;
    let image = req.file ? req.file.path : null;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "price is required" });
    }
    if (!subtitle) {
      return res
        .status(400)
        .json({ success: false, message: "Subtitle is required" });
    }
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    if (!duration) {
      return res
        .status(400)
        .json({ success: false, message: "duration is required" });
    }
    if (!features) {
      return res
        .status(400)
        .json({ success: false, message: "features is required" });
    }
    if (!discountPercent) {
      return res
        .status(400)
        .json({ success: false, message: "discountPercent is required" });
    }
    let membership = await membershipModel.create({
      title: title,
      discountPercent: discountPercent,
      subtitle: subtitle,
      image: image,
      features: features,
      duration: duration,
      price: price,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create membership", data: membership });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all membership  ========================//

exports.getAllMembership = async (req, res) => {
  try {
    let page = req.query.page - 1 || 0;
    let membershipPerPage = 20;
    let membership = await membershipModel
      .find()
      .skip(page * membershipPerPage)
      .limit(membershipPerPage);
    if (!membership.length) {
      return res
        .status(404)
        .json({ success: false, message: "Membership not found" });
    }
    if (req.query.adminId) {
      let check = await membershipModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all membership", data: membership });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by membershipId  ========================//

exports.getByMembershipId = async (req, res) => {
  try {
    let membership = req.membershipId;
    return res.status(200).json({
      success: true,
      message: "Get By membershipId",
      data: membership,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update membership  ========================//

exports.updateMembership = async (req, res) => {
  try {
    let membershipId = req.membershipId;
    let { title, subtitle, price, duration, features, discountPercent } =
      req.body;
    let image = req.file ? req.file.path : null;
    // console.log(blogId);
    if (image && membershipId.image != null) {
      await fs.unlink(membershipId.image, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
    let membership = await membershipModel.findByIdAndUpdate(
      { _id: membershipId._id },
      {
        $set: {
          title: title,
          discountPercent: discountPercent,
          subtitle: subtitle,
          image: image,
          features: features,
          duration: duration,
          price: price,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Membership Update Successful",
      data: membership,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Disable membership  ========================//

exports.disableMembership = async (req, res) => {
  try {
    let membershipId = req.membershipId;
    let membership = await membershipModel.findByIdAndUpdate(
      { _id: membershipId._id },
      {
        $set: {
          disable: !membershipId.disable,
        },
      },
      { new: true }
    );
    if (membership.disable) {
      return res
        .status(200)
        .json({ success: true, message: "Membership is Disable" });
    } else {
      return res
        .status(200)
        .json({ success: true, message: "Membership is Enable" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
