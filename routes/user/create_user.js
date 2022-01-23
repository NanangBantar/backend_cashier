const express = require("express");
const router = express.Router();
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const { v4: uuidv4 } = require("uuid");

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
      let user = await User.findOne({
        username,
      });

      if (!user) {
        const salt = await bcryptjs.genSalt(10);
        const passwordText = await bcryptjs.hash(password, salt);

        user = new User({
          id: uuidv4(),
          username,
          password,
          passwordText,
          additional_user_data: {},
        });

        await user.save();

        return res.json({
          status: "success",
          msg: "New User Has Been Created..!",
        });
      }

      return res.json({
        status: "error",
        msg: "Username has been used..!",
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
