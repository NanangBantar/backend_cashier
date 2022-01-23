const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.find({ id });
    if (product.length !== 0) {
      return res.json(product);
    }
    return res.json({
      msg: "Product doesn't exist..!",
    });
  } catch (error) {
    return res.json({
      errors: [
        {
          msg: "Server Error",
        },
      ],
    });
  }
});

module.exports = router;
