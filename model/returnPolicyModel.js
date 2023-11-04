const mongoose = require("mongoose");

//====================  Return policy model  ==================//

const returnPolicySchema = new mongoose.Schema(
  {
    name: String,
    returnPolicy: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("returnPolicyModel", returnPolicySchema);
