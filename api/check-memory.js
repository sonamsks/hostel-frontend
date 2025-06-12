export default async function handler(req, res) {
  const memoryUsed = process.memoryUsage().heapUsed / 1024 / 1024;
  const usedMB = Math.round(memoryUsed);
  const MEMORY_THRESHOLD_MB = 800;

  if (usedMB > MEMORY_THRESHOLD_MB) {
    const chatWebhook = "https://chat.googleapis.com/v1/spaces/AAQAf0APmM0/messages?key=AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI&token=2sQGr6oMZSmZ-OtiFhD9_e8SVi1qTorcf94ZClZeCC0";

    await fetch(chatWebhook, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        text: `🚨 Memory Alert!\nUsed: ${usedMB} MB\nThreshold: ${MEMORY_THRESHOLD_MB} MB`,
      }),
    });
  }

  res.status(200).json({ status: "Memory checked", usedMB });
}
