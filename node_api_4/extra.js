// const http = require("http");
// const fs = require("fs");
// const url = require("url");

// const port = 4004;
// const ip = "localhost";
// let header = fs.readFileSync("header.html", "utf-8");
// const student = fs.readFileSync("student.html", "utf-8");
// const teacher = fs.readFileSync("teacher.html", "utf-8");
// const batch = fs.readFileSync("batch.html", "utf-8");
// const contact = fs.readFileSync("contact.html", "utf-8");
// const home = fs.readFileSync("home.html", "utf-8");
// const student_detail = fs.readFileSync("student_detail.html", "utf-8");
// const students = [
//   {
//     id: 1,
//     name: "Sameer",
//     age: "20",
//     phone: "89797968655",
//   },
//   {
//     id: 2,
//     name: "Saad",
//     age: "29",
//     phone: "89797968600",
//   },
//   {
//     id: 3,
//     name: "Alan",
//     age: "24",
//     phone: "89797968633",
//   },
//   {
//     id: 4,
//     name: "Alzo",
//     age: "21",
//     phone: "89797968611",
//   },
// ];

// const server = http.createServer((req, res) => {
//   let { pathname } = url.parse(req.url, true);
//   if (pathname === "/home" || pathname === "/") {
//     res.end(header.replace("{{%content%}}", home));
//   } else if (pathname.includes("/student")) {
//     const urls = pathname.split("/");
//     const id = Number(urls[urls.length - 1]);
//     if (isNaN(id)) {
//       sendStudentResponse(res);
//     } else {
//       sendStudentResponseById(id, res);
//     }
//   } else if (pathname === "/teacher") {
//     res.end(header.replace("{{%content%}}", teacher));
//   } else if (pathname === "/batch") {
//     res.end(header.replace("{{%content%}}", batch));
//   } else if (pathname === "/contact") {
//     res.end(header.replace("{{%content%}}", contact));
//   } else {
//     res.end("not found");
//   }
// });
// server.listen(port, ip, () => {
//   console.log(`Server is listening oon ${port}`);
// });


// // FUNCTIONS 

// function sendStudentResponseById(id, res) {
//   console.log("Yes.....");
//   let student = students.filter((st) => st.id === id);
//   let studentIdHtml = student_detail.replace("{{%NAME%}}", student[0].name);
//   studentIdHtml = studentIdHtml.replace("{{%AGE%}}", student[0].age);
//   studentIdHtml = studentIdHtml.replace("{{%PHONE%}}", student[0].phone);
//   res.end(header.replace("{{%content%}}", studentIdHtml));
// }

// function sendStudentResponse(res) {
//   let studentHtml = header.replace("{{%content%}}", student);
//   let rows = "";
//   for (let student of students) {
//     let row = `
//       <tr>
//       <td>${student.name}</td>
//       <td>${student.age}</td>
//       <td>${student.phone}</td>
//       <td><a href="/student/${student.id}" style='width:10px;height:5px;color:green'>Show Details</a></td>
//       </tr>`;
//     rows = rows.concat(row);
//   }
//   res.end(studentHtml.replace("{{%STUDENTDETAILS%}}", rows));
// }
