const tactimonialModel = require("../model/tactimonialModel");
const fs = require("fs");

//========================  Create tactimonial  ========================//

exports.createTactimonial = async (req, res) => {
  try {
    let { name, rating, description } = req.body;
    let image = req.file ? req.file.path : null;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!rating) {
      return res
        .status(400)
        .json({ success: false, message: "Rating is required" });
    }
    if (!description) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    let data = await tactimonialModel.create({
      image: image,
      description: description,
      rating: rating,
      name: name,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create Tactimonial", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by tactimonialId  ========================//

exports.getByTactimonialId = async (req, res) => {
  try {
    let tactimonial = req.tactimonial;
    return res.status(200).json({
      success: true,
      message: "Get By tactimonialId",
      data: tactimonial,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all tactimonial  ========================//

exports.getAllTactimonial = async (req, res) => {
  try {
    let check = await tactimonialModel.find({ disable: false });
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "Tactimonial not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all Tactimonial", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Update tactimonial  ========================//

exports.updateTactimonial = async (req, res) => {
  try {
    let { name, rating, description } = req.body;
    let image = req.file ? req.file.path : null;
    let tactimonial = req.tactimonial;
    if (image && tactimonial.image != null) {
      await fs.unlink(tactimonial.image, (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    let data = await tactimonialModel.findByIdAndUpdate(
      { _id: tactimonial._id },
      {
        $set: {
          name: name,
          rating: rating,
          description: description,
          image: image ? image : tactimonial.image,
        },
      },
      { new: true }
    );
    return res.status(200).json({
      success: false,
      message: "Tactimonial update successful",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Tactimonial disable  ========================//

exports.disableTactimonial = async (req, res) => {
  try {
    let tactimonial = req.tactimonial;
    let data = await tactimonialModel.findByIdAndUpdate(
      { _id: tactimonial._id },
      {
        $set: {
          disable: !tactimonial.disable,
        },
      },
      { new: true }
    );
    if (data.disable) {
      return res
        .status(200)
        .json({ success: true, message: "Tactimonial is Enable" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Tactimonial is Disable" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
