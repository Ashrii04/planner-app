const router = require("express").Router();
const Task = require("../models/Task");

// GET all tasks
router.get("/", async (req, res) => {
  const tasks = await Task.find().sort({ order: 1 });
  res.json(tasks);
});

// ADD task
router.post("/", async (req, res) => {
  const count = await Task.countDocuments();

  const task = new Task({
    ...req.body,
    order: count
  });

  await task.save();
  res.json(task);
});

router.put("/reorder", async (req, res) => {
  const { tasks } = req.body;

  for (let i = 0; i < tasks.length; i++) {
    await Task.findByIdAndUpdate(tasks[i]._id, {
      order: i
    });
  }

  res.json("Order updated");
});

// DELETE task
router.delete("/:id", async (req, res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json("Deleted");
});

module.exports = router;