const express = require("express");
const cors = require("cors");

const app = express();

const routes = require("./routes");
const errorHandler = require("./middlewares/error.middleware");

const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./docs/swagger");

// middleware
app.use(cors());
app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// routes
app.use("/", routes);

// error middleware
app.use(errorHandler);

module.exports = app;