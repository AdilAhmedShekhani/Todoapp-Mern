const mongoose = require("mongoose");

const conn = async () => {
    try {
        await mongoose.connect("mongodb+srv://user:Adil%40345@user.kt7eepx.mongodb.net/?retryWrites=true&w=majority&appName=user")
    console.log("✅ MongoDB Connected Successfully");
    } catch (error) {
        console.error("❌ MongoDB Connection Failed:", error.message);
    }
};

conn();
