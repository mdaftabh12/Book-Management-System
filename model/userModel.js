const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//====================  User model  ==================//

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    mobile: Number,
    picture: String,
    addressId:{
        type: objectId,
        ref:"addressModel",
        default : null,
    }, 
    password: String, 
    userType:{
        type: String,
        enum : ["USER", "ADMIN"],
        default: "USER",
    },
    otp: Number,
    disable:{
        type: Boolean,
        default: false,
    },

});

module.exports = mongoose.model("userModel", userSchema); 