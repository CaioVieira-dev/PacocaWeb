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
    sendContactMail(req, res) {
        const email = {
            from: '/YOUREMAIL/',
            to: '/SOMEONEEMAILS/',
            subject: `Contato de ${req.body.email}`,
            text: `${req.body.message}`
        }
        sender.sendMail(email, (err) => {
            if (err) {
                console.log(err);
                return;
            } else {
                console.log('email enviado com sucesso!')
                return res.send('success')
            }
        })

    }
}