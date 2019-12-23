const nodemailer = require('nodemailer');
const property = require('./property.js');

module.exports = {
  send(email, codigo){
    return main(email, codigo).catch(console.error);
  }
}

async function main(email, codigo) {
  let transporter = nodemailer.createTransport(property.auth());

  let info = await transporter.sendMail({
    from: '"DeckCreator 👻" <tymboxcookie@gmail.com>',
    to: email,
    subject: 'Teste enviar email ✔',
    text: 'Oi?',
    html: '<b>'+codigo+'</b>'
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
