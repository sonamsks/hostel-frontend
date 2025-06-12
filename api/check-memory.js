export default function handler(req, res) {
  const memoryUsedMB = Math.round(process.memoryUsage().heapUsed / 1024 / 1024);

  res.status(200).json({
    timestamp: new Date().toISOString(),
    memoryUsedMB
  });
}
