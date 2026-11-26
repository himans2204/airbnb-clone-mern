# Progress

## Current milestone
Milestone 6 (property listing management): the property API is complete and tested. Next: the listing pages in the client, then image uploads.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, placeholder pages, 404 page, responsive navbar, PropertyCard and a responsive grid with sample data
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models User, Property and Booking, with a test script (server/scripts/testModels.js)
- Milestone 5: authentication. Backend: register, login, protected /me, protect and restrictTo middleware (server/scripts/testAuth.sh). Frontend: Axios instance, AuthContext, Login and Register forms, ProtectedRoute, Navbar that follows the login state.
- Milestone 6, backend: property API in server/controllers/propertyController.js and server/routes/propertyRoutes.js. Public list and detail, host-only create and "mine", owner-only update and delete (server/scripts/testProperties.sh).

## Ongoing
- Nothing in progress

## Pending
- Milestone 6, frontend: Home page and PropertyDetails from the API, add and edit forms for hosts, "My listings" on the Dashboard
- Milestone 6, images: Cloudinary and Multer
- Milestones 7 to 12
- The sample data and the "Photo coming soon" placeholders in the client are temporary and will be replaced in Milestone 6.

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 3 checked with curl: /api/health returned 200, an unknown route returned a JSON 404, invalid JSON returned a JSON 400.
- Milestone 4: node scripts/testModels.js passed all checks.
- Milestone 5: bash scripts/testAuth.sh passed all 10 checks. The login, logout, refresh, protected route and wrong-password checks passed in the browser.
- Milestone 6 backend: bash scripts/testProperties.sh (run inside server/ while the server is running) passed all 16 checks: a host creates a property, a guest gets 403, no login gets 401, missing fields get 400, anyone can list and open a property, an invalid id gets 404, a host lists their own, the owner updates, another host gets 403 on update and delete, the owner deletes, and the deleted property returns 404.

## Known issues and limitations
- The old JWT_SECRET and the Atlas database password were shown in a chat screenshot. The student was asked to replace JWT_SECRET at the start of Milestone 5. Confirm it was done. The Atlas password must be replaced before deployment.
- Test users are left in the database by testAuth.sh and testProperties.sh (emails starting with "test", "host", "otherhost" and "guest"), by a manual check (debug1@example.com) and by the browser test. Delete them in Atlas (Browse Collections, users) before the demo.
- The login is saved in localStorage and is not checked again when the app starts. If the token has expired (after 7 days), requests to protected routes fail with 401 until the user logs out and in again.
- Deleting a property does not yet delete its bookings. To be handled in the booking milestone.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and test scripts were used so far. Postman will be used for the main API tests and the API documentation.
