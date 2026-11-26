# Progress

## Current milestone
Milestone 3 (backend setup and API structure) is complete. Next: Milestone 4, Mongoose models.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas, React client created with Vite, Tailwind v4, React Router and Axios
- Milestone 2: brand name and colour theme, routing, layout with Navbar and Footer, placeholder pages, 404 page, responsive navbar, PropertyCard and a responsive grid with sample data
- Milestone 3: backend split into server/config (db.js), routes (healthRoutes.js), controllers (healthController.js) and middleware (errorMiddleware.js). app.js sets up Express and server.js only connects to the database and starts listening.
- JSON error responses: unknown API routes return 404 and malformed JSON returns 400, both as {"message": "..."}

## Ongoing
- Nothing in progress

## Pending
- Milestone 4: Mongoose models (User, Property, Booking)
- Milestones 5 to 12
- The sample data and the "Photo coming soon" placeholders in the client are temporary. Real data and Cloudinary images come in the property listing milestone.

## Testing results
- bcrypt hashing test passed
- Browser checks for Milestone 2 passed (links, /properties/:id, 404 page, mobile menu, 3-column and 1-column grid). Tablet width (2 columns) was not checked.
- Milestone 3, tested with curl after the restructure:
  - GET /api/health returned {"status":"ok","database":"connected"} with status 200
  - GET /api/nothing returned {"message":"Not found: /api/nothing"} with status 404
  - POST /api/health with invalid JSON returned a JSON error message with status 400

## Known issues and limitations
- The old Atlas database password and JWT_SECRET were shown in a chat screenshot. Both must be replaced before deployment.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
- Postman has not been used yet. curl was used for the quick checks. Postman will be used for the main API tests and the API documentation.
