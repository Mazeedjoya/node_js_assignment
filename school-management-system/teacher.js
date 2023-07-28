const fs = require("fs");

const teachers = JSON.parse(fs.readFileSync("teacher.json", "utf-8"));

function getAllTeachers(req, res) {
  const response = {
    status: "Success",
    data: { teachers },
  };
  res.status(200).json(response);
}

const createTeacher = (req, res) => {
  const body = req.body;
  const id = teachers[teachers.length - 1].id + 1; // students from file
  let obj = Object.assign({ id: id }, body);
  teachers.push(obj);
  fs.writeFileSync("teacher.json", JSON.stringify(teachers), "utf-8");
  res.send("Created");
};

const createTeacherBulk = (req, res) => {
  const teacherBody = req.body;
  for (let teacher of teacherBody) {
    const id = teachers[teachers.length - 1].id + 1;
    let obj = Object.assign({ id: id }, teacher);
    teachers.push(obj);
  }
  fs.writeFileSync("teacher.json", JSON.stringify(teachers), "utf-8");
  res.status(200).send(`created ${JSON.stringify(teacherBody)}`);
};

const getTeacherById = (req, res) => {
  let id = parseInt(req.params.id);
  let teacher = teachers.filter((teacher) => teacher.id === id);
  if (!teacher || teacher.length === 0) {
    res.status(404).send({
      status: "failure",
      message: "Teacher not found with the given id",
      data: {},
    });
  }
  res.status(200).send({
    status: "success",
    data: {
      Teacher: teacher[0],
    },
  });
};

const updateTeacherById = (req, res) => {
  let id = parseInt(req.params.id);
  let index = teachers.findIndex((teacher) => teacher.id === id);
  teachers[index] = Object.assign({}, req.body);
  fs.writeFileSync("teacher.json", JSON.stringify(teachers), "utf-8");
  res.send("Updated ");
};

const deleteTeacherById = (req, res) => {
  let id = parseInt(req.params.id);
  let index = teachers.findIndex((teacher) => teacher.id === id);
  teachers.splice(index, 1);
  fs.writeFileSync("teacher.json", JSON.stringify(teachers), "utf-8");
  res.send("Deleted");
};

const findTeacherByName = (req, res) => {
  let name = req.params.name;
  let studentName = students.find((student) => student.name === name);
  if (!studentName) {
    res.status(404).send("Student not found ");
  }
  res.send(studentName);
};

module.exports = {
  getAllTeachers,
  createTeacher,
  createTeacherBulk,
  getTeacherById,
  updateTeacherById,
  deleteTeacherById,
  findTeacherByName,
};

// 1. get all students ..
// 2. get all teachers
// 3. create student ..
// 4. create teacher
// 5. create bulk students api ..
// 6. create bulk teacher api
// 7. get student by id ..
// 8. get teacher by id
// 9. update student by id ..
// 10. update teacher by id
// 11. delete student by id ...
// 12. delete teacher by id
//
// 14. update bulk teachers data by ids
// 16. delete bulk teachers data by ids
