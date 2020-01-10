const nodemailer = require('nodemailer');
const property = require('./property.js');
const template = require('./template.js');

module.exports = {
  registration(user, email, codigo){
    let message = `<p>Hello, `+user+`!</p>
    <p>Thank you for your registration to DeckCreator.</p>
    <p>In order to activate your account, you need to input your temporary access code:</p>
    <p><b>`+codigo+`</b></p>
    <p>If you have any problems, please send an email to <b>support@getdeckcreator.com</b>.</p>
    <p>Enjoy!</p>`

    return main(user, email, codigo, 'Please, confirm your registration ✔', message).catch(console.error);
  },
  forgotPassword(email, codigo){
    let message = `<p>You've requested to change your password.</p>
    <p>In order to confirm the changes in your password, you need to input your temporary access code:</p>
    <p><b>`+codigo+`</b></p>
    <p>If you have any problems, please send an email to <b>support@getdeckcreator.com</b>.</p>
    <p>Enjoy!</p>`

    return main('', email, codigo, 'Forgot your password?', message).catch(console.error);
  }
}

async function main(user, email, codigo, sub, message) {
  let transporter = nodemailer.createTransport(property.auth());

  let info = await transporter.sendMail({
    from: '"DeckCreator 🃏" <tymboxcookie@gmail.com>',
    to: email,
    subject: sub,
    html: template.html(user, codigo, message)
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
