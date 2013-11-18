var nodemailer = require('nodemailer');
var mailSender = {};
mailSender.transport = nodemailer.createTransport("SMTP", {
        auth: {
            user: "step2noticeboard@gmail.com",
        pass: "a1!b2@c3#d4$e5%"
        }
    });

mailSender.message = {
    from: 'step2noticeboard <sender@example.com>',
    to: '"Receiver Name" <surajmbabar@gmail.com>',
    subject: 'verification code', //
    text: 'sdg345dfh56!@#$'
  };
exports.mailSender = mailSender;