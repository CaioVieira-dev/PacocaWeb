const express = require("express");
const server = express();
const routes = require("./routes.js")
const cors = require("cors");

server.use(cors());

//habilitar arquivos estaticos //statics
server.use(express.static("public"));

//habilitar o request.body
server.use(express.urlencoded({ extended: true }))
server.use(express.json()); //pro express entender o que o axios mandou
//routes
server.use(routes)

server.listen(4000, () => console.log("rodando"));