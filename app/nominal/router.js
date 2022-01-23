var express = require("express");
var router = express.Router();
const {
  index,
  viewCreate,
  actionCreate,
  actionDelete,
  viewEdit,
  actionEdit,
} = require("./controller");

router.get("/", index);
router.get("/create", viewCreate);
router.post("/create", actionCreate);
router.delete("/delete/:id", actionDelete);
router.get("/edit/:id", viewEdit);
router.put("/edit/:id", actionEdit);

module.exports = router;
