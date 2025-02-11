const express = require("express");
const router = express.Router();
const transporter = require("./emailSender.js");

router.post("/send-emails", async (req, res) => {
  const { emails } = req.body;

  try {
    const sendPromises = emails.map((email) =>
      transporter.sendMail({
        from: `<prabeshdaahal123@gmail.com>`,
        to: email,
        subject: "Hello World",
        html: "<p>Whats up bro</p>",
      })
    );

    await Promise.all(sendPromises);
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending emails: " + error.message });
  }

  console.log(req.body);
});

module.exports = router;
