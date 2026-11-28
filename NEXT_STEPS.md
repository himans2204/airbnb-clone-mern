# Next Steps

Milestone 7, client part: the search form on the Home page

1. Add a search form to the Home page: location, check-in and check-out dates, guests, property type, minimum and maximum price, and a sort option. Check-in and check-out must be given together, and check-out must be after check-in (the server rejects anything else with a 400 message).
2. Keep the filters in the URL with useSearchParams, so a search can be reloaded or shared. Home sends them to GET /api/properties as query parameters and reloads the results when they change.
3. Show loading, empty ("No stays match your search") and error states, and a Clear filters button. Show the server's message when it returns a 400.
4. Check the layout on phone width, test in the browser, update the docs, commit and push. Milestone 7 is then complete.
5. Start Milestone 8: bookings (select dates and guests, check availability, prevent overlapping confirmed bookings, total price, store the booking, view and manage bookings).

Decision to make in Milestone 8: the Booking status currently defaults to pending, and only confirmed bookings block dates. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns), the "This property does not exist." page, and the error message on the Home page when the server is stopped.

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
