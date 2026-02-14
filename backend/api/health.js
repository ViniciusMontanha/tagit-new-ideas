export default function handler(_req, res) {
  res.status(200).json({
    status: "OK",
    timestamp: new Date().toISOString(),
    brevoConfigured: !!process.env.BREVO_API_KEY,
  });
}
