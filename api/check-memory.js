export default async function handler(req, res) {
  const memoryUsedMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);
  const timestamp = new Date().toISOString();

  // Replace this with your actual Google Chat webhook URL
  #const GOOGLE_CHAT_WEBHOOK = "https://chat.googleapis.com/v1/spaces/AAQAf0APmM0/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2sQGr6oMZSmZ-OtiFhD9_e8SVi1qTorcf94ZClZeCC0";

  try {
    // Send memory usage alert to Google Chat
    await fetch(GOOGLE_CHAT_WEBHOOK, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🧠 *Memory Usage Report*\nUsed: ${memoryUsedMB} MB\nTimestamp: ${timestamp}`
      }),
    });

    // Return memory usage in response
    res.status(200).json({
      timestamp,
      memoryUsedMB,
      status: "Sent to Google Chat"
    });

  } catch (error) {
    console.error("Failed to send message to Google Chat:", error);
    res.status(500).json({
      error: "Failed to send message to Google Chat",
      details: error.message
    });
  }
}

