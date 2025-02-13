const axios = require("axios")

const sendEmails = async (emails) => {
  try {
    if (!emails.length) {
      console.log("No emails to send.");
      return;
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

    return response.data;
  } catch (err) {
    console.error("Error sending emails:", err);
    throw err;
  }
};

module.exports = sendEmails;