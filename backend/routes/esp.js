const express = require("express");
const { getTemperature, postTemperature } = require("../controllers/esp.js");
const router = express.Router();

router.get('/latestTemperature', getTemperature)
router.post('/postTemperature', postTemperature)

module.exports = router;