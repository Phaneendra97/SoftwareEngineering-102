var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
deptList = mongoose.model("dept_list");
const winston = require("winston");

const logger = winston.createLogger({
  level: "info",
  format: winston.format.json(),
  transports: [
    new winston.transports.Console(),
    new winston.transports.File({ filename: "logfile.log" }),
  ],
});

exports.get_dept_list = function (req, res) {
  logger.info("Get dept list function");
  if (req.user) {
    deptList
      .find()
      .then((depts) => {
        if (depts != null) {
          logger.info("Get dept list API success");

          response = {
            deptList: depts,
            status: "success",
          };
          return res.json(response);
        } else {
          logger.info("Get dept list API failed No records exist");

          res.status(500);
          return res.json({
            status: "error",
            message: "no records exist",
          });
        }
      })
      .catch((error) => {
        logger.error("Get dept list API error ", error);

        return res.json(error);
      });
  } else {
    return res
      .status(401)
      .json({ message: "Unauthorized user!!", status: "error" });
  }
};
