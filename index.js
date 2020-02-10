const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const port = process.env.PORT || 8000;

mongoose.connect(
  "mongodb+srv://dbAdmin:dbAdmin@cluster0-eobbw.mongodb.net/test?retryWrites=true&w=majority",
  { useNewUrlParser: true }
);

let db = mongoose.connection;

db.once("open", function() {
  console.log("connected to MongoDB");
});

db.on("error", function(err) {
  console.log(err);
});

// Initialized app
const app = express();

// Bring in Models
let Student = require("./models/student");

//Load view engine

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "public")));

// Home Route
app.get("/", function(req, res) {
  Student.find({}, function(err, students) {
    if (err) {
      console.log(err);
    } else {
      res.render("index", {
        title: "View Students",
        students: students
      });
    }
  });
});

// View add data page
app.get("/student/add", function(req, res) {
  res.render("add_student", {
    title: "Add Student"
  });
});

// Process add data
app.post("/student/add", function(req, res) {
  let student = new Student();
  student.name = req.body.fname;
  student.dob = req.body.dob;
  student.school = req.body.school;
  student.class = req.body.class;
  student.division = req.body.division;
  student.status = req.body.status;
  student.save(function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});

//view edit data page
app.get("/student/edit/:id", function(req, res) {
  Student.findById(req.params.id, function(err, student) {
    res.render("edit_student", {
      title: 'edit student',
      student: student
    });
  });
});

// Process edit data
app.post("/student/edit/:id", function(req, res) {
  let student = {}
  student.name = req.body.fname;
  student.dob = req.body.dob;
  student.school = req.body.school;
  student.class = req.body.class;
  student.division = req.body.division;
  student.status = req.body.status;

  let query = {_id:req.params.id}

  Student.updateOne(query, student, function(err) {
    if (err) {
      console.log(err);
    } else {
      res.redirect("/");
    }
  });
});


//Delete student
app.delete('/student/:id', function (req, res) {
  let query = {_id:req.params.id}

  Student.deleteOne(query, function (err) {
    if (err) {
      console.log(err);      
    }
    res.send('success');
    
  });
});

//Starting the server
app.listen(port, () => {
  console.log("App is running on port " + port);
});
