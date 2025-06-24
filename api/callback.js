export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) {
    return res.status(400).send('Missing authorization code');
  }

  const tokenUrl = 'https://account.withings.com/oauth2/token';

  const params = new URLSearchParams({
    action: 'requesttoken',
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    redirect_uri: 'https://withings-to-gsheet.vercel.app/api/callback',
  });

  try {
    const response = await fetch(tokenUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: params.toString(),
    });

    const rawText = await response.text(); // <-- important
    console.log('RAW RESPONSE FROM WITHINGS:', rawText); // log pour débogage

    res.status(response.status).send(`<pre>${rawText}</pre>`); // affichage brut dans navigateur
  } catch (err) {
    console.error('Error fetching token:', err);
    res.status(500).send('Server error during token exchange');
  }
}



