var express = require("express");
var router = express.Router();
const { viewSignIn, actionSignIn, actionLogout } = require("./controller");

router.get("/", viewSignIn);
router.post("/", actionSignIn);
router.post("/logout", actionLogout);
module.exports = router;
