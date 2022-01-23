const express = require("express");
const router = express.Router();

const Product = require("../../models/Product");

router.get("/", async (req, res) => {
  try {
    const product = await Product.find().sort({ created_at: -1 });
    return res.json(product);
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
