const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();
app.use(bodyParser.json());
app.use(cors());

const corsOptions = {
    origin: "https://tsuisl-tax-regime.netlify.app",
};
app.use(cors(corsOptions));


// Connect to MySQL
require('dotenv').config();
const mysql = require('mysql2');

const db = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

db.connect((err) => {
    if (err) {
        console.error('Database connection failed:', err.stack);
        return;
    }
    console.log('Connected to MySQL database!');
});

// Default route
app.get("/", (req, res) => {
    res.send("Welcome to the Tax Regime backend!");
});

// Sign up API
app.post("/signup", (req, res) => {
    console.log("Signup request received:", req.body); // Logs incoming data
    const { userId, userName, email, contactNo, password } = req.body;
    const query = "INSERT INTO users (userId, userName, email, contactNo, password) VALUES (?, ?, ?, ?, ?)";


    db.query(query, [userId, userName, email, contactNo, password], (err, result) => {
        if (err) {
            console.error("Database Error:", err.message); // Logs database errors
            res.status(400).send("Error creating user: " + err.message);
        } else {
            console.log("User created successfully:", result); // Logs success
            res.status(201).send("User created successfully!");
        }
    });
});

// Login API
app.post("/login", (req, res) => {
    const { userId, password } = req.body;
    const query = "SELECT * FROM users WHERE userId = ? AND password = ?";

    db.query(query, [userId, password], (err, results) => {
        if (err) {
            console.error("Database Error:", err.message);
            res.status(500).send("Error logging in: " + err.message);
        } else if (results.length > 0) {
            const user = results[0]; // Extract the first result (user data)
            res.status(200).json({ userName: user.userName }); // Send the name back to the client
        } else {
            res.status(401).send("Invalid credentials.");
        }
    });
});

// Change Password API

app.post("/change-password", (req, res) => {
  const { userId, currentPassword, newPassword } = req.body;

  // Check if userId and currentPassword are correct
  const verifyQuery = "SELECT * FROM users WHERE userId = ? AND password = ?";
  db.query(verifyQuery, [userId, currentPassword], (err, results) => {
    if (err) {
      console.error("Database error:", err.message);
      return res.status(500).send("Server error.");
    }

    if (results.length === 0) {
      return res.status(401).send("Invalid user ID or current password.");
    }

    // Update the password
    const updateQuery = "UPDATE users SET password = ? WHERE userId = ?";
    db.query(updateQuery, [newPassword, userId], (err, results) => {
      if (err) {
        console.error("Database error:", err.message);
        return res.status(500).send("Error updating password.");
      }

      res.status(200).send("Password updated successfully.");
    });
  });
});

//My Tax Regime
//Save User Data

app.post("/save-user-data", (req, res) => {
    const { userId, pno, name, level } = req.body;

    if (!userId || !pno || !name || !level) {
        return res.status(400).send("All fields are required.");
    }

    const query = "INSERT INTO tax_regime (userId, pno, name, level) VALUES (?, ?, ?, ?)";
    db.query(query, [userId, pno, name, level], (err, result) => {
        if (err) {
            console.error("Error saving data:", err.message);
            return res.status(500).send("Error saving data.");
        }
        res.status(200).send("Data saved successfully.");
    });
});

//Get User Data

app.post("/get-user-data", (req, res) => {
    const { userId } = req.body;

    const query = "SELECT pno, name, level FROM tax_regime WHERE userId = ?";
    db.query(query, [userId], (err, results) => {
        if (err) {
            console.error("Error fetching data:", err.message);
            return res.status(500).send("Error fetching data.");
        }

        if (results.length > 0) {
            res.status(200).json(results[0]);
        } else {
            res.status(404).send("No data found.");
        }
    });
});




// Start server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
