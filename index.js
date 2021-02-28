const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const folder = require("./routes/folder");
const file = require("./routes/file");
const common = require("./routes/common");
const cors = require("cors");

require("dotenv").config();

//Middleware
app.use(cors());
app.use(bodyParser.json());

//DB Connection
mongoose.connect(process.env.LOCAL_DB_URL, {
  useNewUrlParser: true,
});
const connection = mongoose.connection;

connection.once("open", function () {
  console.log("MongoDB database connection established successfully");
});

//Routes
app.use("/folder", folder);
app.use("/file", file);
app.use("/common", common)

app.listen(process.env.PORT, function () {
  console.log("Server is running on Port: " + process.env.PORT);
});
