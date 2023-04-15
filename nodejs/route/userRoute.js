module.exports = function (app) {
  var userHandlers = require("../controllers/userController.js");
  var courseController = require("../controllers/courseController.js");
  var deptController = require("../controllers/deptController.js");


  app.route("/profile").post(userHandlers.loginRequired, userHandlers.profile);
  app.route("/auth/register").post(userHandlers.register);
  app.route("/auth/sign_in").post(userHandlers.sign_in);
  app.route("/auth/verify").get(userHandlers.verify_otp);
  app.route("/dept_list").get(deptController.get_dept_list);
  app.route("/course_list_by_dept").get(courseController.get_course_list_by_dept);


};
