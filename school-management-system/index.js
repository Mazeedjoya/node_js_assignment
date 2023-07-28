const express = require("express");
const fs = require("fs");
let app = express();
const {
  getAllStudents,
  createStudent,
  createStudentBulk,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  findByName,
} = require("./student.js");

const {
  getAllTeachers,
  createTeacher,
  createTeacherBulk,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  findTeacherByName,
} = require("./teacher.js");
app.use(express.json());
app.listen(5000, "localhost", () => {
  console.log("Server started");
});

app.get("/students", getAllStudents);
app.post("/student", createStudent);
app.post("/students", createStudentBulk);
app.get("/student/:id", getStudentById);
app.put("/student/:id", updateStudentById);
app.delete("/student/:id", deleteStudentById);
app.get("/student/name/:name", findByName);

app.get("/teachers", getAllTeachers);
app.post("/teacher", createTeacher);
app.post("/teachers", createTeacherBulk);
app.get("/teacher/:id", getTeacherById);
app.put("/teacher/:id", updateTeacherById);
app.delete("/teacher/:id", deleteTeacherById);
app.get("/teacher/name/:name", findTeacherByName);
