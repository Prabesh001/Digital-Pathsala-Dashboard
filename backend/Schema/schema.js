const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: false,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    phone: {
      type: String,
      required: [true, "Phone number is required"],
      match: [/^\+?[1-9]\d{1,14}$/, "Invalid phone number format"],
    },
    course: {
      type: String,
      required: [true, "Course is required"],
      enum: ["999 Offer", "MERN", "Python"],
    },
    status: {
      type: String,
      required: [true, "Status is required"],
      enum: ["Purchased", "Pending", "Follow Up"],
    },
    date: {
      type: String,
      required: false,
    },
    remarks: {
      type: String,
      required: false,
    },
  },
  { collection: "Students", versionKey: false }
);

const Student = mongoose.model("Students", studentSchema);

const adminSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Phone number is required"],
    },
  },
  { collection: "Admin", versionKey: false }
);

const Admin = mongoose.model("Admin", adminSchema);

module.exports = { Student, Admin };
