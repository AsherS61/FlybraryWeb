const express = require("express");
const { checkReturn } = require("../controllers/cron.js");
const router = express.Router();

router.get('/check-return', checkReturn)

module.exports = router;