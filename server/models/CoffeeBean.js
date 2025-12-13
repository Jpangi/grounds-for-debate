const mongoose = require("mongoose");

const CoffeeBeanSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
    enum: [
      "Counter Culture Coffee",
      "Intelligentsia Coffee",
      "Blue Bottle Coffee",
      "Stumptown Coffee Roasters",
      "Verve Coffee Roasters",
      "Onyx Coffee Lab",
      "Heart Coffee Roasters",
      "Irving Farm Coffee Roasters",
      "Paradise Roasters",
      "Bird Rock Coffee Roasters",
      "Novo Coffee",
      "Devoción",
      "Ritual Coffee Roasters",
      "Madcap Coffee",
      "JBC Coffee Roasters",
      "Temple Coffee",
      "La Colombe",
      "Philz Coffee",
      "Starbucks",
      "Peet's Coffee",
    ],
  },
  description: {
    required: true,
    type: String,
  },
  price: {
    required: true,
    type: Number,
  },
  region: {
    required: true,
    type: String,
    enum: ["Africa", "Asia", "Central America", "South America", "Caribbean"], // Only these values allowed
  },
  weight: {
    required: true,
    type: Number,
  },
  flavor_profile: {
    required: true,
    type: String,
    enum: ["Fruity", "Nutty", "Chocolatey", "Floral", "Spicy", "Earthy"], // Dropdown options
  },
  roast: {
    required: true,
    type: String,
    enum: ["Light", "Medium", "Medium-Dark", "Dark"], // Roast levels
  },
  rating: {
    required: true,
    type: Number,
    enum: [1, 2, 3, 4, 5],
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const CoffeeBean = mongoose.model("coffeeBean", CoffeeBeanSchema);

module.exports = CoffeeBean;
