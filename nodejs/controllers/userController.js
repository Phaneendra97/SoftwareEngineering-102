var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
User = mongoose.model("User");

exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  User.findOne({ email: newUser.email })
    .then((user) => {
      if (user == null) {
        newUser
          .save()
          .then((savedUser) => {
            response = {
              id: savedUser._id,
              status: "success",
              message: "Created Account",
            };
            return res.json(response);
          })
          .catch((error) => {
            return res.json(error);
          });
      } else {
        res.status(400);
        return res.json({
          status: "error",
          message: "user already exisits, try logging in",
        });
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

exports.sign_in = function (req, res) {
  User.findOne({
    email: req.body.email,
  })
    .then((user) => {
      if (!user || !user.comparePassword(req.body.password)) {
        return res.status(401).json({
          message: "Authentication failed. Invalid user or password.",
          status: "error",
        });
      }
      return res.json({
        token: jwt.sign({ email: user.email, _id: user._id }, "RESTFULAPIs"),
        message: "Signed In",
        status: "success",
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
