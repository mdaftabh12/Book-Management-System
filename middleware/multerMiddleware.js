const multer = require("multer");

//====================  Store image (multer)  ====================//

exports.upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "images");
    },
    filename: function (req, file, cb) {
      let exe =  file.originalname.slice(file.originalname.lastIndexOf('.'));
      cb(null, Date.now() + exe);
    },
  }), 
});
 