const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  ContactUs model  ==================//

const contactUsSchema = new mongoose.Schema(
  {
    userId: {
      type: objectId, 
      ref: "userModel",
    },
    company: String,
    name: String,
    email: String,
    message: String,
    phone: Number,
  },
  { timestamps: true }
);

module.exports = mongoose.model("contactUsModel", contactUsSchema);
