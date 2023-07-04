const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 4001;
const ip = "localhost";


const header = `
<!DOCTYPE html>
<html>
<head>
<title> Header </title> 
  <style>
    /* CSS styles for the navigation bar */
    ul.navbar {
      list-style-type: none;
      margin: 0;
      padding: 0;
      overflow: hidden;
      background-color: #f1f1f1;
    }

    ul.navbar li {
      float: left;
    }

    ul.navbar li a {
      display: block;
      color: #333;
      text-align: center;
      padding: 14px 16px;
      text-decoration: none;
    }

    ul.navbar li a:hover {
      background-color: #ddd;
    }

    ul.navbar li a.active {
      background-color: #4CAF50;
      color: white;
    }
  </style>

</head>
<body>
 <header> 
 <nav>
  <ul class="navbar">
    <li><a class="active" href="home">Home</a></li>
    <li><a href="student">Student</a></li>
    <li><a href="teacher">Teacher</a></li>
    <li><a href="batch">Batch</a></li>
    <li><a href="contact">Contact</a></li>

  </ul>

  </nav>
  </header> 
  {{%content%}}
</body>
</html>

`;

const student = fs.readFileSync('student.html' ,"utf-8");
const teacher = fs.readFileSync('teacher.html' ,"utf-8");
const batch = fs.readFileSync('batch.html' ,"utf-8");
const contact= fs.readFileSync('contact.html' ,"utf-8");
const home= fs.readFileSync('home.html' ,"utf-8");






// home student teacher batch contact 
const server = http.createServer((req , res)=>{
    let {query , pathname} = url.parse(req.url , true);
    if(pathname ==='/home' || pathname ==='/'){
        res.end(header.replace("{{%content%}}",home))
    }else if(pathname === "/student"){
        res.end(header.replace("{{%content%}}" , student))
    }else if(pathname === '/teacher' ){
        res.end(header.replace("{{%content%}}" , teacher))
    }else if(pathname === '/batch'){
        res.end(header.replace("{{%content%}}" , batch))
    }else if(pathname === '/contact'){
        res.end(header.replace("{{%content%}}" , contact))
    }else{
        res.end("not found")
    }
}
)
server.listen(port , ip ,()=>{
    console.log(`Server is listening oon ${port}`);
})

