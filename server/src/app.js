const express = require("express");
const cors = require("cors");

const app = express();

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/", routes);

// error middleware
app.use(errorHandler);

module.exports = app;