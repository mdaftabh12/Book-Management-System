const mongoose = require("mongoose");

//====================  Mactimonial model  ==================//

const tactimonialSchema = new mongoose.Schema( 
  {
    image: String,
    rating: Number,
    description: String,
    name: String,
    disable: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("tactimonialModel", tactimonialSchema);
