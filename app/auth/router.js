const express = require("express");
const { signUp, signin, signout } = require("./controller");
const router = express.Router();
const multer = require("multer");
const os = require("os");

router.post("/signup", multer({ dest: os.tmpdir() }).single("image"), signUp);
router.post("/signin", signin);
router.post("/signout", signout);

module.exports = router;
