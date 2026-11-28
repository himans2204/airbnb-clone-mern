# Next Steps

Milestone 7: search and filters

Backend:
1. Extend GET /api/properties (propertyController.getProperties) with query parameters:
   - location: case-insensitive partial match (escape special regex characters)
   - minPrice and maxPrice: price per night range
   - propertyType: one of the allowed types
   - guests: properties with maxGuests greater than or equal to this number
   - checkIn and checkOut: leave out properties that have a confirmed booking overlapping those dates (a booking overlaps when booking.checkIn < checkOut and booking.checkOut > checkIn)
   Validate every parameter (numbers, dates, checkOut after checkIn) and return 400 with a clear message for bad values.
2. Write scripts/testSearch.sh in the same style as the other test scripts and run it. The availability filter needs a confirmed booking to test it, so also test it with a booking inserted directly through a small Node script or in Atlas, and leave a note in PROGRESS.md if that part is deferred to Milestone 8.
3. Update PROGRESS.md, commit and push.

Client:
4. Add a search form to the Home page (location, dates, guests, property type, price range). Keep the filters in the URL (useSearchParams) so a search can be reloaded or shared.
5. Show loading, empty ("No stays match your search") and error states, and a Clear filters button.
6. Check the layout on phone width, update the docs, commit and push. Milestone 7 is then complete.
7. Start Milestone 8: bookings.

Decision to make in Milestone 8: the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns), the "This property does not exist." page, and the error message on the Home page when the server is stopped.

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
