const Task = require("../models/Task");

// CREATE
exports.createTask = async (req, res) => {
  try {
    const { title, description, priority, dueDate, assignedTo, category } = req.body;

    if (!title || !description || !priority || !dueDate || !assignedTo || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const task = await Task.create(req.body);
    res.status(201).json(task);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET ALL
exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
exports.updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json(task);

  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// DELETE
exports.deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};