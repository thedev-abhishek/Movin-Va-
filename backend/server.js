const express = require("express");
const cors = require("cors");
const { Resend } = require("resend");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Resend Setup
const resend = new Resend(process.env.RESEND_API_KEY);

// Test Route
app.get("/", (req, res) => {
  res.send("Backend Running Successfully");
});

// Contact Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, service, message } = req.body;

    // Validation
    if (!name || !email || !service || !message) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    // Send Email using Resend
    const response = await resend.emails.send({
  from: "Movin Va <hello@movinva.com>",
  to: "hello@movinva.com",
  replyTo: email,
  subject: `New Contact Form Message - ${service}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><b>Name:</b> ${name}</p>
    <p><b>Email:</b> ${email}</p>
    <p><b>Service:</b> ${service}</p>
    <p><b>Message:</b></p>
    <p>${message}</p>
  `,
});


    res.status(200).json({
      success: true,
      message: "Message sent successfully",
    });

  } catch (error) {
    console.log("Email Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to send message",
      error: error.message,
    });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});