var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var ReviewSchema = new Schema(
  {
    courseName: {
      type: String,
      trim: true,
      required: true,
    },
    credits: {
      type: String,
      required: true,
    },
    instructor: {
      type: String,
      required: true,
    },
    ratingAvg: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
    },
    dept: {
      type: String,
      required: true,
    },
    syllabus: {
      data:String,
      fileName: String
    },
    reviews: [
      {
        review: String,
        rating: Number,
        reviewerId: String,
        difficulty: String,
        grade: String,
      },
    ],
  },
  { collection: "review" }
);

mongoose.model("review", ReviewSchema);
