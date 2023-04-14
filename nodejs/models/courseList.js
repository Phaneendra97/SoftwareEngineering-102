var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var CourseListSchema = new Schema({
  dept: {
    type: String,
    unique: true,
    lowercase: true,
    trim: true,
    required: true,
  },
  course_code: {
    type: String,
    required: true,
  },
  course_name: {
    type: String,
    required: true,
  },
}, { collection: 'course_list' });

mongoose.model("course_list", CourseListSchema);
