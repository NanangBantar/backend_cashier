const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../../models/Product");

router.post("/", [check("category").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { category } = req.body;
    let product = await Product.find({
      category: { $regex: category, $options: "i" },
    });
    if (product.length !== 0) {
      return res.json(product);
    }
    return res.json({
      msg: "Category doesn't exist..!",
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
