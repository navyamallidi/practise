const { default: mongoose } = require("mongoose");

const CourseSchema = new mongoose.Schema({
    courseId:Number,
    Coursename:String,
    price:Number
})

const Course = mongoose.model("Course",CourseSchema);

module.exports = Course;