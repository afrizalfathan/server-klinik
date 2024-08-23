const express = require("express");
const nodemailer = require("nodemailer");

const router = express.Router();
const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSAPPS,
  },
});

// Router send email
router.post("/email_send", async (req, res) => {
  const mailOptions = {
    from: req.body.from,
    to: req.body.to,
    subject: req.body.subject,
    html: req.body.message,
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return res.status(500).send(error);
    }
    res.status(200).send("Email sent succesfully");
  });
});

module.exports = router;
