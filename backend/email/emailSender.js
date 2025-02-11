const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "Invalid.id01@gmail.com",
    pass: "Invalid001",
  },
});

module.exports = transporter;