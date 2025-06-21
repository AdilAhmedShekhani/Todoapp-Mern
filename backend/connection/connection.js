/** @format */

const mongoose = require("mongoose");

const connection = async (res, req) => {
  try {
    await mongoose
      .connect(
        "mongodb+srv://user:Adil%40345@user.kt7eepx.mongodb.net/?retryWrites=true&w=majority&appName=user"
      )
      .then(() => {
        console.log("Connected to MongoDB successfully");
      });
  } catch (error) {
    res.status(500).json({
      message: "not connected to MongoDB",
    });
  }
};
connection();
