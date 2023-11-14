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
        message: "Please provide mobile number or email",
      });
    }
    if (mobile && email) {
      return res.status(400).json({
        success: false,
        message: "Please provide mobile number or email",
      });
    }
    if (mobile) { 
      if (!validateMobileNumber(mobile)) {
        return res.status(400).send({
          success: false,
          message: "please provide valid mobile number",
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
        message: "Allready Register",
      });
    }
    if (mobile || email) {
      if (mobile) {
        let otp = generateOtp();
        sendOtpFn(mobile, otp);
        let register = await userModel.create({
          mobile: mobile,
          otp: otp,
        });
        return res.status(201).send({
          success: true,
          message: "You are register successfull",
          data: register,
        });
      }
      if (email) {
        let otp = generateOtp();
        let register = await userModel.create({
          email: email,
          otp: otp,
        });
        return res.status(201).send({
          success: true,
          message: "You are register successfull",
          data: register,
        });
      }
    }
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

      let book = await userModel.findOneAndUpdate(
        { email: user.email, mobile: user.mobile },
        {
          $set: {
            otp: otp,
          },
        },
        { new: true }
      );
      return res
        .status(200)
        .json({ success: true, message: "login", data: book });
    }
    return res.status(404).send({ success: false, message: "User not found" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Admin login  =====================//

exports.adminLogin = async (req, res) => {
  try {
    let { email, password } = req.body;
    let check = await userModel.findOne({ email: email });
    if (!email) {
      return res
        .status(400)
        .json({ success: false, message: "email is required" });
    }
    if (!password) {
      return res
        .status(400)
        .json({ success: false, message: "password is required" });
    }
    const hashPassword = await bcrypt.compareSync(password, check.password);
    // console.log(hashPassword);
    if (!check || !hashPassword) {
      return res
        .status(404)
        .json({ success: false, message: "Admin not found" });
    }
    if (hashPassword) {
      let token = await jwt.sign({ _id: check._id }, process.env.SECRET_KEY, {
        expiresIn: "7d",
      });
      check._doc.token = token;
      return res.status(200).send({
        success: true,
        message: "Admin login successful",
        data: check,
      });
    }
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
        return res
          .status(200)
          .send({ success: true, message: "OTP Verifed", data: user });
      } else {
        return res
          .status(400)
          .send({ success: false, message: "Invailid OTP" });
      }
    }
    return res.status(404).send({ success: false, message: "User not found" });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Get by userId   =====================//

exports.getByUserId = async (req, res) => {
  try {
    let check = req.user;
    return res
      .status(200)
      .send({ success: true, message: "User details", data: check });
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
    return res
      .status(200)
      .send({ success: true, message: "Update Successful", data: user });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//=====================  Get all users  =====================//

exports.getAllUsers = async (req, res) => {
  try {
    let data = await userModel.find({ disable: false });
    if (!data.length) {
      return res
        .status(404)
        .send({ success: false, message: "User not found" });
    }
    if (req.query.adminId) {
      let check = await userModel.find();
      return res.status(200).json({
        success: true,
        message: "Get all user by admin",
        data: check,
      });
    }
    return res
      .status(200)
      .send({ success: true, message: "All users", data: data });
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
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "User is disable" });
    } else {
      return res.status(200).send({ success: true, message: "User is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
