var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
User = mongoose.model("User");

exports.register = function (req, res) {
  console.log("@here", req.body);
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  console.log("@here2", newUser);
  User.findOne({ email: newUser.email })
    .then((user) => {
      if (user == null) {
        newUser
          .save()
          .then((savedUser) => {
            return res.json(savedUser);
          })
          .catch((error) => {
            return res.json(error);
          });
      } else {
        res.status(400);
        return res.json({
          accountExists: true,
          message: "user already exisits, try logging in",
        });
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

exports.sign_in = function (req, res) {
  User.findOne(
    {
      email: req.body.email,
    })
      .then((user) => {
        if (!user || !user.comparePassword(req.body.password)) {
          return res.status(401).json({
            message: "Authentication failed. Invalid user or password.",
          });
        }
        return res.json({
          token: jwt.sign({ email: user.email, _id: user._id }, "RESTFULAPIs"),
        });
      })
      .catch((error) => {
        return res.json(error);
      });
};

exports.loginRequired = function (req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: "Unauthorized user!!" });
  }
};
exports.profile = function (req, res, next) {
  if (req.user) {
    res.send(req.user);
    next();
  } else {
    return res.status(401).json({ message: "Invalid token" });
  }
};
