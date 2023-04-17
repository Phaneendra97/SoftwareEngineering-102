var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
deptList = mongoose.model("dept_list");

exports.get_dept_list = function (req, res) {
    if (req.user) {
        deptList
        .find()
        .then((depts) => {
          if (depts != null) {
            response = {
              deptList: depts,
              status: "success",
            };
            return res.json(response);
          } else {
            res.status(500);
            return res.json({
              status: "error",
              message: "no records exist",
            });
          }
        })
        .catch((error) => {
          return res.json(error);
        });
    } else {
      return res
        .status(401)
        .json({ message: "Unauthorized user!!", status: "error" });
    }
  };