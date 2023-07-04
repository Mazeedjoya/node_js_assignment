const http = require("http");
const fs = require("fs");
const path = require("path");


const server = http.createServer((req , res)=>{
    try{
        if(req.url == '/students')
        {
            res.writeHead(200);
            const data = fs.readFileSync('./students.json');
            console.log(data.toString());
            res.end(data.toString());

        }
        else if(req.url == '/teachers')
        {
            res.writeHead(200);
            const data = fs.readFileSync('./teachers.json');
            console.log(data.toString());
            console.log("Reading data")
            res.end(data.toString());
        }
        else {
            res.writeHead(404);
            res.end("Url not matched ")

        }
    }catch(error){
    console.log("Error : " ,error)
    }
})

server.listen(4900,()=>{
    console.log("Server is listening on port 4900")
});
