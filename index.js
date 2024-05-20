const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { nodemailer } = require('titan'); // Importa el módulo nodemailer de Titan

const app = express();
app.use(cors());

const port = 3000;

app.use(bodyParser.json());

// Configuración del transporte SMTP para utilizar los servidores de Titan
const transporter = nodemailer.createTransport({
  host: 'smtp.titan.email',
  port: 587,
  secure: false, // El puerto 587 no es seguro, establece a true si usas el puerto 465
  auth: {
    user: 'chamoyavispa@chamoyavispa.com', // Tu dirección de correo electrónico de chamoyavispa@chamoyavispa.com
    pass: 'Gamezone123.', // Tu contraseña de la cuenta de chamoyavispa@chamoyavispa.com
  }
});

// Ruta para enviar formulario de pedidos
app.post('/send-email-pedidos', (req, res) => {
  const { name, email, street, city, postalcode, state, telephone, message } = req.body;

  const mailOptions = {
    from: 'chamoyavispa@chamoyavispa.com', // Cambia esto por tu dirección de correo electrónico de chamoyavispa@chamoyavispa.com
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
      console.error('Error enviando email:', error);
      res.status(500).send('Error enviando email');
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).send('Email enviado');
    }
  });
});

// Ruta para enviar formulario de contacto
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: 'chamoyavispa@chamoyavispa.com', // Cambia esto por tu dirección de correo electrónico de chamoyavispa@chamoyavispa.com
    to: 'chamoyavispa@chamoyavispa.com',
    subject: `Contacto desde la página web - ${name}`,
    text: message
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando email:', error);
      res.status(500).send('Error enviando email');
    } else {
      console.log('Email enviado:', info.response);
      res.status(200).send('Email enviado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
