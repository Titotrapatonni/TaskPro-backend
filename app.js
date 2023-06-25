const express = require("express");
const logger = require("morgan");
const cors = require("cors");
require("dotenv").config();

const authRouter = require("./routes/api/authRoutes");
const taskRouter = require("./routes/api/tasksRouter");
const helperRouter = require("./routes/api/helpRouter");
const backgroundRouter = require("./routes/api/backgroundRouter");

const app = express();

const formatsLogger = app.get("env") === "development" ? "dev" : "short";

app.use(logger(formatsLogger));
app.use(cors());
app.use(express.json());

app.use("/users", authRouter);
app.use("/api/help", helperRouter);
app.use("/api/tasks", taskRouter);
app.use("/api/backgrounds", backgroundRouter);

app.use((_, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((err, _, res, __) => {
  const { status = 500, message = "Server error" } = err;
  res.status(status).json({ message });
});

module.exports = app;
