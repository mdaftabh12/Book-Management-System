const membershipModel = require("../model/membershipModel");

//=====================  Get by membershipId  =====================//

exports.getByMembershipId = async (req, res, next) => {
  try {
    let check = await membershipModel.findById({ _id: req.params.membershipId });
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Membership not found" });
    }
    req.membershipId = check;
    next();
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
