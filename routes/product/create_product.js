const express = require("express");
const router = express.Router();
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");
const { check, validationResult } = require("express-validator");

moment().local("id");
const Product = require("../../models/Product");

router.post(
  "/",
  [
    check("category").not().isEmpty(),
    check("name").not().isEmpty(),
    check("size").not().isEmpty(),
    check("modal").isInt().not().isEmpty(),
    check("sell").isInt().not().isEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { category, name, size, modal, sell } = req.body;
      let product = await Product.findOne({
        "desc.name": name,
      });
      if (!product) {
        const getDate = moment().format("Y-M-D").split("-");
        const setDate = `${getDate[0]}-${
          getDate[1] < 10 ? `0${getDate[1]}` : getDate[1]
        }-${getDate[2]}`;
        const setTime =
          moment().format("H") < 10
            ? "0" + moment().format("H") + ":" + moment().format("mm:ss")
            : moment().format("H:mm:ss");
        product = new Product({
          id: uuidv4(),
          category,
          desc: {
            name,
            product_decs: null,
            size,
          },
          stock: {
            modal,
            sell,
            quatity: null,
          },
          user: {
            id: req.user.id,
          },
          created_at: new Date(`${setDate}T${setTime}Z`),
        });
        await product.save();
        return res.json({
          status: "success",
          msg: "New product has been added..!",
        });
      }
      return res.json({
        status: "error",
        msg: "Product already exist..!",
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
  }
);

module.exports = router;
