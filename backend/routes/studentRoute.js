const {Student} = require("../Schema/schema");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const students = await Student.find();
    res.json(students);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch students." });
  }
});

router.post("/", async (req, res) => {
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

router
  .route("/:id")
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

module.exports = router;