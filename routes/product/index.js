const express = require("express");
const router = express.Router();
const authentication = require("../authentication");

router.use("/create_product", authentication, require("./create_product"));
router.use("/delete_product", authentication, require("./delete_product"));
router.use(
  "/search_productbyname",
  authentication,
  require("./search_productbyname")
);
router.use(
  "/update_productbyname",
  authentication,
  require("./update_productbyname")
);
router.use(
  "/search_productbynameandcategory",
  authentication,
  require("./search_productbynameandcategory")
);
router.use("/all_product", authentication, require("./all_product"));
router.use(
  "/search_productbyid",
  authentication,
  require("./search_productbyid")
);
router.use(
  "/update_productbyid",
  authentication,
  require("./update_productbyid")
);

module.exports = router;
