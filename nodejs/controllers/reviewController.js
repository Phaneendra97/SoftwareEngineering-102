var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
review = mongoose.model("review");

exports.get_review = function (req, res) {
  const { dept, coursecode } = req.query;
  if (req.user) {
    review
      .find({ dept: dept, code: coursecode })
      .then((reviews) => {
        if (reviews != null) {
          response = {
            reviews: reviews,
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
