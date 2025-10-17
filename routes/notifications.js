// routes/notifications.js
const express = require("express");
const webpush = require("web-push");
const twilio = require("twilio");
const router = express.Router();

const Doctor = require("../Models/Doctor.js");

// Endpoint to test notification sending
router.post("/test", async (req, res) => {
  const { doctorId, message, phone } = req.body;    

  try {
    const io = req.app.get("io"); // socket.io instance
    // const Doctor = req.app.get("Doctor"); // your Mongoose model (if available)

    // 1️⃣ Realtime emit
    if (io) {
      io.to(`doctor_${doctorId}`).emit("notification", { message });
      console.log("✅ Socket event emitted to doctor:", doctorId);
    }

    // 2️⃣ SMS via Twilio
    if (
      process.env.TWILIO_ACCOUNT_SID &&
      process.env.TWILIO_AUTH_TOKEN &&
      process.env.TWILIO_FROM
    ) {
      const client = twilio(
        process.env.TWILIO_ACCOUNT_SID,
        process.env.TWILIO_AUTH_TOKEN
      );
      const to = phone || (await Doctor.findById(doctorId))?.phone;
      if (to) {
        await client.messages.create({
          body: `[GaonCare] ${message}`,
          from: process.env.TWILIO_FROM,
          to: `+91${to}` // <-- make sure +91 lagao yaha
        });
        console.log("✅ SMS sent to", to);
      }
    }

    // 3️⃣ Web Push
    const doctor = await Doctor.findById(doctorId);
    if (doctor?.pushSubscription) {
      webpush.setVapidDetails(
        process.env.VAPID_SUBJECT,
        process.env.VAPID_PUBLIC_KEY,
        process.env.VAPID_PRIVATE_KEY
      );

      await webpush.sendNotification(
        doctor.pushSubscription,
        JSON.stringify({
          title: "GaonCare Alert",
          body: message,
        })
      );
      console.log("✅ Web Push sent");
    }

    res.json({ success: true, message: "Test notification triggered" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
