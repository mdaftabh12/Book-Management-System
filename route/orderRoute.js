const orderController = require("../controller/orderController");
const { getByOrderId } = require("../middleware/orderMiddleware");
const { dateWiseFilter } = require("../middleware/dateWiseFilterMiddleware");
const { couponApply } = require("../middleware/couponApplyMiddleware");
const { auth } = require("../middleware/authMidd");
const expree = require("express");
const router = expree.Router();

//==================  Order route  =====================//

router.post("/createOrder/:userId", couponApply, orderController.createOrder);
router.put("/updateOrder/:orderId", getByOrderId, orderController.updateOrder);
router.get(
  "/getOrderByOrderId/:orderId",
  getByOrderId,
  orderController.getOrderByOrderId
);
router.get("/getOrderByUserId/:userId", orderController.getOrderByUserId);
router.put(
  "/statusUpdate/:orderId",
  getByOrderId,
  orderController.statusUpdate
);
router.get("/getAllOrder", dateWiseFilter, auth, orderController.getAllOrder);
router.get("/dashboardCount", orderController.dashboardCount);
router.get("/orderFilter", orderController.orderFilter);

module.exports = router;
