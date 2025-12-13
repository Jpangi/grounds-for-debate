const express = require("express");
const router = express.Router();

const {
  addCoffee,
  singleCoffee,
  allCoffee,
  updateCoffee,
  deleteCoffee,
} = require("../controllers/coffeeController");

router.get("/allCoffee", allCoffee);
router.get("/:coffeeId", singleCoffee);
router.post("/addCoffee", addCoffee);
router.put("/:coffeeId", updateCoffee);
router.delete("/:coffeeId", deleteCoffee);

module.exports = router;
