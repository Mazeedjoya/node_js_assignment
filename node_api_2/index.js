const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 4004;
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
    <li><a href="about">About</a></li>
    <li><a href="contact">Contact</a></li>
    <li><a href="product">Product</a></li>
  </ul>

  </nav>
  </header> 
  {{%content%}}
</body>
</html>

`;

// READING FILES 
const about = fs.readFileSync('about.html' , "utf-8");
const contact = fs.readFileSync('contact.html' , "utf-8");
const home = fs.readFileSync("home.html" , "utf-8");
const product = fs.readFileSync('product.html' , "utf-8");


const server = http.createServer((req , res)=>{
    let {query , pathname} = url.parse(req.url , true);
    if(pathname ==='/about'){
        res.end(header.replace("{{%content%}}", about))
    }else if(pathname === "/contact"){
        res.end(header.replace("{{%content%}}" , contact))
    }else if(pathname === '/home' || pathname ==='/'){
        res.end(header.replace("{{%content%}}" , home))
    }else if(pathname === '/product'){
        res.end(header.replace("{{%content%}}" , product))
    }else{
        res.end("not found")
    }
}
)
server.listen(port , ip ,()=>{
    console.log(`Server is listening oon ${port}`);
})