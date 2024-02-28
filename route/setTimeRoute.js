const setTime = require("../controller/setTime");
const express = require("express");
const router = express.Router();

router.get("/setTimeOutFun", setTime.setTimeOutFun);

module.exports = router;
