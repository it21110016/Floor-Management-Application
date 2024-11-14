const express = require("express");
const {
  saveLayout,
  getLayout,
  getLayouts,
} = require("../controllers/layoutController");
const router = express.Router();

router.post("/rooms", saveLayout);
router.get("/rooms", getLayouts);
router.get("/rooms/:id", getLayout);

module.exports = router;
