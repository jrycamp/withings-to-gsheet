import fetch from 'node-fetch';

export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).json({ error: 'No code provided' });
  }

  try {
    const params = new URLSearchParams();
    params.append('action', 'requesttoken');
    params.append('client_id', process.env.CLIENT_ID);
    params.append('client_secret', process.env.CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', process.env.REDIRECT_URI);

    const response = await fetch('https://wbsapi.withings.net/v2/oauth2', {
      method: 'POST',
      body: params,
    });

    const data = await response.json();

    if (data.status !== 0) {
      return res.status(400).json({ error: 'Withings API error', details: data });
    }

    // Ici tu peux enregistrer le token dans une DB ou variable d’environnement si besoin

    return res.status(200).json({
      message: 'Access token successfully retrieved',
      access_token: data.body.access_token,
      refresh_token: data.body.refresh_token,
      expires_in: data.body.expires_in,
      userid: data.body.userid,
    });

  } catch (error) {
    return res.status(500).json({ error: 'Internal server error', details: error.message });
  }
}
