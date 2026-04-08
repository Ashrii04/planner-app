const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/tasks", require("./routes/taskRoutes"));
app.use("/auth", require("./routes/authRoutes"));

// Connect MongoDB
mongoose.connect("mongodb://127.0.0.1:27017/planner")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});