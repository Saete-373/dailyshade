const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRouter = require("./routes/UserRoute");
const gradientRouter = require("./routes/GradientRoute");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/user", userRouter);
app.use("/gradient", gradientRouter);

mongoose.connect(
  "mongodb+srv://Saete373:rnSSFGS0JSbJRhmP@ourdailyshade.mjqf4di.mongodb.net/dailyshade_db"
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
