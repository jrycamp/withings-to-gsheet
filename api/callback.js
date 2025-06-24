export default async function handler(req, res) {
  const { code } = req.query;

  if (!code) return res.status(400).send('Missing authorization code');

  const params = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: process.env.CLIENT_ID,
    client_secret: process.env.CLIENT_SECRET,
    code,
    redirect_uri: 'https://withings-to-gsheet.vercel.app/api/callback',
  });

  try {
    const response = await fetch('https://account.withings.com/oauth2/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: params.toString(),
    });

    const text = await response.text();
    console.log('Response text:', text);

    if (!response.ok) return res.status(response.status).send(text);

    const json = JSON.parse(text);
    res.status(200).json(json);
  } catch (error) {
    console.error('Fetch error:', error);
    res.status(500).send('Server error');
  }
}




