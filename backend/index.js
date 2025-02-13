require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Port = process.env.PORT;
const Student = require("./Schema/schema");
const schedule = require("node-schedule");
const sendEmails = require("./email/scheduledEmail");
const emailRoutes = require("./email/emailRoutes");
const studentRoute = require("./routes/studentRoute");
const adminRoute = require("./routes/adminRoute");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

app.use("/api", emailRoutes);
app.use("/api", studentRoute);
app.use("/api", adminRoute);

const getMail = async () => {
  try {
    const students = await Student.find({ status: { $ne: "Purchased" } });

    if (!students.length) {
      return [];
    }

    return students.map((student) => student.email);
  } catch (err) {
    console.log("Error fetching emails:", err);
    return [];
  }
};

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 6;
rule.hour = 18;
rule.minute = 0;
rule.second = 0;

const job = schedule.scheduleJob(rule, async () => {
  try {
    const emails = await getMail();

    if (emails.length > 0) {
      await sendEmails(emails);
    } else {
      console.log("No emails to send.");
    }
  } catch (err) {
    console.log("Error:", err.message);
  }
});

app.listen(Port, () => console.log(`Server running at Port ${Port}`));
