module.exports = function (app) {
  var userHandlers = require("../controllers/userController.js");
  var courseController = require("../controllers/courseController.js");

  // todoList Routes
  app.route("/profile").post(userHandlers.loginRequired, userHandlers.profile);
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.sign_in);
  app.route("/auth/verify").get(userHandlers.verify_otp);
  app.route("/courses").get(courseController.get_courses);

};
