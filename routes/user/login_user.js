const express = require("express");
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const { check, validationResult } = require("express-validator");
const router = express.Router();

dotenv.config();
const User = require("../../models/User");

router.post(
  "/",
  [check("username").not().isEmpty(), check("password").not().isEmpty()],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        username,
      });
      if (user) {
        const isMatch = await bcryptjs.compare(password, user.passwordText);
        if (isMatch) {
          const payload = {
            id: user.id,
            username,
          };
          const token = jwt.sign(payload, process.env.ACCESS_TOKEN);
          return res.json({
            token,
            status: "success",
            msg: "Successfully logged in..!",
          });
        }
        return res.json({
          status: "failed",
          msg: "Wrong password or username..!",
        });
      }
      return res.json({
        status: "failed",
        msg: "Account doesnt exist..!",
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
