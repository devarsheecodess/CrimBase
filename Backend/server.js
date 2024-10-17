const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

// Models
const User = require("./Models/User");
const Criminal = require("./Models/Criminal");
const Face = require("./Models/Faces");
const Fingerprint = require("./Models/Fingerprint");
const DNA = require("./Models/DNA");

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

const cors = require("cors");
app.use(cors());

// Increase the limit of request body size
app.use(express.json({ limit: "10mb" })); // Adjust the limit as needed
app.use(express.urlencoded({ extended: true, limit: "10mb" })); // Adjust the limit as needed

// Connect MongoDB
mongoose
  .connect(process.env.MONGO_URI, {
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

// Register a new user
app.post("/register", async (req, res) => {
  console.log("Request body:", req.body); // Log request body

  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(400)
      .json({
        success: false,
        message: "User registration failed",
        error: error.message,
      });
  }
});

// Login
app.post("/login", async (req, res) => {
  const { policeID, password } = req.body;

  try {
    const user = await User.findOne({ policeID });

    if (user) {
      if (user.password === password) {
        // Create a JWT token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
          expiresIn: "2h",
        });
        res.json({ success: true, token, role: user.role, id: user.id });
      } else {
        res
          .status(401)
          .json({ success: false, message: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error during login:", err); // Detailed error log
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Check role of the user
app.post("/role", async (req, res) => {
  const { id } = req.body;

  try {
    const user = await User.findOne({ id: id });
    if (user) {
      res.json({ success: true, role: user.role });
    } else {
      res.status(404).json({ success: false, message: "User not found" });
    }
  } catch (err) {
    console.error("Error during role check:", err);
    res.status(500).json({ success: false, message: "An error occurred" });
  }
});

// Post Criminals
app.post("/criminals", async (req, res) => {
  const { data } = req.body;
  try {
    const criminal = new Criminal(data);
    await criminal.save();
    res.status(201).json({ success: true, criminal });
  } catch (error) {
    console.error("Error adding criminal:", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to add criminal",
        error: error.message,
      });
  }
});

// Get criminals
app.get("/criminals", async (req, res) => {
  try {
    const criminals = await Criminal.find();
    res.json(criminals);
  } catch (error) {
    console.error("Error fetching criminals:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch criminals",
        error: error.message,
      });
  }
});

// Get criminal by ID
app.get("/criminal", async (req, res) => {
  const { id } = req.query;
  try {
    const criminal = await Criminal.findOne({id: id});
    res.json(criminal);
  } catch (error) {
    console.error("Error fetching criminal:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch criminal",
        error: error.message,
      });
  }
});

// Post Criminals on DNA
app.post("/dna", async (req, res) => {
  const { data } = req.body;
  try {
    const criminal = new DNA(data);
    await criminal.save();
    res.status(201).json({ success: true, criminal });
  } catch (error) {
    console.error("Error adding criminal:", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to add criminal",
        error: error.message,
      });
  }
});

// Get DNA
app.get("/dna", async(req, res) => {
  const { dna } = req.query;
  try {
    const criminals = await Criminal.find({ dna: dna });
    res.json(criminals);
  } catch (error) {
    console.error("Error fetching criminals:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch criminals",
        error: error.message,
      });
  }
})

// Post Faces
app.post("/faces", async (req, res) => {
  const { data } = req.body;
  try {
    const face = new Face(data);
    await face.save();
    res.status(201).json({ success: true, face });
  } catch (error) {
    console.error("Error adding face:", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to add face",
        error: error.message,
      });
  }
});

// Post Fingerprints
app.post("/fingerprints", async (req, res) => {
  const { data } = req.body;
  try {
    const fingerprint = new Fingerprint(data);
    await fingerprint.save();
    res.status(201).json({ success: true, fingerprint });
  } catch (error) {
    console.error("Error adding fingerprint:", error);
    res
      .status(400)
      .json({
        success: false,
        message: "Failed to add fingerprint",
        error: error.message,
      });
  }
});

// Get Criminals
app.get("/criminals", async (req, res) => {
  const { name } = req.query;
  try {
    // Search criminals by name, using a case-insensitive regular expression
    const criminals = await Criminal.find({ name: name });
    res.json(criminals);
  } catch (error) {
    console.error("Error fetching criminals:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Failed to fetch criminals",
        error: error.message,
      });
  }
});

app.listen(port, () => {
  console.log(`App listening on http://localhost:${port}`);
});
