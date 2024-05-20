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

// Función para enviar correo electrónico de agradecimiento
function sendThankYouEmail(name, email) {
  const mailOptions = {
    from: email,
    to: email,
    subject: 'Gracias por ponerte en contacto',
    text: `Hola ${name},\n\nGracias por ponerte en contacto con nosotros. Tu mensaje ha sido recibido correctamente. Nos pondremos en contacto contigo lo antes posible.\n\nSaludos,\nEl equipo de ChamoyAvispa`
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error('Error enviando correo de agradecimiento:', error);
    } else {
      console.log('Correo de agradecimiento enviado:', info.response);
    }
  });
}

// Ruta para enviar formulario de pedidos
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
  sendThankYouEmail(name, email);
  // Envío del correo principal
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error enviando email');
      sendThankYouEmail(name, email);
    } else {
      console.log('Email enviado:', info.response);
      // Envío del correo de agradecimiento
      sendThankYouEmail(name, email);
      res.status(200).send('Email enviado');
    }
  });
});

// Ruta para enviar formulario de contacto
app.post('/send-email', (req, res) => {
  const { name, email, message } = req.body;

  const mailOptions = {
    from: email,
    to: 'chamoyavispa@chamoyavispa.com',
    subject: `Contacto desde la página web - ${name}`,
    text: message
  };
  sendThankYouEmail(name, email);
  // Envío del correo principal
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(500).send('Error enviando email');
      sendThankYouEmail(name, email);
    } else {
      console.log('Email enviado:', info.response);
      // Envío del correo de agradecimiento
      sendThankYouEmail(name, email);
      res.status(200).send('Email enviado');
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor en funcionamiento en el puerto ${port}`);
});
