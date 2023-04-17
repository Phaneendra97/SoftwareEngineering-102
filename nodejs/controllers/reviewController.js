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

exports.check_review_exists = function (req, res) {
  const reqPayload = req.body;
  if (req.user) {
    review
      .findOne({
        dept: reqPayload.dept,
        code: reqPayload.course,
        instructor: reqPayload.instructor,
      })
      .then((reviewObject) => {
        let payload = {
          courseName: reviewObject.courseName,
          instructor: reviewObject.instructor,
          code: reviewObject.code,
          dept: reviewObject.dept,
          userReview: null,
        };
        if (reviewObject != null) {
          let reviews = reviewObject.reviews;
          for (i = 0; i < reviews.length; i++) {
            if (reviews[i].reviewerId == req.user._id) {
              payload["userReview"] = reviews[i];
              break;
            }
          }
          response = {
            review: payload,
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

exports.add_review = function (req, res) {
  const reqPayload = req.body;
  if (req.user) {
    review
      .findOne({
        dept: reqPayload.dept,
        code: reqPayload.code,
        instructor: reqPayload.instructor,
      })
      .then((reviewObject) => {
        if (reviewObject != null) {
          let newPayload = reviewObject;
          reviewPayload = {
            review: reqPayload.review,
            difficulty: reqPayload.difficulty,
            grade: reqPayload.grade,
            rating: reqPayload.rating,
            reviewerId: req.user._id,
          };
          let avgRating = reviewObject.ratingAvg;
          let avgRatingSum = reviewObject.ratingAvg * newPayload.reviews.length;
          let newAvgRating;
          let existing = false;
          for (i = 0; i < newPayload.reviews.length; i++) {
            if (newPayload.reviews[i].reviewerId == req.user._id) {
              const prevRating = newPayload.reviews[i].rating;
              newAvgRating =
                (avgRatingSum - prevRating + reviewPayload.rating) /
                newPayload.reviews.length;
              newPayload.reviews.splice(i, 1, reviewPayload);
              newAvgRating =
                (avgRatingSum - prevRating + reviewPayload.rating) /
                newPayload.reviews.length;
              avgRatingSum - avgRating;
              existing = true;
              break;
            }
          }
          if (!existing) {
            newPayload.reviews[newPayload.reviews.length] = reviewPayload;
            newAvgRating =
              (avgRatingSum + reqPayload.rating) / newPayload.reviews.length;
          }
          review
            .findOneAndUpdate(
              {
                dept: reqPayload.dept,
                code: reqPayload.code,
                instructor: reqPayload.instructor,
              },
              { reviews: newPayload.reviews, ratingAvg: newAvgRating.toFixed(1) },
              { new: true }
            )
            .then((updatedReview) => {
              response = {
                review: updatedReview,
                status: "success",
              };
              return res.json(response);
            })
            .catch((error) => {
              return res.json(error);
            });
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
