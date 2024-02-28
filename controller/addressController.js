const addressModel = require("../model/addressModel");
const userModel = require("../model/userModel");

//==============  Create address  ==============//

exports.createAddress = async (req, res) => {
  try {
    let {
      name,
      mobile,
      houseNumber,
      userId,
      pincode,
      city,
      state,
      landmark,
      country,
      address1,
      address2,
    } = req.body;
    let user = await userModel.findById({ _id: req.body.userId });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!userId) {
      return res
        .status(400)
        .send({ success: false, message: "userId is required" });
    }
    if (!mobile) {
      return res
        .status(400)
        .send({ success: false, message: "Mobile is required" });
    }
    if (!houseNumber) {
      return res
        .status(400)
        .send({ success: false, message: "House Number is required" });
    }
    if (!pincode) {
      return res
        .status(400)
        .send({ success: false, message: "pincode is required" });
    }
    if (!city) {
      return res
        .status(400)
        .send({ success: false, message: "city is required" });
    }
    if (!state) {
      return res
        .status(400)
        .send({ success: false, message: "state is required" });
    }
    if (!landmark) {
      return res
        .status(400)
        .send({ success: false, message: "landmark is required" });
    }
    if (!country) {
      return res
        .status(400)
        .send({ success: false, message: "country is required" });
    }
    if (!address1) {
      return res
        .status(400)
        .send({ success: false, message: "address1 is required" });
    }
    let data = await addressModel.create({
      name: name,
      mobile: mobile,
      houseNumber: houseNumber,
      userId: userId,
      pincode: pincode,
      city: city,
      state: state,
      landmark: landmark,
      country: country,
      address1: address1,
      address2: address2,
    });
    return res
      .status(201)
      .send({ success: true, message: "Create Address", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//==============  Get all address  ==============//

exports.getAllAddress = async (req, res) => {
  try {
    let data = await addressModel.find({ disable: false });
    if (!data.length) {
      return res
        .status(404)
        .send({ success: false, message: "Address Not found" });
    }
    if (req.query.adminId) {
      let check = await addressModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .send({ success: true, message: "Get all Address", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
 
//==============  Get by addressId  =============//

exports.getByAddressId = async (req, res) => {
  try {
    let data = req.address;
    return res
      .status(200)
      .send({ success: true, message: "get Address", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//==============  Update address  ==============//

exports.updateAddress = async (req, res) => {
  try {
    let check = req.address;
    let {
      name,
      mobile,
      houseNumber,
      userId,
      pincode,
      city,
      state,
      landmark,
      country,
      address1,
      address2,
    } = req.body;

    let data = await addressModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          name: name,
          mobile: mobile,
          houseNumber: houseNumber,
          userId: userId,
          pincode: pincode,
          city: city,
          state: state,
          landmark: landmark,
          country: country,
          address1: address1,
          address2: address2,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .send({ success: true, message: "Addess upadte successful", data: data });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};

//==============   Address disable  =============//

exports.addressDisable = async (req, res) => {
  try {
    let check = req.address;
    let data = await addressModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .send({ success: true, message: "Address is disable" });
    } else {
      return res
        .status(200)
        .send({ success: true, message: "Address is Enable" });
    }
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
