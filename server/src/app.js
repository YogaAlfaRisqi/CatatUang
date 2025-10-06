const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const dotenv = require('dotenv');
dotenv.config();
// const errorHandler = require('./api/v1/middlewares/errorHandler');
// const errorConverter = require('./api/v1/middlewares/errorConverter');
const api = require("./api/v1/routes/index.routes");
const app = express();

app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1", api);


// Error handling
// app.use(errorHandler)
// app.use(errorConverter);

module.exports = app;
