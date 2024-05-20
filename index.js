const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'jlurquieta1@gmail.com', // tu correo electrónico
    pass: 'hwqu eqii wibk gciv ' // la contraseña de aplicación generada
  }
});

app.post('/send-email-pedidos', (req, res) => {
  const { name, email, street, city, postalcode, state, telephone, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'chamoyavispa@chamoyavispa.com',
    subject: `Pedido de ${name}`,
    text: `
      Nombre: ${name}
      Email: ${email}
      Dirección: ${street}, ${city}, ${state}, ${postalcode}
      Teléfono: ${telephone}
      Información adicional: ${message}
    `
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error enviando email');
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).send('Email enviado');
    }
  });
});

app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'chamoyavispa@chamoyavispa.com',
    subject: `Contacto desde la página web - ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      
      res.status(500).send('Error enviando email');
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).send('Email enviado');
    }
  });
});

app.listen(port, () => {
  console.log(`hola`);
});
