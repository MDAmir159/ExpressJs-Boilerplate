// src/utils/emailService.js
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: 'gmail', // For Gmail as the service
    auth: {
        user: process.env.EMAIL_USERNAME,
        pass: process.env.EMAIL_PASSWORD
    }
});

const sendEmail = ({ from, to, subject, text, html }) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail({ from, to, subject, text, html }, (err, info) => {
            if (err) {
                reject(err);
            } else {
                resolve(info);
            }
        });
    });
};

module.exports = { sendEmail };
