const express = require("express");
const cors = require("cors");
const app = express();

require("./connection/connection");

const authRoutes = require("./routes/auth");
const listRoutes = require("./routes/list"); // ✅ Import your task routes here

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/v1", authRoutes);  // Signin/Register
app.use("/api/v2", listRoutes);  // Todo routes

app.listen(5000, () => {
  console.log("Server is running on port 5000");
});
