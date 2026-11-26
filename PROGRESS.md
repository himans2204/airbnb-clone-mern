# Progress

## Current milestone
Milestone 5 (authentication) is complete. Next: Milestone 6, property listing management.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, placeholder pages, 404 page, responsive navbar, PropertyCard and a responsive grid with sample data
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models User, Property and Booking, with a test script (server/scripts/testModels.js)
- Milestone 5, backend: register, login and a protected /me route with JWT, plus protect and restrictTo middleware (server/scripts/testAuth.sh)
- Milestone 5, frontend: Axios instance (services/api.js) that sends the saved token, AuthContext and AuthProvider (context/), Login and Register forms with server error messages and a loading state, ProtectedRoute for /dashboard, and a Navbar that changes with the login state

## Ongoing
- Nothing in progress

## Pending
- Milestone 6: property listing management
- Milestones 7 to 12
- The sample data and the "Photo coming soon" placeholders in the client are temporary. Real data and Cloudinary images come in Milestone 6.

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 3 checked with curl: /api/health returned 200, an unknown route returned a JSON 404, invalid JSON returned a JSON 400.
- Milestone 4: node scripts/testModels.js passed all checks.
- Milestone 5 backend: bash scripts/testAuth.sh (run inside server/ while the server is running) passed all 10 checks.
- Milestone 5 frontend, checked in the browser: /dashboard while logged out redirects to /login, registering a new account lands on the Dashboard and the Navbar shows the user's name and Log out, a refresh keeps the user logged in, Log out clears the session, a wrong password shows "Invalid email or password", and the correct password logs in and returns to the Dashboard.

## Known issues and limitations
- The old JWT_SECRET and the Atlas database password were shown in a chat screenshot. The student was asked to replace JWT_SECRET at the start of Milestone 5. Confirm it was done. The Atlas password must be replaced before deployment.
- Test users are left in the database by testAuth.sh (emails starting with "test"), by a manual check (debug1@example.com) and by the browser test. Delete them in Atlas (Browse Collections, users) before the demo.
- The login is saved in localStorage and is not checked again when the app starts. If the token has expired (after 7 days), requests to protected routes fail with 401 until the user logs out and in again. Handling a 401 by logging out automatically can be added later.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and test scripts were used so far. Postman will be used for the main API tests and the API documentation.
