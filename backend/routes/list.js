/** @format */

const router = require("express").Router();
const User = require("../models/user");
const List = require("../models/list");

// ADD TASK
router.post("/addTask", async (req, res) => {
  console.log("🔥 /addTask hit", req.body);
  try {
    const { title, body, email } = req.body;
    console.log("Searching for user:", email);
    const existingUser = await User.findOne({ email });
    console.log("existingUser:", existingUser);

    if (!existingUser) {
      console.log("❌ No such user");
      return res.status(400).json({ message: "Please SignUp" });
    }

    const list = new List({ title, body, user: existingUser });
    await list.save();
    console.log("✅ List saved:", list._id);

    existingUser.list.push(list);
    await existingUser.save();
    console.log("✅ User updated with list");

    return res.status(200).json({ message: "Task saved", list });
  } catch (error) {
    console.error("💥 Error in /addTask:", error);
    return res.status(500).json({ message: "Something went wrong" });
  }
});

// UPDATE TASK
router.put("/updateTask/:id", async (req, res) => {
  try {
    const { title, body } = req.body;
    const updated = await List.findByIdAndUpdate(
      req.params.id,
      { title, body },
      { new: true }
    );
    res.status(200).json({ message: "Task updated", updated });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Update failed" });
  }
});


// DELETE TASK
router.delete("/deleteTask/:id", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOneAndUpdate(
      { email },
      { $pull: { list: req.params.id } }
    );

    if (user) {
      await List.findByIdAndDelete(req.params.id);
      return res.status(200).json({ message: "Task deleted successfully" });
    } else {
      return res.status(404).json({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error while deleting task" });
  }
});

// GET TASKS
router.get("/getTask/:id", async (req, res) => {
  try {
    const list = await List.find({ user: req.params.id }).sort({
      createdAt: -1,
    });

    if (list.length === 0) {
      return res.status(200).json({ message: "No Tasks", list: [] });
    }

    res.status(200).json({ list });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
