#!/bin/bash
# Checks image upload. The server must be running on port 5001 (npm run dev in another terminal).
# This uploads a few tiny test pictures to your Cloudinary account. The test property is deleted
# at the end, and its pictures are removed from Cloudinary with it.

AUTH=http://localhost:5001/api/auth
API=http://localhost:5001/api/properties
STAMP=$(date +%s)
JSON_HEADER="Content-Type: application/json"

TMP_DIR=$(mktemp -d)
IMG1="$TMP_DIR/one.png"
IMG2="$TMP_DIR/two.png"
IMG3="$TMP_DIR/three.png"
NOT_IMAGE="$TMP_DIR/notes.txt"

# A 1x1 pixel PNG picture.
PNG_B64="iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNkYPhfDwAChwGA60e6kgAAAABJRU5ErkJggg=="
for file in "$IMG1" "$IMG2" "$IMG3"; do
  printf '%s' "$PNG_B64" | base64 -d > "$file" 2>/dev/null || printf '%s' "$PNG_B64" | base64 -D > "$file"
done
echo "This is not a picture." > "$NOT_IMAGE"

HOST_BODY='{"name":"Image Host","email":"imghost'"$STAMP"'@example.com","password":"secret123","role":"host"}'
OTHER_BODY='{"name":"Other Host","email":"imgother'"$STAMP"'@example.com","password":"secret123","role":"host"}'

FIELDS=(
  --form-string "title=Image test cottage"
  --form-string "description=A cottage used for the image test."
  --form-string "location=Test City"
  --form-string "propertyType=Cottage"
  --form-string "pricePerNight=3000"
  --form-string 'amenities=["WiFi","Parking"]'
  --form-string "maxGuests=4"
)

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

count_images() {
  echo "$BODY" | grep -o '"publicId"' | wc -l | tr -d ' '
}

check_count() {
  ACTUAL=$(count_images)
  if [ "$ACTUAL" = "$2" ]; then
    echo "PASS  $1 ($ACTUAL)"
  else
    echo "FAIL  $1 (expected $2, got $ACTUAL)"
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

request -X POST "$API" -H "Authorization: Bearer $HOST_TOKEN" "${FIELDS[@]}" -F "images=@$IMG1;type=image/png" -F "images=@$IMG2;type=image/png"
check "Host creates a property with 2 pictures" 201
check_count "The property has 2 saved pictures" 2
PROPERTY_ID=$(echo "$BODY" | sed -E 's/.*"_id":"([^"]+)".*/\1/')
FIRST_PUBLIC_ID=$(echo "$BODY" | sed -E 's/.*"publicId":"([^"]+)".*/\1/')

if echo "$BODY" | grep -q "res.cloudinary.com"; then
  echo "PASS  The pictures are stored on Cloudinary"
else
  echo "FAIL  The pictures are not Cloudinary links"
fi

request -X POST "$API" -H "Authorization: Bearer $HOST_TOKEN" "${FIELDS[@]}" -F "images=@$NOT_IMAGE;type=text/plain"
check "A text file is rejected" 400

request -X POST "$API" -H "Authorization: Bearer $HOST_TOKEN" "${FIELDS[@]}" -F "images=@$IMG1;type=image/png" -F "images=@$IMG1;type=image/png" -F "images=@$IMG1;type=image/png" -F "images=@$IMG1;type=image/png" -F "images=@$IMG1;type=image/png" -F "images=@$IMG1;type=image/png"
check "Six pictures are rejected" 400

request -X PUT "$API/$PROPERTY_ID" -H "Authorization: Bearer $HOST_TOKEN" -F "images=@$IMG3;type=image/png"
check "Owner adds a third picture" 200
check_count "The property now has 3 pictures" 3

request -X PUT "$API/$PROPERTY_ID" -H "Authorization: Bearer $HOST_TOKEN" --form-string 'removeImages=["'"$FIRST_PUBLIC_ID"'"]'
check "Owner removes one picture" 200
check_count "The property now has 2 pictures" 2

request -X PUT "$API/$PROPERTY_ID" -H "Authorization: Bearer $OTHER_TOKEN" -F "images=@$IMG3;type=image/png"
check "Another host cannot add pictures" 403

request -X DELETE "$API/$PROPERTY_ID" -H "Authorization: Bearer $HOST_TOKEN"
check "Owner deletes the property" 200

rm -rf "$TMP_DIR"
