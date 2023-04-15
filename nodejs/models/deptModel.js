var mongoose = require("mongoose"),
  bcrypt = require("bcrypt"),
  Schema = mongoose.Schema;

/**
 * User Schema
 */
var DeptListSchema = new Schema(
  {
    dept_code: {
      type: String,
      unique: true,
      trim: true,
      required: true,
    },
    dept_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { collection: "dept_list" }
);

mongoose.model("dept_list", DeptListSchema);
