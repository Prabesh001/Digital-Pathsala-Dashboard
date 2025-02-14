const express = require("express");
const router = express.Router();
const transporter = require("./emailSender.js");

router.post("/send-emails", async (req, res) => {
  const { emails } = req.body;

  try {
    const sendPromises = emails.map((email) =>
      transporter.sendMail({
        from: `<${process.env.Email_User}>`,
        to: email,
        subject: "For Your Course in Digital Pathsala.",
        html: `
          <div style="font-family: Arial, sans-serif; padding: 20px; line-height: 1.5;">
            <h2 style="color: #2C3E50;">Join Digital Pathsala – Your Gateway to Learning!</h2>
            <p>Dear ${email.split("@")[0]},</p>
            <p>We are excited to invite you to <strong>Digital Pathsala</strong>, where learning meets innovation! Our expert instructors and comprehensive courses will help you achieve your goals in the digital world.</p>
            <p>🔹 Gain in-demand skills<br>🔹 Learn from industry professionals<br>🔹 Flexible online classes</p>
            <p>Click the link below to get started:</p>
            <br>
            <p style="text-align: center, margin-top:10px margin-bottom: 10px">
              <a href="https://maheshbasnet.medium.com/" 
                style="background-color: #3498DB; color: #fff; padding: 10px 20px; text-decoration: none; border-radius: 5px; font-weight: bold;">
                Join Now
              </a>
            </p>
            <br>
            <p>We look forward to welcoming you to our learning community!</p>
            <p>Best regards,</p>
            <p><strong>Digital Pathsala Team</strong></p>
          </div>`,
      })
    );

    await Promise.all(sendPromises);
    res.status(200).json({ message: "Emails sent successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Error sending emails: " + error.message });
  }
});

module.exports = router;
