const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

const PORT = 8080;

const TEXTBEE_API_URL =
  "https://api.textbee.dev/api/v1/gateway/send-sms";

/*
|--------------------------------------------------------------------------
| Health Check
|--------------------------------------------------------------------------
*/

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "SafeHer Backend is running",
  });
});

/*
|--------------------------------------------------------------------------
| Send SMS using TextBee
|--------------------------------------------------------------------------
*/

async function sendEmergencySMS({
  phoneNumber,
  message,
}) {
  try {
    const response = await fetch(TEXTBEE_API_URL, {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        "x-api-key": process.env.TEXTBEE_API_KEY,
      },

      body: JSON.stringify({
        deviceId: process.env.TEXTBEE_DEVICE_ID,

        recipients: [phoneNumber],

        message: message,
      }),
    });

    const data = await response.json();

    console.log("📨 TextBee response:", data);

    if (!response.ok) {
      throw new Error(
        data?.message ||
          `TextBee error: ${response.status}`
      );
    }

    return data;

  } catch (error) {
    console.error(
      "❌ SMS sending failed:",
      error
    );

    throw error;
  }
}

/*
|--------------------------------------------------------------------------
| SOS API
|--------------------------------------------------------------------------
*/

app.post("/api/sos", async (req, res) => {
  try {
    const {
      user,
      latitude,
      longitude,
      locationUrl,
      contacts,
      timestamp,
    } = req.body;

    console.log("\n====================================");
    console.log("🚨 SOS RECEIVED");
    console.log("====================================");

    console.log("👤 User:", user);

    console.log("📍 Latitude:", latitude);

    console.log("📍 Longitude:", longitude);

    console.log("🗺️ Location:", locationUrl);

    console.log("📞 Contacts:", contacts);

    /*
    |--------------------------------------------------------------------------
    | Choose emergency number
    |--------------------------------------------------------------------------
    */

    const emergencyNumber =
      process.env.EMERGENCY_PHONE_NUMBER ||
      contacts?.[0]?.phone;

    if (!emergencyNumber) {
      return res.status(400).json({
        success: false,
        message: "No emergency phone number configured",
      });
    }

    /*
    |--------------------------------------------------------------------------
    | Create SOS message
    |--------------------------------------------------------------------------
    */

    const message =
      `🚨 SAFEHER SOS ALERT!\n\n` +
      `${user?.name || "SafeHer user"} needs help.\n\n` +
      `📍 Current location:\n` +
      `${locationUrl}\n\n` +
      `Latitude: ${latitude}\n` +
      `Longitude: ${longitude}\n\n` +
      `⏰ Time: ${timestamp}`;

    console.log("\n📨 Sending SMS to:");
    console.log(emergencyNumber);

    console.log("\n💬 Message:");
    console.log(message);

    /*
    |--------------------------------------------------------------------------
    | Send SMS automatically
    |--------------------------------------------------------------------------
    */

    const smsResult = await sendEmergencySMS({
      phoneNumber: emergencyNumber,
      message,
    });

    console.log("\n✅ SMS SENT SUCCESSFULLY");

    /*
    |--------------------------------------------------------------------------
    | Response
    |--------------------------------------------------------------------------
    */

    res.status(200).json({
      success: true,

      message: "SOS received and SMS sent successfully",

      sos: {
        user,
        latitude,
        longitude,
        locationUrl,
        contacts,
        timestamp,
      },

      sms: {
        sent: true,
        recipient: emergencyNumber,
        result: smsResult,
      },
    });

  } catch (error) {
    console.error("\n❌ SOS ERROR:", error);

    res.status(500).json({
      success: false,
      message: "SOS received but SMS could not be sent",
      error: error.message,
    });
  }
});

/*
|--------------------------------------------------------------------------
| Start Server
|--------------------------------------------------------------------------
*/

app.listen(PORT, () => {
  console.log(
    `🛡️ SafeHer Backend running at http://localhost:${PORT}`
  );
});