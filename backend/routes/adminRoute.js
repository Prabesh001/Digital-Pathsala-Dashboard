const { Admin } = require("../Schema/schema");
const bcrypt = require("bcryptjs");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password || !name) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
    });

    await newAdmin.save();
    res.status(201).json({ message: "Admin added successfully", newAdmin });
  } catch (err) {
    console.error("Error in adding Admin:", err);
    res.status(500).json({ message: err.message, error: err });
  }
});

router.get("/", async (req, res) => {
  try {
    const admin = await Admin.find();
    res.json(admin);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch Admin." });
  }
});

//login
router.post("/login", async (req, res) => {
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

    const user = { _id: admin._id, email: admin.email, name: admin.name };
    const token = jwt.sign(user, process.env.SECRET_KEY);
    res.json({ message: "Login successful!", token: token });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

router.get("/verify", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token found" });
  }
  const myToken = token.split(" ")[1];

  jwt.verify(myToken, process.env.SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid or expired token" });
    }

    res.json({ message: "User is authenticated", user: decoded });
  });
});

router
  .route("/:email")
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

module.exports = router;
