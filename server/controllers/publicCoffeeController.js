const CoffeeBean = require("../models/CoffeeBean");

const topRated = async (req, res) => {
  try {
    const topRatedBeans = await CoffeeBean.aggregate([
      // STAGE 1: $group
      //Groups all documents with the same name together and calculates stats:
      {
        $group: {
          _id: "$name", // Group documents by the 'name' field
          averageRating: { $avg: "$rating" }, // Calculate average
          totalRatings: { $sum: 1 }, // Count documents
          averagePrice: { $avg: "$price" },
          flavor_profile: { $first: "$flavor_profile" },
          roast: { $first: "$roast" },
        },
      },
      // STAGE 2: $sort Sorts the grouped results: -1 means descending (highest first)
      { $sort: { averageRating: -1 } },

      // STAGE 3: $limit Takes only the first 5 results:
      { $limit: 5 },
    ]);
    res.status(200).json(topRatedBeans);
  } catch (error) {
    res.status(400).json({ message: "could not grab top rated", error: error });
  }
};

module.exports = { topRated };
