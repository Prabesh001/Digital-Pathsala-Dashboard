const axios = require("axios");

const sendEmails = async (emails) => {
  try {
    if (!emails.length) {
      return { success: false, message: "No emails to send." };
    }
    const response = await axios.post(
      process.env.Email_url,
      { emails },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to send emails");
    }
    console.log("Email Sent Sucessfully!");
    return {
      success: true,
      message: "Emails sent successfully!",
      failedEmails: [],
    };
  } catch (err) {
    console.error("Error sending emails:", err);
    return {
      success: false,
      message: err.message || "Email sending failed",
      failedEmails: emails,
    };
  }
};

module.exports = sendEmails;
