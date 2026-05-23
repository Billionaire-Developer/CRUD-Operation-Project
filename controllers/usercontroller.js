const User = require("../models/User");

// CREATE
exports.createUser = async (req, res) => {
  try {
    const { firstName, lastName, email, phone, country } = req.body;

    if (!firstName || !lastName || !email || !phone || !country) {
      return res.status(400).json({ message: "All fields required" });
    }

    const user = await User.create(req.body);
    res.status(201).json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json(user);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ message: "User deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};