const express = require("express");
const routes = express.Router();

const ProductsController = require("./controllers/ProductsController");
const ContactController = require("./controllers/ContactController");


routes.get("/products", ProductsController.products) //retorna a lista de produtos
routes.get("/products/:productId", ProductsController.productSingle)
routes.post("/products/:productId", ProductsController.sendReservMail)
routes.post("/products/find/:productName", ProductsController.findProduct)
routes.post("/contact", ContactController.sendContactMail)

module.exports = routes;