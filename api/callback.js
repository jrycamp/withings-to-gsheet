export default function handler(req, res) {
  const { code, state, error } = req.query;

  if (error) {
    return res.status(400).json({ error: error });
  }

  if (!code) {
    return res.status(400).json({ error: "No code provided" });
  }

  console.log("OAuth code reçu :", code);
  console.log("State :", state);

  res.status(200).json({ message: "Code reçu", code, state });
}
