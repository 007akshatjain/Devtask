const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const taskRoutes = require("./Routes/tasks");
require("dotenv").config();

const authRoutes = require("./Routes/auth");

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors({ origin: "https://your-frontend.vercel.app", credentials: true }));
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

// Root test route (optional)
app.get("/", (req, res) => {
  res.send("DevTasks API running");
});

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err.message);
  });
