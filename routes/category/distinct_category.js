const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/", async (req, res) => {
  try {
    const result = [];
    const product = await Product.find().sort({ created_at: -1 });
    product.forEach((_) => {
      result.push(_.category);
    });
    return res.json([...new Set(result)]);
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
