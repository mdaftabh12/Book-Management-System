const mongoose = require("mongoose");

//====================  Membership model  ==================//

const membershipSchema = new mongoose.Schema(
  {
    image: String,
    title: String,
    subtitle: String,
    price: Number,
    duration: Number,
    features:[],
    discountPercent: Number,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("membershipModel", membershipSchema);
