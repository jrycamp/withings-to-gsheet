export default function handler(req, res) {
  const { code, state } = req.query;
  if (!code) {
    return res.status(400).send('Missing code parameter');
  }
  // Juste pour vérifier qu'on reçoit bien le code
  res.status(200).json({ message: 'Callback reçu !', code, state });
}
