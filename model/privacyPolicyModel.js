const mongoose = require("mongoose");

//====================  Privacy policy model  ==================//

const privacyPolicySchema = new mongoose.Schema(
  {
    name: String,
    privacyPolicy: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
); 

module.exports = mongoose.model("privacyPolicy", privacyPolicySchema);
