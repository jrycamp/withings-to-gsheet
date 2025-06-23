const fetch = require('node-fetch');

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const response = await fetch('https://wbsapi.withings.net/v2/oauth2/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.WITHINGS_CLIENT_ID,
        client_secret: process.env.WITHINGS_CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.status !== 0) {
      return res.status(400).json({ error: data.error || 'Failed to get token', data });
    }

    // Ici tu peux sauvegarder le token ou le renvoyer
    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}

