const mongoose = require("mongoose");

const ProductSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      require: true,
    },
    category: {
      type: String,
      require: true,
    },
    desc: {
      name: {
        type: String,
        require: true,
      },
      product_decs: {
        type: String,
      },
      size: {
        type: String,
        require: true,
      },
    },
    stock: {
      modal: {
        type: Number,
        require: true,
      },
      sell: {
        type: Number,
        require: true,
      },
      quatity: {
        type: Number,
      },
    },
    user: {
      id: {
        type: String,
        require: true,
      },
    },
    created_at: {
      type: Date,
      require: true,
    },
  },
  { minimize: false }
);

module.exports = Product = mongoose.model("product", ProductSchema);
