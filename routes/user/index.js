const express = require("express");
const router = express.Router();

router.use("/create_new_user", require("./create_user"));
router.use("/login_user", require("./login_user"));

module.exports = router;
