const express = require('express');
const nodemailer = require('nodemailer');
const router = express.Router();

const emailCredentials = require('../config/credentials');

const emailUserName = emailCredentials.userName;
const emailPassword = emailCredentials.password;
const emailService = emailCredentials.service;

const transporter = nodemailer.createTransport({
  service: emailService,
  auth: {
    user: emailUserName,
    pass: emailPassword
  }
});

router.post('/', (req, res) => {
  console.log(req.body);
  
  const mailOptions = {
    from: emailUserName,
    to: req.body.address,
    subject: req.body.subject,
    text: req.body.text
  }

  if (emailUserName === "" || emailPassword === "") {
    res.sendStatus(500);
  } else {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
        res.sendStatus(500);
      } else {
        console.log('Email sent: ' + info.response);
        res.sendStatus(200);
      }
    });
  }
  return res.end();
})

module.exports = router;