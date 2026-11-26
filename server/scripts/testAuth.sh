#!/bin/bash
# Checks the auth API. The server must be running on port 5001 (npm run dev in another terminal).
# Each run creates one test user in the database (the email is different every time).

BASE=http://localhost:5001/api/auth
EMAIL="test$(date +%s)@example.com"
JSON_HEADER="Content-Type: application/json"

REGISTER_BODY='{"name":"Test User","email":"'"$EMAIL"'","password":"secret123"}'
NO_PASSWORD_BODY='{"name":"No Password","email":"other'"$EMAIL"'"}'
WRONG_PASSWORD_BODY='{"email":"'"$EMAIL"'","password":"wrongpass"}'
LOGIN_BODY='{"email":"'"$EMAIL"'","password":"secret123"}'
OBJECT_EMAIL_BODY='{"email":{"$gt":""},"password":"x"}'

# Sends a request and keeps the response body in BODY and the status code in CODE.
request() {
  RESPONSE=$(curl -s -w "\n%{http_code}" "$@")
  CODE=$(echo "$RESPONSE" | tail -n 1)
  BODY=$(echo "$RESPONSE" | sed '$d')
}

# Compares the status code of the last request with the expected one.
check() {
  if [ "$CODE" = "$2" ]; then
    echo "PASS  $1 (status $CODE)"
  else
    echo "FAIL  $1 (expected $2, got $CODE)"
    echo "      server said: $BODY"
  fi
}

request -X POST "$BASE/register" -H "$JSON_HEADER" -d "$REGISTER_BODY"
check "Register a new user" 201

request -X POST "$BASE/register" -H "$JSON_HEADER" -d "$REGISTER_BODY"
check "Register with the same email again" 400

request -X POST "$BASE/register" -H "$JSON_HEADER" -d "$NO_PASSWORD_BODY"
check "Register without a password" 400

request -X POST "$BASE/login" -H "$JSON_HEADER" -d "$WRONG_PASSWORD_BODY"
check "Login with a wrong password" 401

request -X POST "$BASE/login" -H "$JSON_HEADER" -d "$LOGIN_BODY"
check "Login with the correct password" 200
TOKEN=$(echo "$BODY" | sed -E 's/.*"token":"([^"]+)".*/\1/')

request -X POST "$BASE/login" -H "$JSON_HEADER" -d "$OBJECT_EMAIL_BODY"
check "Login with an object instead of an email" 400

request "$BASE/me"
check "Get /me without a token" 401

request "$BASE/me" -H "Authorization: Bearer abc"
check "Get /me with a bad token" 401

request "$BASE/me" -H "Authorization: Bearer $TOKEN"
check "Get /me with a valid token" 200

PASSWORD_LINES=$(echo "$BODY" | grep -c password)
if [ "$PASSWORD_LINES" = "0" ]; then
  echo "PASS  Password is not returned by /me"
else
  echo "FAIL  Password is returned by /me"
fi
