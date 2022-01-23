const express = require("express");
const router = express.Router();
const { check, validationResult } = require("express-validator");

const Product = require("../../models/Product");

router.post("/", async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const { name, category, id } = req.body;
    // return res.json(req.body);
    let product = await Product.find({
      $or: [
        {
          "desc.name": {
            $regex: name.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            $options: "i",
          },
          category: {
            $regex: category.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
            $options: "i",
          },
        },
      ],
    }).sort({ created_at: -1 });

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
