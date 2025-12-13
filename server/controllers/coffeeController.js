const CoffeeBean = require("../models/CoffeeBean");

// function to add a coffee bean
const addCoffee = async (req, res) => {
  try {
    const coffeeBean = await CoffeeBean.create({
      ...req.body, //  Spreads all the body data
      user: req.user._id, // add user from JWT
    });

    res.status(201).json({ message: "Coffee bean created", coffeeBean });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Error adding Coffee bean", error: error.messsage });
  }
};
// function to get all the coffee beans
const allCoffee = async (req, res) => {
  try {
    const coffee = await CoffeeBean.find({ user: req.user._id });
    res.status(200).json(coffee);
  } catch (error) {
    res.status(400).json({ message: "Can't find Coffee Beans", error });
  }
};
//function that grabs a specific coffeeBean
const singleCoffee = async (req, res) => {
  try {
    const foundCoffee = await CoffeeBean.findById(req.params.coffeeId);
    if (!foundCoffee)
      return res.status(400).json({ error: "Coffee Bean NOT found" });
    res.status(200).json(foundCoffee);
  } catch (error) {
    res.status(400), json({ message: "error finding coffee bean", error });
  }
};

//function to update a coffee bean
const updateCoffee = async (req, res) => {
  try {
    const editCoffee = await CoffeeBean.findByIdAndUpdate(
      req.params.coffeeId,
      req.body
    );
    res.status(200).json(editCoffee);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
//function to delete a coffee bean
const deleteCoffee = async (req, res) => {
  try {
    const deleteCoffee = await CoffeeBean.findByIdAndDelete(
      req.params.coffeeId,
      req.body
    );
    res.status(200).json(deleteCoffee);
  } catch (error) {
    res.status(400).json({ error: error });
  }
};
module.exports = {
  allCoffee,
  addCoffee,
  singleCoffee,
  updateCoffee,
  deleteCoffee,
};
