const multer = require("multer");
const path = require("path");

//====================  Store image (multer)  ====================//

exports.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "--" + Date.now() + ".jpg");
    },
  }), 
});
 