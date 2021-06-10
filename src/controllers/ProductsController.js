const Products = require('../model/Products');
const nodemailer = require('nodemailer');

const sender = nodemailer.createTransport({
    service: "gmail",
    port: 587,
    secure: true,
    auth: {
        user: '/YOUREMAIL/',
        pass: '/YOURPASSWORD/'
    }
});

module.exports = {

    async products(req, res) {
        const products = await Products.getAll();

        products.map(product => {
            if (product.flavours != null) {
                product.flavours = product.flavours.split(",")
            } else {
                product.flavours = [];
            }
        })
        return res.send(products);

    },
    async productSingle(req, res) {
        const productId = req.params.productId;
        const product = await Products.getSingle(productId);

        if (product.flavours != null) {
            product.flavours = product.flavours.split(",")
        } else {
            product.flavours = [];
        }

        return res.send(product);
    },
    sendReservMail(req, res) {
        const message = req.body.message.lenght != '' ? `Esta mensagem foi deixada: "${req.body.message}"` : '';

        const email = {
            from: '/YOUREMAIL/',
            to: '/SOMEONEEMAILS/',
            subject: `Encomenda de ${req.body.product}`,
            text: `Bom dia Caio \n\n ${req.body.name}, da sala ${req.body.class}, pediu ${req.body.quantity} do produto ${req.body.product}.\n\n${message}`
        }
        sender.sendMail(email, (err) => {
            if (err) {
                console.error(err);
            } else {
                console.log('email enviado com sucesso!')
            }
        })
    },
    async findProduct(req, res) {
        const productName = req.body.productName;
        const products = await Products.getSearched(productName);

        if (products == 'not found') {
            return res.send("Product not found");
        }
        products.map(product => {
            if (product.flavours != null) {
                product.flavours = product.flavours.split(",")
            } else {
                product.flavours = [];
            }
        })
        return res.send(products);
    }
}