const express = require("express");
const {
  index,
  viewCreate,
  actionCreate,
  actionDelete,
  viewEdit,
} = require("./controller");
const router = express.Router();
const multer = require("multer");
const os = require("os");

router.get("/", index);
router.get("/create", viewCreate);
router.post(
  "/create",
  multer({ dest: os.tmpdir() }).single("image"),
  actionCreate
);
router.delete("/delete/:id", actionDelete);
router.get("/edit/:id", viewEdit);

module.exports = router;
