const nodemailer = require('nodemailer');
const property = require('../rest/property.js');
const template = require('./template.js');

module.exports = { alert }

function alert(user, email) {
  let message = `Usuário <b>` + user + `</b> (` + email + `)</p>
    <p>Acaba de ser registrado!`;

  return new Promise((resolve, reject) => {
    send(user, 'support@getdeckcreator.com', `Novo Registro: <b>` + user + `</b> (` + email + `)`, 'Novo usuário cadastrado', message)
      .then((retorno) => {
        resolve(retorno);
      }).catch((err) => { reject(console.error); });
  });
}

function send(user, email, preheader, sub, message) {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      SES: property.ses()
    });

    transporter.sendMail({
      from: '"DeckCreator" <support@getdeckcreator.com>',
      to: email,
      subject: sub,
      html: template.html(user, preheader, message)
    })
      .then((info) => {
        resolve(info);
      }).catch(err => reject(err));
  });
}
