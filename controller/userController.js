const userModel = require("../model/userModel");
const fs = require("fs");
const path = require("path");
const otpGenerator = require("otp-generator");
const jwt = require("jsonwebtoken");
const http = require("http");
const bcrypt = require("bcrypt");

//=====================  OTP generate  =====================//

const generateOtp = () => {
  const OTP = otpGenerator.generate(4, {
    upperCaseAlphabets: false,
    specialChars: false,
    lowerCaseAlphabets: false,
  });
  return OTP;
};

//===============  Validation of 10 digit  =================//

function validateMobileNumber(number) {
  const regex = /^[0-9]{10}$/;
  return regex.test(number);
}

//===============  Send OTP on mobile  function  =============//

const sendOtpFn = (phone, otp) => {
  const options = {
    method: "POST",
    hostname: "api.msg91.com",
    port: null,
    path: "/api/v5/flow/",
    headers: {
      authkey: "384292AwWekgBJSf635f77feP1",
      "content-type": "application/json",
    },
  };

  const req = http.request(options, function (res) {
    const chunks = [];

    res.on("data", function (chunk) {
      chunks.push(chunk);
    });

    res.on("end", function () {
      const body = Buffer.concat(chunks);
      console.log(body.toString());
    });
  });

  req.write(
    `{\n  \"flow_id\": \"63614b3dabf10640e61fa856\",\n  \"sender\": \"DSMONL\",\n  \"mobiles\": \"91${phone}\",\n  \"otp\": \"${otp}\"\n}`
  );
  req.end();
};

//=====================  User register  =====================//

exports.userRegister = async (req, res) => {
  try {
    let obj = {};
    let { mobile, email } = req.body;

    if (!mobile && !email) {
      return res.status(400).json({
        success: false,
        message: "Please provide a mobile number or an email address.",
      });
    }
    if (mobile && email) {
      return res.status(400).json({
        success: false,
        message:
          "Please provide either a mobile number or an email address, not both.",
      });
    }
    if (mobile) {
      if (!validateMobileNumber(mobile)) {
        return res.status(400).send({
          success: false,
          message: "Please provide a valid mobile number.",
        });
      }
      obj.mobile = mobile;
    }

    if (email) {
      obj.email = email;
    }
    let check = await userModel.findOne(obj);
    if (check) {
      return res.status(400).json({
        success: false,
        message: "You are already registered.",
      });
    }
    // if (mobile || email) {
    //   if (mobile) {
    //     let otp = generateOtp();
    //     sendOtpFn(mobile, otp);
    //     let register = await userModel.create({
    //       mobile: mobile,
    //       otp: otp,
    //     });
    //     return res.status(201).send({
    //       success: true,
    //       message: "You have been registered successfully.",
    //       data: register,
    //     });
    //   }
    //   if (email) {
    //     let otp = generateOtp();
    //     let register = await userModel.create({
    //       email: email,
    //       otp: otp,
    //     });
    //     return res.status(201).send({
    //       success: true,
    //       message: "You have been registered successfully.",
    //       data: register,
    //     });
    //   }
    // }

    // Create user with provided details and OTP
    let register = await userModel.create({
      ...(mobile && { mobile }),
      ...(email && { email }),
      otp: otp,
    });

    return res.status(201).send({
      success: true,
      message: "You have been registered successfully.",
      data: register,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================   User login  =====================//

exports.userLogin = async (req, res) => {
  try {
    let { mobile, email } = req.body;
    let Obj = {};
    if (mobile) {
      Obj.mobile = mobile;
    }
    if (email) {
      Obj.email = email;
    }
    let user = await userModel.findOne(Obj);
    if (user) {
      let otp = generateOtp();
      sendOtpFn(user.mobile, otp);

      let userData = await userModel.findOneAndUpdate(
        { email: user.email, mobile: user.mobile },
        {
          $set: {
            otp: otp,
          },
        },
        { new: true }
      );

      let loginMessage = mobile
        ? "Login successful. OTP has been sent to your registered mobile number."
        : "Login successful. OTP has been sent to your registered email address.";

      return res.status(200).json({
        success: true,
        message: loginMessage,
        data: userData,
      });
    }
    return res
      .status(404)
      .send({ success: false, message: "Login failed. User not found." });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Admin login  =====================//

exports.adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Please provide your email address.",
      });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "Please provide your password." });
    }

    let admin = await userModel.findOne({ email: email });
    if (!admin) {
      return res.status(404).json({
        success: false,
        message: "Admin account not found. Please verify your email address.",
      });
    }
    const isPasswordValid = await bcrypt.compareSync(password, admin.password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message:
          "Incorrect password. Please check your password and try again.",
      });
    }

    let token = jwt.sign({ _id: admin._id }, process.env.SECRET_KEY, {
      expiresIn: "7d",
    });

    admin._doc.token = token;
    return res.status(200).json({
      success: true,
      message: "Admin login successful. Welcome!",
      data: admin,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  OTP verify  =====================//

exports.otpVerify = async (req, res) => {
  try {
    let { mobile, email } = req.body;
    let Obj = {};
    if (mobile) {
      Obj.mobile = mobile;
    }
    if (email) {
      Obj.email = email;
    }
    let user = await userModel.findOne(Obj);
    if (user) {
      if (user.otp == req.body.otp) {
        let token = await jwt.sign({ User: user._id }, process.env.SECRET_KEY, {
          expiresIn: "7d",
        });
        user._doc.token = token;
        return res.status(200).send({
          success: true,
          message: "OTP verified successfully. You are now logged in.",
          data: user,
        });
      } else {
        return res.status(400).send({
          success: false,
          message:
            "Invalid OTP. Please enter the correct OTP to verify your identity.",
        });
      }
    }
    return res.status(404).send({
      success: false,
      message:
        "User not found. Please ensure you've entered the correct mobile number or email address.",
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Get by userId   =====================//

exports.getByUserId = async (req, res) => {
  try {
    let userDetails = req.user;

    return res.status(200).send({
      success: true,
      message: "User details retrieved successfully.",
      data: userDetails,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Update user  =====================//

exports.updateUser = async (req, res) => {
  try {
    let check = req.user;
    let { firstName, lastName, email, mobile, addressId, password } = req.body;
    let picture = req.file ? req.file.path : null;
    // console.log(picture);
    const hashPassword = await bcrypt.hashSync(password, 10);

    if (picture && check.picture != null) {
      await fs.unlink(check.picture, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }

    let user = await userModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          picture: picture ? req.file.path : check.picture,
          // picture: `http://localhost:4500/${picture}`,
          addressId: addressId,
          password: hashPassword,
        },
      },
      { new: true }
    );
    return res.status(200).send({
      success: true,
      message: "User profile updated successfully.",
      data: user,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Get all users  =====================//

exports.getAllUsers = async (req, res) => {
  try {
    let users = await userModel.find({ disable: false });

    if (!users.length) {
      return res
        .status(404)
        .send({ success: false, message: "No active users found." });
    }

    if (req.query.adminId) {
      let allUsers = await userModel.find();
      return res.status(200).json({
        success: true,
        message: "All users retrieved successfully.",
        data: allUsers,
      });
    }

    return res.status(200).send({
      success: true,
      message: "Active users retrieved successfully.",
      data: users,
    });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  User disable  =====================//

exports.userDisable = async (req, res) => {
  try {
    let check = req.user;
    let data = await userModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    let message = updatedUser.disable
      ? "User has been disabled."
      : "User has been enabled.";

    return res.status(200).send({ success: true, message: message });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
