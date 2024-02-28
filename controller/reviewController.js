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
      return res.status(400).json({
        success: false,
        message: "The product you are trying to review does not exist.",
      });
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
    return res.status(201).json({
      success: true,
      message: "Your review has been successfully submitted.",
      data: data,
    });
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
      message: "Here are all the reviews for the selected product.",
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
      message: "Here are all the reviews submitted by you.",
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
      return res.status(400).json({
        success: false,
        message: "Please provide a message for the review.",
      });
    }
    if (!reviewRatting) {
      return res.status(400).json({
        success: false,
        message: "Please provide a rating for the review.",
      });
    }
    if (!check) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
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
        .json({ success: false, message: "Product not found." });
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
    return res.status(200).json({
      success: true,
      message: "Review updated successfully.",
      data: data,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all review  ========================//

exports.getAllReview = async (req, res) => {
  try {
    let reviews = await reviewModel.find({ disable: false });

    if (!reviews.length) {
      return res
        .status(404)
        .json({ success: false, message: "No reviews found." });
    }

    if (req.query.adminId) {
      let allReviews = await reviewModel.find();
      return res.status(200).json({
        success: true,
        message: "All reviews retrieved successfully for admin.",
        data: allReviews,
      });
    }

    return res.status(200).json({
      success: true,
      message: "All reviews retrieved successfully.",
      data: reviews,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
