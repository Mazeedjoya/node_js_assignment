const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 4004;
const ip = "localhost"; 
let header = fs.readFileSync("header.html", "utf-8");
const student = fs.readFileSync("student.html", "utf-8");
const teacher = fs.readFileSync("teacher.html", "utf-8");
const batch = fs.readFileSync("batch.html", "utf-8");
const contact = fs.readFileSync("contact.html", "utf-8");
const home = fs.readFileSync("home.html", "utf-8");
const student_detail = fs.readFileSync("student_detail.html", "utf-8");
const teacher_detail = fs.readFileSync("teacher_detail.html" , "utf-8");

const students = [
  {id: 1, name: "Sameer", age: "20", phone: "89797968655"},
  {id: 2, name: "Saad",age: "29", phone: "89797968600"},
  {id: 3, name: "Alan",age: "24",phone: "89797968633"},
  {id: 4, name: "Alzo", age: "21",phone: "89797968611"},
];

 let teachers = [
  { id:1, name : "Sajid Khan" , age : 33, batch : "node js " , phone: 333333 },
  { id:2, name : "Sajid Khan" , age : 34, batch : "node js " , phone: 333333 },
  { id:3, name : "Sajid Khan" , age : 35, batch : "node js " , phone: 333333 },
  { id:4, name : "Sajid Khan" , age : 36, batch : "node js " , phone: 333333 },
];

const batches = [
{name: "Node js", fees : 5000 , duration : "6 month "},
{name: "JavaScript", fees : 12000 , duration : "4 month "},
{name: "Designing", fees : 8000 , duration : "3 month "},
{name: "Java", fees : 10000 , duration : "6 month "},
];

const server = http.createServer((req, res) => {
  let { pathname } = url.parse(req.url, true);
  if (pathname === "/home" || pathname === "/") {             // home
    res.end(header.replace("{{%content%}}", home));
  } else if (pathname.includes("/student")) {           // student
    const urls = pathname.split("/");
    const id = Number(urls[urls.length - 1]);
    if (isNaN(id)) {
      sendStudentResponse(res);
    } else {
     sendStudentResponseById(id, res);
    }
  } else if (pathname.includes("/teacher")) {         // teacher
    const urls = pathname.split("/");
    const id = Number(urls[urls.length - 1]);
    if (isNaN(id)) {
    sendTeacherResponse(res);
    } else {
      sendTeacherResponseById(id, res);
    }
  } else if (pathname === "/batch") {                 // batch
    // res.end(header.replace("{{%content%}}", batch));
    sendBatchResponse(res);
  } else if (pathname === "/contact") {                     // contact
    res.end(header.replace("{{%content%}}", contact));
  } else {
    res.end("not found");
  }
});
server.listen(port, ip, () => {
  console.log(`Server is listening oon ${port}`);
});


// FUNCTIONS 

function sendStudentResponseById(id, res) {
  console.log("Yes.....");
  let student = students.filter((st) => st.id === id);
  let studentIdHtml = student_detail.replace("{{%NAME%}}", student[0].name);
  studentIdHtml = studentIdHtml.replace("{{%AGE%}}", student[0].age);
  studentIdHtml = studentIdHtml.replace("{{%PHONE%}}", student[0].phone);
  res.end(header.replace("{{%content%}}", studentIdHtml));
}

function sendTeacherResponseById(id, res) {
  console.log("Yes... teacher..");
  let teacher = teachers.filter((teacher) => teacher.id === id);
  let teacherIdHtml = teacher_detail.replace("{{%NAME%}}", teacher[0].name);
  teacherIdHtml = teacherIdHtml.replace("{{%AGE%}}", teacher[0].age);
  teacherIdHtml = teacherIdHtml.replace("{{%BATCH%}}", teacher[0].batch);
  teacherIdHtml = teacherIdHtml.replace("{{%PHONE%}}", teacher[0].phone);
  res.end(header.replace("{{%content%}}", teacherIdHtml));
}

function sendStudentResponse(res) {
  let studentHtml = header.replace("{{%content%}}", student);
  let rows = "";
  for (let student of students) {
    let row = `
      <tr>
      <td>${student.name}</td>
      <td>${student.age}</td>
      <td>${student.phone}</td>
      <td><a href="/student/${student.id}" style='width:10px;height:5px;color:green'>Show Details</a></td>
      </tr>`;
    rows = rows.concat(row);
  }
  res.end(studentHtml.replace("{{%STUDENTDETAILS%}}", rows));
}

function sendTeacherResponse(res) {
  let teacherHtml = header.replace("{{%content%}}", teacher);
  let rows = "";
  for (let teacher of teachers) {
    let row = `
      <tr>
      <td>${teacher.name}</td>
      <td>${teacher.age}</td>
      <td>${teacher.batch} </td>
      <td>${teacher.phone}</td>
      <td><a href="/teacher/${teacher.id}" style='width:10px;height:5px;color:green'>Show Details</a></td>
      </tr>`;
    rows = rows.concat(row);
  }
  res.end(teacherHtml.replace( "{{%TEACHERDETAILS%}}" , rows));
}

function sendBatchResponse(res){
let batchHtml = header.replace("{{%content%}}" ,batch)
let rows = "" ;
for(let batch of batches){
  let row = `
  <tr>
  <td>${batch.name} </td>
  <td>${batch.fees} </td>
  <td>${batch.duration} </td>
  </tr> ` ;
  rows = rows.concat(row);
}
res.end(batchHtml.replace("{{%BATCHEDETAILS%}}", rows))
}
