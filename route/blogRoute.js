const blogController = require("../controller/blogController");
const { getByBlogId } = require("../middleware/blogMidd");
const { upload } = require("../middleware/multerMiddleware");
const { auth } = require("../middleware/authMidd");
const express = require("express");
const router = express.Router();

//==================  Blog route  =====================//

router.post("/createBlog", upload.single("image"), blogController.createBlog);
router.get("/getAllBlog",auth, blogController.getAllBlog);
router.get("/getByBlogId/:blogId", getByBlogId, blogController.getByBlogId);
router.put(
  "/updateBlog/:blogId",
  getByBlogId,
  upload.single("image"),
  blogController.updateBlog
);
router.put("/disableBlog/:blogId", getByBlogId, blogController.disableBlog)

module.exports = router;
