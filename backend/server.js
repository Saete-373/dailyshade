const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const { readdirSync } = require("fs");
const connectDB = require("./db");

dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "20mb" }));
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

readdirSync("./routes").map((route) => {
  app.use("/api", require("./routes/" + route));
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
