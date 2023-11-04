const reviewModel = require("../model/reviewModel");
const productModel = require("../model/productModel");

//========================  Create review  ========================//

exports.createReview = async (req, res) => {
  try {
    let { productId, userId, message, reviewRatting } = req.body;
    if (!productId) {
      return res
        .status(400)
        .json({ success: false, message: "productId is required" });
    }
    if (!userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "message is required" });
    }
    if (!reviewRatting) {
      return res
        .status(400)
        .json({ success: false, message: "reviewRatting is required" });
    }
    let data = await reviewModel.create({
      productId: productId,
      userId: userId,
      message: message,
      reviewRatting: reviewRatting,
    });
    let product = await productModel.findById({ _id: req.body.productId });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    let review = await reviewModel.find({ productId: req.body.productId });
    let reviewCount = 0;
    for (let i = 0; i < review.length; i++) {
      reviewCount = reviewCount + review[i].reviewRatting;
    }
    let updateProduct = await productModel.findByIdAndUpdate(
      { _id: req.body.productId },
      {
        $set: {
          reviewCount: product.reviewCount + 1,
          averageRating: (reviewCount / review.length).toFixed(1),
        },
      }
    );
    return res
      .status(201)
      .json({ success: true, message: "Create Review", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//===================  Get all review by productId  ================//

exports.getAllReviewByProductId = async (req, res) => {
  try {
    product = req.product;

    return res.status(200).json({
      success: true,
      message: "Get all review by productId",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//=====================  Get all review by userId  ===================//

exports.getAllReviewByUserId = async (req, res) => {
  try {
    user = req.user;

    return res.status(200).json({
      success: true,
      message: "Get all review by userId",
      data: user,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update review  ========================//

exports.updateReview = async (req, res) => {
  try {
    let { message, reviewRatting } = req.body;
    let check = await reviewModel.findById({ _id: req.params.reviewId });

    if (!message) {
      return res
        .status(400)
        .json({ success: false, message: "message is required" });
    }
    if (!reviewRatting) {
      return res
        .status(400)
        .json({ success: false, message: "reviewRatting is required" });
    }
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "review not found" });
    }
    let data = await reviewModel.findByIdAndUpdate(
      { _id: req.params.reviewId },
      {
        $set: {
          message: message,
          reviewRatting: reviewRatting,
        },
      },
      { new: true }
    );
    let product = await productModel.findById({ _id: check.productId });
    if (!product) {
      return res
        .status(400)
        .json({ success: false, message: "Product not found" });
    }
    let review = await reviewModel.find({ productId: check.productId });
    let reviewCount = 0;
    for (let i = 0; i < review.length; i++) {
      reviewCount = reviewCount + review[i].reviewRatting;
    }
    let updateProduct = await productModel.findByIdAndUpdate(
      { _id: check.productId },
      {
        $set: {
          averageRating: (reviewCount / review.length).toFixed(1),
        },
      }
    );
    return res
      .status(200)
      .json({ success: true, message: "Update Review successful", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all review  ========================//

exports.getAllReview = async (req, res) => {
  try {
    let check = await reviewModel.find({ disable: false });
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found" });
    }
    if (req.query.adminId) {
      let check = await reviewModel.find();
      return res.status(200).json({
        success: true,
        message: "Get all review by admin",
        data: check,
      });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all review", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
