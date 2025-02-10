require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");
const Port = process.env.PORT;
const Student = require("./Schema/schema");

app.use(express.json());
app.use(cors());

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Failed to connect to MongoDB Atlas:", err));

app.get("/students", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

app
  .route("/students/:id")
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

app.post("/students", async (req, res) => {
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

app.listen(Port, () => console.log(`Server running at Port ${Port}`));
