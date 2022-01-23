const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let product = await Product.findOne({
      id,
    });
    if (product) {
      await Product.findOneAndDelete({
        id,
      });
      return res.json({
        msg: "Product successfully removed..!",
      });
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
