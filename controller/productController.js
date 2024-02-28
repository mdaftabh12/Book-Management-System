const productModel = require("../model/productModel");

//========================  Create product  ========================//

exports.createProduct = async (req, res) => {
  try {
    let {
      name,
      categoryId,
      price,
      stock,
      sold,
      productUniqueId,
      discription,
      authorName,
      edition,
      languageId,
      publishDate,
    } = req.body;
    let file = req.files ? req.files : null;
    if (!name) {
      return res
        .status(400)
        .json({ success: false, message: "Name is required" });
    }
    if (!categoryId) {
      return res
        .status(400)
        .json({ success: false, message: "Category ID is required" });
    }
    if (!price) {
      return res
        .status(400)
        .json({ success: false, message: "Price is required" });
    }
    if (!stock) {
      return res
        .status(400)
        .json({ success: false, message: "Stock is required" });
    }
    if (!productUniqueId) {
      return res
        .status(400)
        .json({ success: false, message: "Product unique ID is required" });
    }
    if (!discription) {
      return res
        .status(400)
        .json({ success: false, message: "Description is required" });
    }
    if (!authorName) {
      return res
        .status(400)
        .json({ success: false, message: "Author name is required" });
    }
    if (!edition) {
      return res
        .status(400)
        .json({ success: false, message: "Edition is required" });
    }
    if (!languageId) {
      return res
        .status(400)
        .json({ success: false, message: "Language ID is required" });
    }
    if (!publishDate) {
      return res
        .status(400)
        .json({ success: false, message: "Publish date is required" });
    }
    let image = file && file.image ? file.image[0].path : null;
    let pictures =
      file && file.pictures ? file.pictures.map((o) => o.path) : [];
    let book = await productModel.create({
      name: name,
      image: image,
      pictures: pictures,
      price: price,
      stock: stock,
      productUniqueId: productUniqueId,
      discription: discription,
      authorName: authorName,
      edition: edition,
      languageId: languageId,
      publishDate: publishDate,
      categoryId: categoryId,
      sold: sold,
    });
    return res.status(201).json({
      success: true,
      message: "Product added successfully.",
      data: book,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get all product  ========================//

exports.getAllProduct = async (req, res) => {
  try {
    const { search } = req.query;
    const regexSearch = new RegExp(search, "i");

    const products = await productModel.find({
      disable: false,
      name: regexSearch,
    });

    if (products.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No products found" });
    }

    if (req.query.adminId) {
      const allProducts = await productModel.find();
      return res.status(200).json({
        success: true,
        message: "All products retrieved by admin",
        data: allProducts,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Products retrieved successfully",
      data: products,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Get by productId   ========================//

exports.getByProductId = async (req, res) => {
  try {
    const product = req.product;
    return res.status(200).json({
      success: true,
      message: "Product retrieved successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Update product  ========================//

exports.updateProduct = async (req, res) => {
  try {
    let product = req.product;
    let {
      name,
      categoryId,
      price,
      stock,
      sold,
      productUniqueId,
      discription,
      authorName,
      edition,
      languageId,
      publishDate,
    } = req.body;
    let file = req.files ? req.files : null;
    let image = file && file.image ? file.image[0].path : null;
    let pictures =
      file && file.pictures ? file.pictures.map((o) => o.path) : [];
    let updatedProduct = await productModel.findByIdAndUpdate(
      { _id: product._id },
      {
        $set: {
          name: name,
          categoryId: categoryId,
          price: price,
          stock: stock,
          sold: sold,
          productUniqueId: productUniqueId,
          discription: discription,
          authorName: authorName,
          edition: edition,
          languageId: languageId,
          publishDate: publishDate,
          image: image,
          pictures: pictures,
        },
      },
      { new: true }
    );
    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Product filter  ========================//

exports.productFilter = async (req, res) => {
  try {
    let check = await productModel.find();
    let { name, categoryId, languageId, edition, date } = req.body;
    let obj1 = {};
    let obj2 = {};
    let page = req.query.page || 0;
    let productPerPage = 10;
    if (name) {
      obj1.name = name;
    }
    if (categoryId) {
      obj1.categoryId = categoryId;
    }
    if (languageId) {
      obj1.languageId = languageId;
    }
    if (edition) {
      obj1.edition = edition;
    }
    let obj3 = req.date;
    // if (date) {
    //   if (date == "year") {
    //     //////////////////  Year  ///////////////////////////
    //     obj3 = {
    //       createdAt: {
    //         $gte: new Date(
    //           new Date().getFullYear(),
    //           new Date().getMonth() - new Date().getMonth(),
    //           new Date().getDate() + 1 - new Date().getDate()
    //         ),
    //         $lte: new Date(),
    //       },
    //     };

    //   } else if (date == "month") {
    //     /////////////////////  Month  /////////////////

    //     obj3 = {
    //       createdAt: {
    //         $gte: new Date(new Date().getFullYear(), new Date().getMonth()),
    //         $lte: new Date(),
    //       },
    //     };

    //   } else if (date == "week") {
    //     /////////////////////  Week  ////////////////////////////

    //     let week = Math.floor(new Date().getDate() / 7) * 7 - 1;
    //     // console.log(week);
    //      obj3 = {
    //       createdAt: {
    //         $gte: new Date().setDate(week),
    //         $lte: new Date().getTime(),
    //       },
    //     };
    //   } else {
    //     //////////////////  Today  /////////////////////
    //     obj3 = {
    //       createdAt: {
    //         $gte: new Date(
    //           new Date().getFullYear(),
    //           new Date().getMonth(),
    //           new Date().getDate()
    //         ),
    //         $lte: new Date(),
    //       },
    //     };

    //   }
    // }
    // console.log(obj3);
    let arr = [];
    if (Object.keys(obj1).length > 0) {
      arr.push(obj1);
    }
    if (Object.keys(obj3).length > 0) {
      arr.push(obj3);
    }
    let obj4 = {};
    if (arr.length > 0) {
      obj4 = { $and: arr };
    }

    if (req.query.price) {
      if (
        req.query.price !== "high_to_low" &&
        req.query.price !== "low_to_high"
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Valid values for price sorting are 'high_to_low' and 'low_to_high'",
        });
      }
      if (req.query.price == "high_to_low") {
        obj2.price = -1;
      }
      if (req.query.price == "low_to_high") {
        obj2.price = 1;
      }
    }

    let product = await productModel
      .find(obj4)
      .skip(page * productPerPage)
      .limit(productPerPage)
      .sort(obj2);
    if (!product.length) {
      return res.status(404).json({
        success: false,
        message: "No products found matching the criteria.",
      });
    }
    return res.status(200).json({
      success: true,
      message: "Filtered products retrieved successfully.",
      data: product,
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

//========================  Disable Product   ========================//

exports.productDisable = async (req, res) => {
  try {
    let check = req.product;
    let data = await productModel.findByIdAndUpdate(
      { _id: check._id },
      { $set: { disable: !check.disable } },
      { new: true }
    );
    const action = updatedProduct.disable ? "disabled" : "enabled";
    const message = `Product has been ${action} successfully.`;

    return res.status(200).json({ success: true, message });
  } catch (error) {
    return res.status(500).send({ success: false, message: error.message });
  }
};
