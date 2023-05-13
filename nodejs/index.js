var express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  User = require("./models/userModel"),
  CourseList = require("./models/courseModel"),
  DeptList = require("./models/deptModel"),
  Review = require("./models/reviewModel"),
  bodyParser = require("body-parser"),
  jsonwebtoken = require("jsonwebtoken");
  const winston = require('winston');

  const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'logfile.log' })
    ]
  });

const mongoose = require("mongoose");
const option = {
  socketTimeoutMS: 30000,
  keepAlive: true,
};

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});

const mongoURI = process.env.MONGODB_URI;
mongoose.connect("mongodb://localhost:27017/se102", option).then(
  function () {
    logger.info("connected successfully to DB");
    //connected successfully
  },
  function (err) {
    logger.error("DB connection failed");
    logger.error(err);

    //err handle
  }
);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === "JWT"
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      "RESTFULAPIs",
      function (err, decode) {
        if (err) req.user = undefined;
        req.user = decode;
        next();
      }
    );
  } else {
    req.user = undefined;
    next();
  }
});
var routes = require("./route/userRoute");
routes(app);

// app.use(function(req, res) {
//   res.status(404).send({ url: req.originalUrl + ' not found' })
// });
logger.info("Server Initialized");
app.listen(port);

logger.info(" RESTful API server started on: " + port);

module.exports = app;
