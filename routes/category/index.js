const express = require("express");
const router = express.Router();
const authentication = require("../authentication");

router.use(
  "/search_bycategory",
  authentication,
  require("./search_bycategory")
);
router.use(
  "/distinct_category",
  authentication,
  require("./distinct_category")
);

module.exports = router;
