import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code } = req.query;
  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    // Log des paramètres envoyés pour débogage
    console.log({
      grant_type: 'authorization_code',
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET ? '****' : undefined,
      code,
      redirect_uri: process.env.REDIRECT_URI,
    });

    const response = await fetch('https://account.withings.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        grant_type: 'authorization_code',
        client_id: process.env.CLIENT_ID,
        client_secret: process.env.CLIENT_SECRET,
        code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
    });

    const data = await response.json();

    if (data.status !== 0) {
      return res.status(400).json({ error: data.error || 'Failed to get token', data });
    }

    // TODO : sauvegarder le token dans une DB, cache, ou stockage sécurisé

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}



