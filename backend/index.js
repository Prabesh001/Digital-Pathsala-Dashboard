require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Port = process.env.PORT;
const { Student, Admin } = require("./Schema/schema");
const bcrypt = require("bcryptjs");
const emailRoutes = require("./email/emailRoutes");
const schedule = require("node-schedule");
const sendEmails = require("./email/scheduledEmail");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

app.use("/api", emailRoutes);

app.get("/api/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

app
  .route("/api/students/:id")
  .get(async (req, res) => {
    try {
      const _id = req.params.id;
      const student = await Student.findOne({ _id });
      if (!student) {
        return res.status(404).json({ message: "Student not found" });
      }
      res.json(student);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .patch(async (req, res) => {
    try {
      const _id = req.params.id;
      const updatedItem = await Student.findOneAndUpdate(
        { _id },
        { $set: req.body },
        { new: true }
      );

      if (!updatedItem) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json(updatedItem);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const _id = req.params.id;
      const deleteId = await Student.findOneAndDelete({ _id });

      if (!deleteId) {
        return res.status(404).json({ message: "Student not found" });
      }

      res.json({ message: "Deleted Student:", deleteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

app.post("/api/students", async (req, res) => {
  try {
    const { name, email, phone, course, status, date, remarks } = req.body;
    if (!email || !phone || !course || !status || !date || !remarks) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newStudent = new Student({
      name,
      email,
      phone,
      course,
      date,
      status,
      remarks,
    });

    await newStudent.save();
    res.status(201).json({ message: "Student added successfully", newStudent });
  } catch (err) {
    console.error("Error in adding Student:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

//Admin
app.post("/api/admin", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword, // Use hashed password
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully", newAdmin });
  } catch (err) {
    console.error("Error in adding Admin:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

app.get("/api/admin", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Admin." });
  }
});

app
  .route("/api/admin/:email")
  .get(async (req, res) => {
    try {
      const { email } = req.params;
      const admin = await Admin.findOne({ email: email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }
      res.json(admin);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  })
  .delete(async (req, res) => {
    try {
      const { email } = req.params;
      const deleteId = await Admin.findOneAndDelete({ email: email });

      if (!deleteId) {
        return res.status(404).json({ message: "Admin not found" });
      }

      res.json({ message: "Deleted Admin:", deleteId });
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  });

//login
app.post("/api/admin/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(404).json({ error: "No user found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ error: "Incorrect email or password" });
    }

    res.json({ message: "Login successful!", admin });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

//Send mail at 5pm every Saturday
const getMail = async () => {
  try {
    const students = await Student.find({ status: { $ne: "Purchased" } });

    if (!students.length) {
      console.log("No students found.");
      return [];
    }

    return students.map((student) => student.email);
  } catch (err) {
    console.log("Error fetching emails:", err);
    return [];
  }
};

const rule = new schedule.RecurrenceRule();
rule.dayOfWeek = 4;
rule.hour = 20;
rule.minute = 20;
rule.second = 50;

const job = schedule.scheduleJob(rule, async () => {
  console.log("Sending Emails at 5 pm on Sunday");

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
