# Progress

## Current milestone
Milestone 7 (search and filters): the backend is complete and tested. The search form in the client is next.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, responsive navbar, PropertyCard
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models User, Property and Booking, with a test script (server/scripts/testModels.js)
- Milestone 5: authentication (register, login, JWT, protect and restrictTo, login and register forms, ProtectedRoute, Navbar that follows the login state)
- Milestone 6: property listings with images. Public list and detail, host-only create, edit and delete with an owner check, Cloudinary image upload with Multer, host forms with a photo picker, "My listings" on the Dashboard.
- Milestone 7, backend: GET /api/properties accepts location, minPrice, maxPrice, propertyType, guests, checkIn, checkOut and sort. The filters are built in server/utils/propertyFilters.js. Bad values return a 400 error with a clear message. The date filter leaves out properties that have a confirmed booking overlapping the dates.

## Ongoing
- Nothing in progress

## Pending
- Milestone 7, client: search form on the Home page
- Milestones 8 to 12

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 4: node scripts/testModels.js passed all checks.
- Milestone 5: bash scripts/testAuth.sh passed all 10 checks. Login, logout, refresh, protected route and wrong-password checks passed in the browser.
- Milestone 6: bash scripts/testProperties.sh passed all 16 checks (again after the Milestone 7 controller change). bash scripts/testImages.sh passed all 11 checks against the real Cloudinary account. The photo picker, edit and delete worked in the browser.
- Milestone 7: bash scripts/testSearch.sh passed all 24 checks (filters, sorting and rejected bad values). node scripts/testAvailability.js passed all 7 checks (it inserts bookings directly into the database and deletes them afterwards).
- Not checked yet in the browser: the "This property does not exist." message for an unknown id, and the error message on the Home page when the server is stopped.

## Known issues and limitations
- The old JWT_SECRET and the Atlas database password were shown in a chat screenshot. The student was asked to replace JWT_SECRET at the start of Milestone 5. Confirm it was done. The Atlas password must be replaced before deployment.
- Test users and test properties are left in the database by the test scripts and the browser tests. Delete them in Atlas (Browse Collections) before the demo.
- The login is saved in localStorage and is not checked again when the app starts. If the token has expired (after 7 days), requests to protected routes fail with 401 until the user logs out and in again.
- There is no booking API yet, so the date filter was only tested with bookings inserted directly into the database. Test it again with real bookings in Milestone 8.
- Deleting a property does not yet delete its bookings. To be handled in the booking milestone.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and test scripts were used so far. Postman will be used for the main API tests and the API documentation.
