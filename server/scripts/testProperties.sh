#!/bin/bash
# Checks the property API. The server must be running on port 5001 (npm run dev in another terminal).
# Each run creates three test users (two hosts and one guest). The test property is deleted at the end.

AUTH=http://localhost:5001/api/auth
API=http://localhost:5001/api/properties
STAMP=$(date +%s)
JSON_HEADER="Content-Type: application/json"

HOST_EMAIL="host$STAMP@example.com"
OTHER_EMAIL="otherhost$STAMP@example.com"
GUEST_EMAIL="guest$STAMP@example.com"

HOST_BODY='{"name":"Test Host","email":"'"$HOST_EMAIL"'","password":"secret123","role":"host"}'
OTHER_BODY='{"name":"Other Host","email":"'"$OTHER_EMAIL"'","password":"secret123","role":"host"}'
GUEST_BODY='{"name":"Test Guest","email":"'"$GUEST_EMAIL"'","password":"secret123","role":"guest"}'

PROPERTY_BODY='{"title":"Test cottage","description":"A cottage used for the API test.","location":"Test City","propertyType":"Cottage","pricePerNight":3000,"maxGuests":4,"amenities":["WiFi","Parking"]}'
INCOMPLETE_BODY='{"title":"Only a title"}'
UPDATE_BODY='{"pricePerNight":3500}'

# Sends a request and keeps the response body in BODY and the status code in CODE.
request() {
  RESPONSE=$(curl -s -w "\n%{http_code}" "$@")
  CODE=$(echo "$RESPONSE" | tail -n 1)
  BODY=$(echo "$RESPONSE" | sed '$d')
}

check() {
  if [ "$CODE" = "$2" ]; then
    echo "PASS  $1 (status $CODE)"
  else
    echo "FAIL  $1 (expected $2, got $CODE)"
    echo "      server said: $BODY"
  fi
}

contains() {
  if echo "$BODY" | grep -q "$2"; then
    echo "PASS  $1"
  else
    echo "FAIL  $1 (response did not contain: $2)"
    echo "      server said: $BODY"
  fi
}

get_token() {
  echo "$BODY" | sed -E 's/.*"token":"([^"]+)".*/\1/'
}

request -X POST "$AUTH/register" -H "$JSON_HEADER" -d "$HOST_BODY"
HOST_TOKEN=$(get_token)
request -X POST "$AUTH/register" -H "$JSON_HEADER" -d "$OTHER_BODY"
OTHER_TOKEN=$(get_token)
request -X POST "$AUTH/register" -H "$JSON_HEADER" -d "$GUEST_BODY"
GUEST_TOKEN=$(get_token)

request -X POST "$API" -H "$JSON_HEADER" -H "Authorization: Bearer $HOST_TOKEN" -d "$PROPERTY_BODY"
check "Host creates a property" 201
PROPERTY_ID=$(echo "$BODY" | sed -E 's/.*"_id":"([^"]+)".*/\1/')

request -X POST "$API" -H "$JSON_HEADER" -H "Authorization: Bearer $GUEST_TOKEN" -d "$PROPERTY_BODY"
check "Guest cannot create a property" 403

request -X POST "$API" -H "$JSON_HEADER" -d "$PROPERTY_BODY"
check "Creating a property without logging in" 401

request -X POST "$API" -H "$JSON_HEADER" -H "Authorization: Bearer $HOST_TOKEN" -d "$INCOMPLETE_BODY"
check "Creating a property with missing fields" 400

request "$API"
check "Anyone can list properties" 200
contains "The list contains the new property" "Test cottage"

request "$API/$PROPERTY_ID"
check "Anyone can open one property" 200

request "$API/not-a-real-id"
check "Opening a property with an invalid id" 404

request "$API/mine" -H "Authorization: Bearer $HOST_TOKEN"
check "Host lists their own properties" 200
contains "My properties contains the new property" "Test cottage"

request -X PUT "$API/$PROPERTY_ID" -H "$JSON_HEADER" -H "Authorization: Bearer $HOST_TOKEN" -d "$UPDATE_BODY"
check "Owner updates the property" 200
contains "The new price is saved" '"pricePerNight":3500'

request -X PUT "$API/$PROPERTY_ID" -H "$JSON_HEADER" -H "Authorization: Bearer $OTHER_TOKEN" -d "$UPDATE_BODY"
check "Another host cannot update it" 403

request -X DELETE "$API/$PROPERTY_ID" -H "Authorization: Bearer $OTHER_TOKEN"
check "Another host cannot delete it" 403

request -X DELETE "$API/$PROPERTY_ID" -H "Authorization: Bearer $HOST_TOKEN"
check "Owner deletes the property" 200

request "$API/$PROPERTY_ID"
check "The deleted property is gone" 404
