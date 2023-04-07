var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
User = mongoose.model("User");

const Mailjet = require("node-mailjet");
const mailjet = Mailjet.apiConnect(
  "a961fc3b933e87ab30b045e24194c679",
  "ad68c759265f128846bfa9ed3754ad57"
);

exports.register = function (req, res) {
  var newUser = new User(req.body);
  newUser.hash_password = bcrypt.hashSync(req.body.password, 10);
  newUser.otp = generateRandomNumber();
  User.findOne({ email: newUser.email })
    .then((user) => {
      if (user == null) {
        newUser
          .save()
          .then((savedUser) => {
            response = {
              id: savedUser._id,
              status: "success",
              message:
                "Email verification sent, please verify before signing in",
            };
            sendEmail(newUser.otp, newUser.email);
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
      } else if (!user.isVerified) {
        return res.status(400).json({
          message: "Please verify before logging in",
          status: "error",
        });
      } else {
        return res.json({
          token: jwt.sign({ email: user.email, _id: user._id }, "RESTFULAPIs"),
          message: "Signed In",
          status: "success",
        });
      }
    })
    .catch((error) => {
      return res.json(error);
    });
};

exports.verify_otp = function (req, res) {
  const { email, otp } = req.query;
  User.findOne({
    email: email,
  })
    .then((user) => {
      if (!user) {
        return res
          .status(500)
          .send(
            "<html><body><h2>Something went wrong our side, please contact our support at phaneendra0897@gmail.com</h2></body></html>"
          );
      } else {
        if (otp == user.otp) {
          User.updateOne({ email: email }, { isVerified: true })
            .then((result) => {
              return res
                .status(500)
                .send(
                  "<html><body><h2>You're verified, proceed to login!</h2></body></html>"
                );
            })
            .catch((err) => {
              return res
                .status(500)
                .send(
                  "<html><body><h2>Something went wrong our side, please contact our support at phaneendra0897@gmail.com</h2></body></html>"
                );
            });
        } else {
          return res
            .status(500)
            .send(
              "<html><body><h2>Otp didn't match, try again, please try again if the issue persists please contact support at phaneendra0897@gmail.com</h2></body></html>"
            );
        }
      }
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

function sendEmail(otp, email) {
  const request = mailjet.post("send", { version: "v3.1" }).request({
    Messages: [
      {
        From: {
          Email: "phaneendra0897@gmail.com",
          Name: "Rate My Course",
        },
        To: [
          {
            Email: email,
            Name: email,
          },
        ],
        Subject: "Greetings from Rate My Course.",
        TextPart: "Rate My Course confirmation email",
        HTMLPart:
          "Link to verify: http://localhost:3000/auth/verify?email=" +
          email +
          "&otp=" +
          otp,
        CustomID: "Verify",
      },
    ],
  });
  request
    .then((result) => {
      console.log(result.body);
    })
    .catch((err) => {
      console.log(err.statusCode);
    });
}

function generateRandomNumber() {
  var min = 10000;
  var max = 99999;
  var randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNumber;
}
