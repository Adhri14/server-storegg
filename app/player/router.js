const express = require("express");
const {
  landingPage,
  detailPage,
  category,
  checkout,
  history,
  historyDetail,
  dashboard,
  profile,
  updateProfile,
} = require("./controller");
const router = express.Router();
const { isLoginPlayer } = require("../middleware/auth");
const multer = require("multer");
const os = require("os");

router.get("/landingPage", landingPage);
router.get("/:id/detailPage", detailPage);
router.get("/category", category);
router.post("/checkout", isLoginPlayer, checkout);
router.get("/history", isLoginPlayer, history);
router.get("/historyDetail/:id", isLoginPlayer, historyDetail);
router.get("/dashboard", isLoginPlayer, dashboard);
router.get("/profile", isLoginPlayer, profile);
router.put(
  "/update-profile",
  isLoginPlayer,
  multer({ dest: os.tmpdir() }).single("image"),
  updateProfile
);

module.exports = router;
