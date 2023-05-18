const express = require("express");

const server = express();
const routes = require("./routes")

server.use(express.json());

server.use(express.urlencoded({ extended: false })); // Form


server.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*"); //Autorizo recibir solicitudes de este dominio
    res.header("Access-Control-Allow-Credentials", true); //Autorizo recibir solicitudes que incluyan el encabezado con credenciales
    res.header(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    ); 
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE"); //Autorizo las solicitudes tipo GET, POST, OPTIONS, PUT y DELETE.
    next();
  });

server.get("/", (req,res)=>{
    res.status(200).json({message:"PayPal"})
})

server.use("/electronic", routes)

module.exports = server;
