const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const categoryRoute = require("./route/categoryRoute");
const languageRoute = require("./route/languageRoute");
const addressRoute = require("./route/addressRoute");
const productRoute = require("./route/productRoute");
const termAndConditionRoute = require("./route/termAndConditionRoute");
const returnPolicyRoute = require("./route/returnPolicyRoute");
const supportPolicyRoute = require("./route/supportPolicyRoute");
const privacyPolicyRoute = require("./route/privacyPolicyRoute");
const cartRoute = require("./route/cartRoute");
const orderRoute = require("./route/orderRoute");
const wishListRoute = require("./route/wishListRoute");
const reviewRoute = require("./route/reviewRoute");
const couponRoute = require("./route/couponRoute");
const blogRoute = require("./route/blogRoute");
const membershipRoute = require("./route/membershipRoute");
const tactimonialRoute = require("./route/tactimonialRoute");
const priceRangeRoute = require("./route/priceRangeRoute");
const contactUsRoute = require("./route/contactUsRoute");
const setTimeRoute = require("./route/setTimeRoute");

mongoose
  .connect("mongodb://0.0.0.0:27017/Book-Managment")
  .then(() => {
    console.log("connected");
  })
  .catch((error) => {
    console.log(error.message);
  });

const port = process.env.PORT;
const app = express();
app.use(express.json());
app.use(cors());
app.use("/images", express.static("images"));

app.use("/api/user", userRoute);
app.use("/api/category", categoryRoute);
app.use("/api/language", languageRoute);
app.use("/api/language", languageRoute);
app.use("/api/address", addressRoute);
app.use("/api/product", productRoute);
app.use("/api/termAndCondition", termAndConditionRoute);
app.use("/api/returnPolicy", returnPolicyRoute);
app.use("/api/supportPolicy", supportPolicyRoute);
app.use("/api/privacyPolicy", privacyPolicyRoute);
app.use("/api/cart", cartRoute);
app.use("/api/order", orderRoute);
app.use("/api/wishList", wishListRoute);
app.use("/api/review", reviewRoute);
app.use("/api/coupon", couponRoute);
app.use("/api/blog", blogRoute);
app.use("/api/membership", membershipRoute);
app.use("/api/tactimonial", tactimonialRoute);
app.use("/api/priceRange", priceRangeRoute);
app.use("/api/contactUs", contactUsRoute);
app.use("/api/setTimeRoute", setTimeRoute);

app.listen(port, () => {
  console.log(`Server started at PORT: ${port}`);
});
