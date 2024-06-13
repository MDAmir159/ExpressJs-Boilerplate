const nodemailer = require('nodemailer');
const { API_EMAIL, API_EMAIL_PASSWORD } = require('.');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  secure: true,
  auth: {
    user: API_EMAIL,
    pass: API_EMAIL_PASSWORD
  }
});

module.exports = {
  transporter
};