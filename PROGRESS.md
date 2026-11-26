# Progress

## Current milestone
Milestone 4 (MongoDB connection and models) is complete. Next: Milestone 5, authentication.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, placeholder pages, 404 page, responsive navbar, PropertyCard and a responsive grid with sample data
- Milestone 3: backend split into config, routes, controllers and middleware, with JSON error responses
- Milestone 4: Mongoose models in server/models: User, Property and Booking, plus a test script (server/scripts/testModels.js) that creates test data, tries to break the rules and deletes everything it created

## Ongoing
- Nothing in progress

## Pending
- Milestone 5: authentication (register, login, JWT, protected routes, roles)
- Milestones 6 to 12
- The sample data and the "Photo coming soon" placeholders in the client are temporary. Real data and Cloudinary images come in the property listing milestone.

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed. Tablet width (2 columns) was not checked.
- Milestone 3 checked with curl: /api/health returned 200, an unknown route returned a JSON 404, invalid JSON returned a JSON 400.
- Milestone 4: node scripts/testModels.js (run inside server/) passed all checks: password is hashed, password comparison works, duplicate email is rejected, property and booking are saved, a booking with check-out before check-in is rejected, and the test data is deleted afterwards.

## Known issues and limitations
- The old Atlas database password and JWT_SECRET were shown in a chat screenshot. Both must be replaced before deployment. JWT_SECRET should be replaced before building authentication.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl and a Node test script were used for the checks so far. Postman will be used for the main API tests and the API documentation.
