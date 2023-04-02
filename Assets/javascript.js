const nodemailer = require('nodemailer');
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/', (req, res) => {
  const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
      user: 'tucorreo@gmail.com',
      pass: 'tupassword'
    }
  });

  const mailOptions = {
    from: req.body.email,
    to: 'gimena.bruno@hotmail.com',
    subject: 'Correo de prueba',
    text: `Nombre: ${req.body.name}\nCorreo electrónico: ${req.body.email}\nMensaje: ${req.body.message}`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
      res.send('Error al enviar el correo electrónico');
    } else {
      console.log('Correo electrónico enviado: ' + info.response);
      res.send('Correo electrónico enviado correctamente');
    }
  });
});

app.listen(3000, () => {
  console.log('Servidor iniciado en el puerto 3000');
});