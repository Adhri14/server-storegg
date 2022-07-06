const express = require("express");
const router = express.Router();

const { isLoginAdmin } = require("../middleware/auth");
const { index, actionApproved, actionRejected } = require("./controller");

router.use(isLoginAdmin);
router.get("/", index);
router.put("/approved/:id", actionApproved);
router.put("/rejected/:id", actionRejected);

module.exports = router;
