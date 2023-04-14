var mongoose = require("mongoose"),
  jwt = require("jsonwebtoken"),
  bcrypt = require("bcrypt");
courseList = mongoose.model("course_list");

exports.get_courses = function (req, res) {
  if (req.user) {
    courseList
      .find()
      .then((courses) => {
        if (courses != null) {
          let deptList = courses.map((course) => {
            return course.dept;
          });
          response = {
            courseList: deptList,
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
