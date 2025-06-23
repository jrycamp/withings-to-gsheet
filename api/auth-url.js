export default function handler(req, res) {
  const clientId = process.env.CLIENT_ID; // à définir dans Vercel
  const redirectUri = process.env.REDIRECT_URI; // à définir aussi (ex: https://withings-to-gsheet.vercel.app/api/callback)
  const scope = "user.metrics"; // adapte selon ce que tu veux
  const state = "some_random_state_string"; // idéalement générer un truc aléatoire pour la sécurité
  
  if (!clientId || !redirectUri) {
    res.status(500).json({ error: "Missing CLIENT_ID or REDIRECT_URI env variables" });
    return;
  }

  const authUrl = new URL("https://account.withings.com/oauth2_user/authorize2");
  authUrl.searchParams.append("response_type", "code");
  authUrl.searchParams.append("client_id", clientId);
  authUrl.searchParams.append("redirect_uri", redirectUri);
  authUrl.searchParams.append("scope", scope);
  authUrl.searchParams.append("state", state);

  res.status(200).json({ url: authUrl.toString() });
}
