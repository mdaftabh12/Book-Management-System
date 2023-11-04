const express = require("express");
const mongoose = require("mongoose");
const productModel = require("../model/productModel");

//=====================  Get by productId  =====================//

exports.getByProductId = async (req, res, next) => {
  try {
    let checks = await productModel.findById({ _id: req.params.productId });
    if (!checks) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }
    req.product = checks;
    next();
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
