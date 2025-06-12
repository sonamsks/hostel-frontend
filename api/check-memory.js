export default async function handler(req, res) {
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  const usedMB = Math.round(memoryUsed);

  console.log(`Memory Used: ${usedMB} MB`);

  const MEMORY_THRESHOLD_MB = 50; // Set your limit

  if (usedMB > MEMORY_THRESHOLD_MB) {
    const chatWebhook = "https://chat.googleapis.com/v1/spaces/AAQAf0APmM0/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2sQGr6oMZSmZ-OtiFhD9_e8SVi1qTorcf94ZClZeCC0";

    const message = {
      text: `🚨 *Memory Alert!*\n> Used: ${usedMB} MB\n> Threshold: ${MEMORY_THRESHOLD_MB} MB\n> Environment: Vercel`,
    };

    try {
      const response = await fetch(chatWebhook, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(message),
      });

      if (!response.ok) {
        console.error("Google Chat alert failed", await response.text());
      } else {
        console.log("Memory alert sent to Google Chat.");
      }
    } catch (err) {
      console.error("Error sending alert to Google Chat:", err);
    }
  }

  res.status(200).json({ status: "Memory checked", usedMB });
}
