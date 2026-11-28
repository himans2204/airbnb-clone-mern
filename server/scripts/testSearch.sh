#!/bin/bash
# Checks search and filters. The server must be running on port 5001 (npm run dev in another terminal).
# Creates one test host and three test properties, and deletes the properties at the end.

AUTH=http://localhost:5001/api/auth
API=http://localhost:5001/api/properties
STAMP=$(date +%s)
JSON_HEADER="Content-Type: application/json"

TITLE_A="Lake Studio $STAMP"
TITLE_B="Hill Cottage $STAMP"
TITLE_C="Beach House $STAMP"

HOST_BODY='{"name":"Search Host","email":"searchhost'"$STAMP"'@example.com","password":"secret123","role":"host"}'
PROPERTY_A='{"title":"'"$TITLE_A"'","description":"Test property A.","location":"Udaipur, Rajasthan '"$STAMP"'","propertyType":"Apartment","pricePerNight":2000,"maxGuests":2}'
PROPERTY_B='{"title":"'"$TITLE_B"'","description":"Test property B.","location":"Manali, Himachal Pradesh '"$STAMP"'","propertyType":"Cottage","pricePerNight":4500,"maxGuests":4}'
PROPERTY_C='{"title":"'"$TITLE_C"'","description":"Test property C.","location":"Calangute, Goa '"$STAMP"'","propertyType":"House","pricePerNight":8000,"maxGuests":8}'

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

# Checks which of the three test properties are in the result. WANT is a string such as "AB".
result_is() {
  GOT=""
  for LETTER in A B C; do
    case $LETTER in
      A) TITLE="$TITLE_A" ;;
      B) TITLE="$TITLE_B" ;;
      C) TITLE="$TITLE_C" ;;
    esac
    if echo "$BODY" | grep -q "$TITLE"; then
      GOT="$GOT$LETTER"
    fi
  done

  if [ "$CODE" = "200" ] && [ "$GOT" = "$2" ]; then
    echo "PASS  $1"
  else
    echo "FAIL  $1 (status $CODE, got '$GOT', expected '$2')"
    echo "      server said: $BODY"
  fi
}

title_order() {
  echo "$BODY" | grep -o '"title":"[^"]*"' | grep "$STAMP" | sed -E 's/"title":"([^ ]+) .*/\1/' | tr '\n' ' '
}

request -X POST "$AUTH/register" -H "$JSON_HEADER" -d "$HOST_BODY"
TOKEN=$(echo "$BODY" | sed -E 's/.*"token":"([^"]+)".*/\1/')

IDS=""
for PROPERTY in "$PROPERTY_A" "$PROPERTY_B" "$PROPERTY_C"; do
  request -X POST "$API" -H "$JSON_HEADER" -H "Authorization: Bearer $TOKEN" -d "$PROPERTY"
  IDS="$IDS $(echo "$BODY" | sed -E 's/.*"_id":"([^"]+)".*/\1/')"
done
check "Three test properties created" 201

request -G "$API" --data-urlencode "location=$STAMP"
result_is "Location filter with the test marker finds all three" "ABC"

request -G "$API" --data-urlencode "location=udaipur"
result_is "Location filter is case-insensitive and partial" "A"

request -G "$API" --data-urlencode "location=udaipur("
check "A location with special characters does not crash" 200

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "minPrice=4000"
result_is "Minimum price 4000" "BC"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "maxPrice=5000"
result_is "Maximum price 5000" "AB"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "minPrice=3000" --data-urlencode "maxPrice=5000"
result_is "Price range 3000 to 5000" "B"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "propertyType=Cottage"
result_is "Property type Cottage" "B"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "guests=5"
result_is "5 guests" "C"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "propertyType=House" --data-urlencode "guests=5" --data-urlencode "maxPrice=9000"
result_is "Type, guests and price together" "C"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "checkIn=2030-01-10" --data-urlencode "checkOut=2030-01-12"
result_is "Valid dates with no bookings keep all three" "ABC"

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "sort=price_desc"
ORDER=$(title_order)
if [ "$ORDER" = "Beach Hill Lake " ]; then echo "PASS  Sort by price, high to low"; else echo "FAIL  Sort by price, high to low (got '$ORDER')"; fi

request -G "$API" --data-urlencode "location=$STAMP" --data-urlencode "sort=price_asc"
ORDER=$(title_order)
if [ "$ORDER" = "Lake Hill Beach " ]; then echo "PASS  Sort by price, low to high"; else echo "FAIL  Sort by price, low to high (got '$ORDER')"; fi

request -G "$API" --data-urlencode "minPrice=abc"
check "A price that is not a number is rejected" 400

request -G "$API" --data-urlencode "minPrice=500" --data-urlencode "maxPrice=100"
check "Minimum price above maximum price is rejected" 400

request -G "$API" --data-urlencode "propertyType=Castle"
check "An unknown property type is rejected" 400

request -G "$API" --data-urlencode "guests=0"
check "Zero guests is rejected" 400

request -G "$API" --data-urlencode "checkIn=2030-01-10"
check "Check-in without check-out is rejected" 400

request -G "$API" --data-urlencode "checkIn=2030-01-12" --data-urlencode "checkOut=2030-01-10"
check "Check-out before check-in is rejected" 400

request -G "$API" --data-urlencode "checkIn=2020-01-10" --data-urlencode "checkOut=2020-01-12"
check "Check-in in the past is rejected" 400

request -G "$API" --data-urlencode "checkIn=2030-02-31" --data-urlencode "checkOut=2030-03-02"
check "A date that does not exist is rejected" 400

request "$API?location=a&location=b"
check "A repeated parameter is rejected" 400

request -G "$API" --data-urlencode "sort=random"
check "An unknown sort option is rejected" 400

for ID in $IDS; do
  request -X DELETE "$API/$ID" -H "Authorization: Bearer $TOKEN"
done
check "Test properties deleted" 200
