// const express = require("express");
const fs = require("fs");

const students = JSON.parse(fs.readFileSync("student.json", "utf-8"));

function getAllStudents(req, res) {
  const response = {
    status: "Success",
    data: { students },
  };
  res.status(200).json(response);
}

const createStudent = (req, res) => {
  const body = req.body;
  const id = students[students.length - 1].id + 1; // students from file
  let obj = Object.assign({ id: id }, body);
  students.push(obj);
  fs.writeFileSync("student.json", JSON.stringify(students), "utf-8");
  res.send("Created");
};

const createStudentBulk = (req, res) => {
  const studentBody = req.body;
  for (let student of studentBody) {
    const id = students[students.length - 1].id + 1;
    let obj = Object.assign({ id: id }, student);
    students.push(obj);
  }
  fs.writeFileSync("student.json", JSON.stringify(students), "utf-8");
  res.status(200).send(`created ${JSON.stringify(studentBody)}`);
};

const getStudentById = (req, res) => {
  let id = parseInt(req.params.id);
  let student = students.filter((student) => student.id === id);
  if (!student || student.length === 0) {
    res.status(404).send({
      status: "failure",
      message: "Student not found with the given id",
      data: {},
    });
  }
  res.status(200).send({
    status: "success",
    data: {
      student: student[0],
    },
  });
};

const updateStudentById = (req, res) => {
  let id = parseInt(req.params.id);
  let index = students.findIndex((student) => student.id === id);
  students[index] = Object.assign({}, req.body);
  fs.writeFileSync("student.json", JSON.stringify(students), "utf-8");
  res.send("Updated ");
};

const deleteStudentById = (req, res) => {
  let id = parseInt(req.params.id);
  let index = students.findIndex((student) => student.id === id);
  students.splice(index, 1);
  fs.writeFileSync("student.json", JSON.stringify(students), "utf-8");
  res.send("Deleted");
};

const findByName = (req, res) => {
  let name = req.params.name;
  let studentName = students.find((student) => student.name === name);
  if (!studentName) {
    res.status(404).send("Student not found ");
  }
  res.send(studentName);
};

const deletebulk = (req, res) => {
  let ids = parseInt(req.params.id);
};
// 13. update bulk student data by ids
// 15. delete bulk student data by ids
module.exports = {
  getAllStudents,
  createStudent,
  createStudentBulk,
  getStudentById,
  updateStudentById,
  deleteStudentById,
  findByName,
};
