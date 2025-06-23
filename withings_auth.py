import urllib.parse

client_id = "adedd8796cafe7289eb0ae3928782775314440307d644fe359c34746fae216b2"
redirect_uri = "http://localhost:5678/callback"  # ex: http://localhost:8080/callback ou https://ton-ngrok-url/rest/oauth2-credential/callback
scope = "user.metrics"
state = "random_state_string"

base_url = "https://account.withings.com/oauth2_user/authorize2"

params = {
    "response_type": "code",
    "client_id": client_id,
    "scope": scope,
    "redirect_uri": redirect_uri,
    "state": state,
}

url = base_url + "?" + urllib.parse.urlencode(params)

print("Va sur cette URL dans ton navigateur pour autoriser l'application :")
print(url)
