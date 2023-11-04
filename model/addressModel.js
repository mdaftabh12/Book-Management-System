const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  Address model  ==================//

const addressSchema = new mongoose.Schema(
  {
    name: String,
    mobile: Number,
    houseNumber: Number,
    userId: {
      type: objectId,
      ref: "userModel",
    },
    pincode: Number,
    city: String,
    state: String,
    landmark: String,
    country: String,
    address1: String,
    address2: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("addressModel", addressSchema);
