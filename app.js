const express = require("express");
const app = express();
const path = require("path");
// require("dotenv").config()
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const authRoutes = require("./routes/auth");
const jobsRoutes = require("./routes/jobs");
const newsRoutes = require("./routes/news");
const userJobsRoutes = require("./routes/userJob");
const userNewsRoutes = require("./routes/userNews");
const businessCardRoutes = require("./routes/businessCard");
const userbusinessCardRoutes = require("./routes/userBusinessCard");
const { connectDB } = require("./db/connect");
const { errorHandler } = require("./middlewares/errorHandler");
const { authenticate } = require("./middlewares/authenticate");

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use("/qrs", express.static(path.join(__dirname, "qrs")));

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://demo.qualabels.com",
      "https://qualabels.com",
    ],
    // origin:"https://demo.qualabels.com",
  }),
);
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/jobs", authenticate, jobsRoutes);
app.use("/api/v1/userjobs", userJobsRoutes);
app.use("/api/v1/news", authenticate, newsRoutes);
app.use("/api/v1/businessCard", authenticate, businessCardRoutes);
app.use("/api/v1/user/businessCard", userbusinessCardRoutes);
app.use("/api/v1/usernews", userNewsRoutes);

app.get("/", (req, res) => {
  res.send("jobs api");
});

// app.use(errorHandler)
const start = async () => {
  await connectDB(process.env.MONGO_URI);
  app.listen(PORT, console.log(`server is listening on port ${PORT}..`));
};

start();
