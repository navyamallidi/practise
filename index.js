const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/users");
const Course = require("./models/courses");
const checkUser = require("./middlewares/checking");

const app = express();
app.use(express.json());

mongoose
  .connect("mongodb://localhost:27017/course")
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("Could not connect to MongoDB...", err));

app.post("/users", async (req, res) => {
  try {
    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });
    await user.save();
    res.send(user);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.post("/courses", async (req, res) => {
  try {
    const course = new Course({
      courseId: req.body.courseId,
      Coursename: req.body.Coursename,
      price: req.body.price,
    });
    await course.save();
    res.send(course);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/courses", async (req, res) => {
  try {
    const courses = await Course.find();
    res.send(courses);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/users", async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});

app.get("/courses/:Id", async (req, res) => {
  try {
    const courseId = req.params.Id;
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).send("Course not found");
    } else {
      res.send(course);
    }
  } catch (err) {
    res.status(500).send("Something went wrong");
  }
});


app.post('/login', checkUser, (req, res) => {
    res.send(`User ${req.user.email} logged in successfully`);
  });

app.listen(3000, () => {
  console.log("Listening on port 3000...");
});
