# Progress

## Current milestone
Milestone 5 (authentication): the backend is complete and tested. The frontend part (forms, auth state, protected route) is next.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, placeholder pages, 404 page, responsive navbar, PropertyCard and a responsive grid with sample data
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models User, Property and Booking, with a test script (server/scripts/testModels.js)
- Milestone 5, backend: POST /api/auth/register, POST /api/auth/login and GET /api/auth/me (protected). JWT created in utils/generateToken.js (expires in 7 days). Middleware protect (checks the Bearer token and loads the user) and restrictTo (checks the role) in middleware/authMiddleware.js. The error handler returns 400 for Mongoose validation errors and duplicate keys.

## Ongoing
- Nothing in progress

## Pending
- Milestone 5, frontend: AuthContext, Login and Register forms, ProtectedRoute for /dashboard, Navbar changes, logout
- Milestones 6 to 12
- The sample data and the "Photo coming soon" placeholders in the client are temporary. Real data and Cloudinary images come in the property listing milestone.

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 3 checked with curl: /api/health returned 200, an unknown route returned a JSON 404, invalid JSON returned a JSON 400.
- Milestone 4: node scripts/testModels.js passed all checks.
- Milestone 5 backend: bash scripts/testAuth.sh (run inside server/ while the server is running) passed all 10 checks: register, duplicate email rejected, missing password rejected, wrong password gives 401, correct login gives 200, an object in place of the email is rejected, /me without a token or with a bad token gives 401, /me with a valid token gives 200, and the password is never returned.
- The first version of testAuth.sh failed four checks because of how it built its requests (a manual curl request had worked). It was rewritten and now passes.

## Known issues and limitations
- The old JWT_SECRET and the Atlas database password were shown in a chat screenshot. The student was asked to replace JWT_SECRET at the start of Milestone 5. Confirm it was done. The Atlas password must be replaced before deployment.
- Each run of testAuth.sh leaves one test user (email starting with "test", plus one called debug1@example.com) in the database. Delete them in Atlas (Browse Collections, users) before the demo.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and test scripts were used so far. Postman will be used for the main API tests and the API documentation.
