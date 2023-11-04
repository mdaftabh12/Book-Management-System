const mongoose = require("mongoose");

//====================  Support policy model  ==================//

const supportPolicySchema = new mongoose.Schema(
  {
    name: String,
    supportPolicy: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("supportPolicyModel", supportPolicySchema);
