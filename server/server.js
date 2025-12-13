// =======================
// ======= IMPORTS =======
// =======================
const dotenv = require("dotenv");
dotenv.config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const userRoutes = require("./routes/userRoutes");
const requireAuth = require("./middleware/authMiddleware"); //protects routes
const coffeeBeanRoutes = require("./routes/coffeeBeanRoutes");

// ===========================
// ======== MIDDLEWARE =======
// ===========================
app.use(express.json());

app.use("/users", userRoutes);
app.use("/coffee", requireAuth, coffeeBeanRoutes);

// ===========================
// ====== DB CONNECTION ======
// ===========================
mongoose.connect(process.env.MONGODB_URI);
mongoose.connection.on("connected", () => {
  console.log(`Connected to MongoDB ${mongoose.connection.name}`);
});

let PORT = process.env.PORT;

app.listen(process.env.PORT, () => {
  console.log(`Listening on PORT ${PORT}`);
});
