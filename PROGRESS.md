# Progress

## Current milestone
Milestone 6 (property listing management): listings work end to end without images. Image uploads are next.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, responsive navbar, PropertyCard
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models User, Property and Booking, with a test script (server/scripts/testModels.js)
- Milestone 5: authentication. Backend: register, login, protected /me, protect and restrictTo middleware (server/scripts/testAuth.sh). Frontend: Axios instance, AuthContext, Login and Register forms, ProtectedRoute, Navbar that follows the login state.
- Milestone 6, backend: property API with public list and detail, host-only create and "mine", owner-only update and delete (server/scripts/testProperties.sh)
- Milestone 6, client: Home and PropertyDetails load real data with loading, empty and error states. Hosts can add and edit properties (shared PropertyForm) and manage them from "My listings" on the Dashboard, including delete with a confirmation. The sample data was removed.

## Ongoing
- Nothing in progress

## Pending
- Milestone 6, images: Cloudinary and Multer, in the backend and in the form
- Milestones 7 to 12

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 3 checked with curl.
- Milestone 4: node scripts/testModels.js passed all checks.
- Milestone 5: bash scripts/testAuth.sh passed all 10 checks. Login, logout, refresh, protected route and wrong-password checks passed in the browser.
- Milestone 6 backend: bash scripts/testProperties.sh passed all 16 checks.
- Milestone 6 client, checked in the browser: the Home page showed "No stays have been listed yet." when the database had no properties. A host account was created, a property was added from the form, shown on the details page and on the Home page, edited, and deleted from the Dashboard.
- Not checked yet in the browser: the "This property does not exist." message for an unknown id, and the error message on the Home page when the server is stopped.

## Known issues and limitations
- The old JWT_SECRET and the Atlas database password were shown in a chat screenshot. The student was asked to replace JWT_SECRET at the start of Milestone 5. Confirm it was done. The Atlas password must be replaced before deployment.
- Test users and test properties are left in the database by the test scripts and the browser tests. Delete them in Atlas (Browse Collections) before the demo.
- The login is saved in localStorage and is not checked again when the app starts. If the token has expired (after 7 days), requests to protected routes fail with 401 until the user logs out and in again.
- Deleting a property does not yet delete its bookings. To be handled in the booking milestone.
- Properties have no images yet. The card and the details page already show the first image when a property has one, and a "Photo coming soon" box otherwise.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and test scripts were used so far. Postman will be used for the main API tests and the API documentation.
