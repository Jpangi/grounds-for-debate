const express = require("express");
const router = express.Router();

const { topRated } = require("../controllers/publicCoffeeController");

router.get("/topRated", topRated);
module.exports = router;
