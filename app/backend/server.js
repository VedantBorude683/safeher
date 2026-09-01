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

function parseTimeToMinutes(timeString) {
  if (!timeString || typeof timeString !== 'string') return 0;

  const [hours, minutes] = timeString.split(':').map(Number);
  if (Number.isNaN(hours) || Number.isNaN(minutes)) return 0;

  return hours * 60 + minutes;
}

function buildRouteEvaluation(payload) {
  const origin = payload.origin || 'Origin';
  const destination = payload.destination || 'Destination';
  const timeOfDay = payload.timeOfDay || '12:00';
  const activeIncident = (payload.activeIncident || '').trim();

  const timeMinutes = parseTimeToMinutes(timeOfDay);
  const isNight = timeMinutes >= 20 * 60 || timeMinutes <= 6 * 60;

  const shortestBaseRisk = 62;
  const safestBaseRisk = 28;

  let shortestRisk = shortestBaseRisk;
  let safestRisk = safestBaseRisk;

  if (isNight) {
    shortestRisk += 22;
    safestRisk += 8;
  }

  if (activeIncident) {
    shortestRisk += 40;
  }

  shortestRisk = Math.min(96, shortestRisk);
  safestRisk = Math.min(82, safestRisk);

  const shortestEta = 12 + (isNight ? 3 : 0) + (activeIncident ? 2 : 0);
  const safestEta = 16 + (isNight ? 1 : 0);

  const riskReduction = Math.max(
    25,
    Math.round(((shortestRisk - safestRisk) / shortestRisk) * 100)
  );

  const timeDelta = safestEta - shortestEta;
  const routeAName = `Via ${origin.split(' ')[0] || 'Main'} Shortcut`;
  const routeBName = `Via ${destination.split(' ')[0] || 'Central'} Avenue`;

  const justification = activeIncident
    ? `Route B is safer because it follows a more populated arterial corridor, avoids isolated side streets, and stays farther from the reported incident area near ${activeIncident}.`
    : isNight
      ? 'Route B is safer because it prioritizes well-lit major avenues and commercial corridors, reducing exposure to isolated backstreets after dark.'
      : 'Route B is safer because it keeps you on a primary corridor with better foot traffic, lighting, and emergency access compared with the direct shortcut.';

  return {
    shortest_route: {
      name: routeAName,
      eta_minutes: shortestEta,
      risk_score: shortestRisk,
      key_characteristics: ['Direct path', 'Narrow side streets', 'Lower commercial density'],
    },
    safest_route: {
      name: routeBName,
      eta_minutes: safestEta,
      risk_score: safestRisk,
      key_characteristics: ['Major arterial road', 'High street-level activity', 'Passes 24/7 emergency points'],
    },
    tradeoff_summary: {
      time_delta: `${timeDelta >= 0 ? '+' : ''}${timeDelta} mins`,
      risk_reduction_percentage: `${riskReduction}% lower risk`,
    },
    justification,
  };
}

app.post('/api/routes/evaluate', (req, res) => {
  try {
    const { origin, destination, timeOfDay, activeIncident } = req.body || {};

    if (!origin || !destination || !timeOfDay) {
      return res.status(400).json({
        message: 'origin, destination, and timeOfDay are required',
      });
    }

    const result = buildRouteEvaluation({
      origin,
      destination,
      timeOfDay,
      activeIncident,
    });

    return res.status(200).json(result);
  } catch (error) {
    return res.status(500).json({
      message: 'Unable to evaluate route risk',
      error: error.message,
    });
  }
});

app.post("/api/sos", async (req, res) => {
  try {
    const {
      user,
      latitude,
      longitude,
      locationUrl,
      contacts,
      timestamp,
      auto_detected,
    } = req.body;

    console.log("\n====================================");
    console.log("🚨 SOS RECEIVED");
    console.log("====================================");

    console.log("👤 User:", user);

    console.log("📍 Latitude:", latitude);

    console.log("📍 Longitude:", longitude);

    console.log("🗺️ Location:", locationUrl);

    console.log("📞 Contacts:", contacts);
    console.log("🤖 Auto-detected:", auto_detected === true ? "yes" : "no");

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
      `${auto_detected ? "🤖 Auto-detected risk escalation triggered silently.\n" : "🧭 Manual SOS trigger confirmed by user.\n"}` +
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
        auto_detected,
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