# Next Steps

Milestone 3: backend setup and API structure

1. Create folders in server/: config, models, controllers, routes, middleware.
2. Move the MongoDB connection from server.js into config/db.js.
3. Split the Express app (app.js) from the code that starts the server (server.js).
4. Move the health check into routes/healthRoutes.js and test it again at http://localhost:5001/api/health.
5. Add a 404 handler for unknown API routes and a general error handler in middleware/.
6. Test with Postman: health check, an unknown route, and an error case.
7. Update PROGRESS.md, commit and push. Milestone 3 is then complete.
8. Start Milestone 4: Mongoose models (User, Property, Booking).

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: reset the Atlas database user password and generate a new JWT_SECRET, because the old values were shown in a chat screenshot. Update server/.env and restart the server.
