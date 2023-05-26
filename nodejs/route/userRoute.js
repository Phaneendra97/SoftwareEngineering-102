module.exports = function (app) {
  var userHandlers = require("../controllers/userController.js");
  var courseController = require("../controllers/courseController.js");
  var deptController = require("../controllers/deptController.js");
  var reviewController = require("../controllers/reviewController.js");
  var healthController = require("../controllers/healthController.js");


  app.route("/profile").post(userHandlers.loginRequired, userHandlers.profile);
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.sign_in);
  app.route("/auth/verify").get(userHandlers.verify_otp);
  app.route("/dept_list").get(deptController.get_dept_list);
  app
    .route("/course_list_by_dept")
    .get(courseController.get_course_list_by_dept);
  app.route("/review").get(reviewController.get_review);
  app.route("/check_review_exists").post(reviewController.check_review_exists);
  app.route("/add_review").post(reviewController.add_review);
  app.route("/health").get(healthController.healthCheck);


};
