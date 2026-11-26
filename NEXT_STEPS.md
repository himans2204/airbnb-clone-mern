# Next Steps

Milestone 4: MongoDB connection and models

1. Agree on the fields for each model:
   - User: name, email (unique), password (hashed), role (guest or host)
   - Property: host (a User), title, description, location, propertyType, pricePerNight, maxGuests, amenities, images
   - Booking: property, guest (a User), checkIn, checkOut, guests, totalPrice, status
2. Create server/models/User.js, Property.js and Booking.js with Mongoose schemas and validation.
3. Test the models with a small throwaway script that creates one document of each, check them in Atlas (Browse Collections), then delete the test data and the script.
4. Update PROGRESS.md, commit and push. Milestone 4 is then complete.
5. Start Milestone 5: authentication (register, login, JWT, protected routes).

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: reset the Atlas database user password and generate a new JWT_SECRET, because the old values were shown in a chat screenshot. Update server/.env and restart the server.
