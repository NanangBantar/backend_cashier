const express = require("express");
const router = express.Router();
const { produce } = require("immer");
const { check, validationResult } = require("express-validator");

const Product = require("../../models/Product");

router.post("/", [check("id").not().isEmpty()], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const id = req.body.id;
    let product = await Product.findOne({
      id,
    });
    if (product) {
      const { category, name, product_decs, size, modal, sell, quatity } =
        req.body;
      product = [product];
      const nextState = produce(product, (draft) => {
        draft[0].category = category;
        draft[0].desc.name = name;
        draft[0].desc.product_decs = product_decs;
        draft[0].desc.size = size;
        draft[0].stock.modal = modal;
        draft[0].stock.sell = sell;
        draft[0].stock.quatity = quatity;
      });
      await Product.findOneAndUpdate(
        {
          id,
        },
        {
          $set: nextState[0],
        }
      );
      return res.json({
        msg: "Product successfully updated..!",
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
