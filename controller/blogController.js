const blogModel = require("../model/blogModel");
const fs = require("fs");

//========================  Create blog  ========================//

exports.createBlog = async (req, res) => {
  try {
    let { title, discription, subtitle } = req.body;
    let image = req.file ? req.file.path : null;
    if (!title) {
      return res
        .status(400)
        .json({ success: false, message: "Title is required" });
    }
    if (!discription) {
      return res
        .status(400)
        .json({ success: false, message: "Discription is required" });
    }
    if (!subtitle) {
      return res
        .status(400)
        .json({ success: false, message: "Subtitle is required" });
    }
    if (!image) {
      return res
        .status(400)
        .json({ success: false, message: "Image is required" });
    }
    let blog = await blogModel.create({
      title: title,
      discription: discription,
      subtitle: subtitle,
      image: image,
    });
    return res
      .status(201)
      .json({ success: true, message: "Create blog", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all blog  ========================//

exports.getAllBlog = async (req, res) => {
  try {
    let page = req.query.page || 0;
    let blogPerPage = 20;
    let blog = await blogModel
      .find()
      .skip(page * blogPerPage)
      .limit(blogPerPage);
    if (req.query.adminId) {
      let check = await blogModel.find();
      return res
        .status(200)
        .json({ success: true, message: "Get all by admin", data: check });
    }
    if (!blog.length) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found" });
    }
    return res
      .status(200)
      .json({ success: true, message: "Get all blog", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by blogId  ========================//

exports.getByBlogId = async (req, res) => {
  try {
    let blog = req.blogId;
    return res
      .status(200)
      .json({ success: true, message: "Get by blogId", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update blog  ========================//

exports.updateBlog = async (req, res) => {
  try {
    let blogId = req.blogId;
    let { title, discription, subtitle } = req.body;
    let image = req.file ? req.file.path : null;
    // console.log(blogId);
    if (image && blogId.image != null) {
      await fs.unlink(blogId.image, (err) => {
        if (err) {
          console.log(err.message);
        }
      });
    }
    let blog = await blogModel.findByIdAndUpdate(
      { _id: blogId._id },
      {
        $set: {
          title: title,
          discription: discription,
          subtitle: subtitle,
          image: image ? image : blogId.image,
        },
      },
      { new: true }
    );
    return res
      .status(200)
      .json({ success: true, message: "Blog Update Successful", data: blog });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  blog disable  ========================//

exports.disableBlog = async (req, res) => {
  try {
    let blogId = req.blogId;
    let blog = await blogModel.findByIdAndUpdate(
      { _id: blogId._id },
      {
        $set: {
          disable: !blogId.disable,
        },
      },
      { new: true }
    );
    if (blog.disable) {
      return res
        .status(200)
        .json({ success: true, message: "Blog is Disable" });
    } else {
      return res.status(200).json({ success: true, message: "Blog is Enable" });
    }
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
