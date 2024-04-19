const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/UserRoute");

const app = express();
app.use(express.json());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST"],
    credentials: true,
  })
);

app.use("/api", userRouter);

mongoose.connect(
  "mongodb+srv://Saete373:rnSSFGS0JSbJRhmP@ourdailyshade.mjqf4di.mongodb.net/dailyshade_db"
);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
