const orderModel = require("../model/orderModel");
const cartModel = require("../model/cartModel");
const addressModel = require("../model/addressModel");
const productModel = require("../model/productModel");
const userModel = require("../model/userModel");
const mongoose = require("mongoose");
const objectId = mongoose.Types.ObjectId;

//========================  Create order  ========================//

exports.createOrder = async (req, res) => {
  try {
    let { addressId, tax, netAmount, payableAmount, taxAmount } = req.body;
    let cart = await cartModel
      .find({ userId: req.params.userId })
      .populate("productId");
    let address = await addressModel.findById({ _id: addressId });
    if (!req.params.userId) {
      return res
        .status(400)
        .json({ success: false, message: "userId is required" });
    }
    if (!addressId) {
      return res
        .status(400)
        .json({ success: false, message: "addressId is required" });
    }
    if (cart.length == 0) {
      return res.status(404).json({
        success: false,
        message: "You don't have any product your cart",
      });
    }
    // if (address.userId != req.params.userId) {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "UserId not found" });
    // }

    if (!address) {
      return res
        .status(404)
        .json({ success: false, message: "Address not found" });
    }
    let obj = [];
    for (let i = 0; i < req.coupon.length; i++) {
      console.log(req.coupon);
      let find = await productModel.findById({
        _id: req.coupon[i].productId._id,
      });
      await productModel.findByIdAndUpdate(
        { _id: req.coupon[i].productId._id },
        {
          $set: {
            sold: find.sold + req.coupon[i].quantity,
            stock: find.stock - req.coupon[i].quantity,
          },
        },
        { new: true }
      );
      obj.push({
        productId: req.coupon[i].productId,
        price: req.coupon[i].price,
        quantity: req.coupon[i].quantity,
      });
    }
    let data = await orderModel.create({
      userId: req.params.userId,
      product: req.coupon,
      tax: req.bill.tax,
      netAmount: req.bill.netAmount,
      payableAmount: req.bill.payableAmount,
      taxAmount: req.bill.taxAmount,
      discount: req.bill.discount,
      address: address,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create Order", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update order  ========================//

exports.updateOrder = async (req, res) => {
  try {
    let { transectionId, status } = req.body;
    let check = req.order;
    if (!transectionId) {
      return res
        .status(400)
        .json({ success: false, message: "transectionId is required" });
    }
    if (!status) {
      return res
        .status(400)
        .json({ success: false, message: "status is required" });
    }
    let data = await orderModel.findByIdAndUpdate(
      { _id: req.params.orderId },
      {
        $set: {
          transectionId: transectionId,
          status: status,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Order update successfull", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get order by orderId  ========================//

exports.getOrderByOrderId = async (req, res) => {
  try {
    let check = req.order;
    return res
      .status(200)
      .json({ success: true, message: "Get Order", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get order by userId  ========================//

exports.getOrderByUserId = async (req, res) => {
  try {
    let page = req.query.page || 0;
    let productPerPage = 20;
    let check = await orderModel
      .find({ userId: req.params.userId })
      .skip(page * productPerPage)
      .limit(productPerPage)
      .sort({ createdAt: -1 });
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "Not any order by this userId" });
    }
    return res
      .status(200)
      .json({ success: true, message: "All order by userId", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Status update  ========================//

exports.statusUpdate = async (req, res) => {
  try {
    let check = req.order;
    if (!req.body.status) {
      return res
        .status(400)
        .json({ success: false, message: "Status is required" });
    }
    let data = await orderModel.findByIdAndUpdate(
      { _id: check._id },
      {
        $set: {
          status: req.body.status,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: false, message: "Status Update", data: data });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//======================== Get all order  ========================//

exports.getAllOrder = async (req, res) => {
  try {
    let page = req.query.page || 0;
    let productPerPage = 10;
    let obj = req.date;
    // console.log(obj);
    let check = await orderModel
      .find(obj)
      .skip(page * productPerPage)
      .limit(productPerPage);
    if (!check.length) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }
    if (req.query.adminId) {
      let check = await orderModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    return res
      .status(200)
      .json({ success: true, message: " Get all order", data: check });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Dashboard count  ========================//

exports.dashboardCount = async (req, res) => {
  try {
    let countOrder = await orderModel.countDocuments();
    let countProduct = await productModel.countDocuments();
    const orderCountLive = await orderModel.countDocuments({
      $or: [
        { status: "ORDER" },
        { status: "CONFIRMED" },
        { status: "SHIPPED" },
        { status: "OUT_FOR_DELIVERY" },
      ],
    });
    const countUser = await userModel.countDocuments({
      $and: [{ userType: "USER" }, { disable: false }],
    });
    console.log(countUser);
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
 
// exports.orderFilter = async (req, res) => {
//   try {
//     let { status, name, categoryId, genreId, sortBy, price } = req.query;
//     let obj = {};
//     let obj2 = {};
//     let obj3 = {};
//     if (status) {
//       obj.status = status;
//     }
//     if (name) {
//       obj.name = name;
//     }

//     if (genreId) {
//       obj.genreId = genreId;
//     }
//     if (sortBy === "newToOld") {
//       obj2.sortBy = 1;
//     }
//     if (sortBy === "oldToNew") {
//       obj2.sortBy = -1;
//     }
//     if (price === "lowToHigh") {
//       obj3.price = -1;
//     }
//     if (price === "HighToLow") {
//       obj3.price = 1;
//     }
//     let category;
//     if (categoryId) {
//       category = { categoryId: req.query.categoryId };
//     }

//     // let order = await orderModel
//     //   .find(obj)
//     //   .populate({
//     //     path: "product",
//     //     populate: {
//     //       path: "productId",
//     //       match: category,
//     //       select: -{ categoryId: req.query.categoryId },
//     //     },
//     //   })
//     //   .sort({ $or: [{ createdAt: obj2 }, { price: obj3 }] });
//     let order = await orderModel.aggregate([
//       {
//         $lookup: {
//           from: "productmodels",
//           localField: "product.productId",
//           foreignField: "_id",
//           as: "productDetails",
//         },
//       },
//       {
//         $unwind: "$productDetails", // Unwind the productDetails array
//       },
//       {
//         $addFields: {
//           "product.productId": "$productDetails", // Replace productId with productDetails
//         },
//       },
//       {
//         $project: {
//           productDetails: 0, // Exclude the productDetails field if you don't need it
//         },
//       },

//     ]);
//     console.log(order);

//     return res
//       .status(200)
//       .json({ success: true, message: "Order Filter", data: order });
//   } catch (error) {
//     return res.status(500).json({ success: false, message: error.message });
//   }
// };

////////////////////////////////////////////////////////////////////////////////////////

exports.orderFilter = async (req, res) => {
  try {
    let { status, name, categoryId, sortBy, price } = req.query;
    const matchConditions = {};
    let sortConditions = {};
    if (status) {
      matchConditions.status = status;
    }
    if (name) {
      matchConditions.name = name;
    }
    if (categoryId) {
      matchConditions["product.productId.categoryId"] = new objectId(
        categoryId
      );
    }
    if (sortBy === "newToOld" && !price) {
      sortConditions.createdAt = 1;
    }
    if (sortBy === "oldToNew" && !price) {
      sortConditions.createdAt = -1;
    }
    if (price === "lowToHigh") {
      sortConditions.price = 1;
    }
    if (price === "HighToLow") {
      sortConditions.price = -1;
    }

    let pipeline;
    pipeline = [
      {
        $lookup: {
          from: "productmodels",
          localField: "product.productId",
          foreignField: "_id",
          as: "productDetails",
        },
      },
      {
        $unwind: "$productDetails", // Unwind the productDetails array
      },
      {
        $addFields: {
          "product.productId": "$productDetails", // Replace productId with productDetails
        },
      },
      {
        $project: {
          productDetails: 0, // Exclude the productDetails field if you don't need it
        },
      },
    ];
    if (Object.keys(matchConditions).length > 0) {
      let matchData = {
        $match: matchConditions,
      };
      pipeline.push(matchData);
    }
    if (Object.keys(sortConditions).length > 0) {
      console.log(sortConditions);
      let sortData = {
        $sort: sortConditions,
      };
      pipeline.push(sortData);
    }
    let order = await orderModel.aggregate(pipeline);
    return res
      .status(200)
      .json({ success: true, message: "Order Filter", data: order });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
