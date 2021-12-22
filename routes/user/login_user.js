const express = require("express");
const bcryptjs = require("bcryptjs");
const { check, validationResult } = require("express-validator");
const router = express.Router();

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
    } catch (error) {}
  }
);

module.exports = router;
