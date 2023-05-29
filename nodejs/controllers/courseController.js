var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
const winston = require("winston");

courseList = mongoose.model("course_list");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

exports.get_course_list_by_dept = function (req, res) {
  logger.info("Get Course list By Dept function");
  if (req.user) {
    const userEmail = req.user["email"];
    const { dept } = req.query;
    courseList
      .find({ dept: dept })
      .then((courses) => {
        if (courses != null) {
          logger.info("Get Course list By Dept API success", req.user);
          response = {
            courseList: courses,
            status: "success",
          };
          return res.json(response);
        } else {
          logger.error(
            "Get Course list By Dept API failed ",
            "no records found",
            req.user
          );
          res.status(500);
          return res.json({
            status: "error",
            message: "no records exist",
          });
        }
      })
      .catch((error) => {
        logger.error("Get Course list By Dept API failed ", error, req.user);
        return res.json(error);
      });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
};
