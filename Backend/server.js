const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("./Models/User");
const jwt = require("jsonwebtoken");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require('cors');
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Connect MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/login", async (req, res) => {
  const { policeID, password } = req.body;

  try {
    const user = await User.findOne({ policeID });

    if (user) {
      if (user.password === password) {
        // Create a JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '2h' });
        res.json({ success: true, token, role: user.role, id1: user.id });
      } else {
        res.status(401).json({ success: false, message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err); // Detailed error log
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

//Check role of the user
app.post("/role", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({id: id})
    if (user) {
      res.json({success: true, role: user.role})
    } else {
      res.status(404).json({success: false, message: "User not found"})
    }
  } catch (err) {
    console.error("Error during role check:", err);
    res.status(500).json({success: false, message: "An error occurred"})
  }
});

// Get all users route (protected example)
app.get("/users", async (req, res) => {
  console.log("Fetching all users"); // Debug log

  // Check for token in Authorization header
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(' ')[1]; // Bearer token

  if (!token) return res.status(401).json({ success: false, message: "Unauthorized" });

  try {
    // Verify token
    jwt.verify(token, process.env.JWT_SECRET);

    // Token is valid, proceed to get users
    const users = await User.find();
    console.log("Users found:", users); // Debug log
    res.json(users);
  } catch (err) {
    console.error("Invalid or expired token:", err); // Detailed error log
    res.status(403).json({ success: false, message: "Forbidden" });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
