# Next Steps

Milestone 6: property listing management

Backend (do the listings first, images after they work):
1. Create controllers/propertyController.js with createProperty, getProperties, getPropertyById, getMyProperties, updateProperty and deleteProperty.
2. Create routes/propertyRoutes.js and mount it at /api/properties in app.js:
   - GET /api/properties and GET /api/properties/:id are public
   - GET /api/properties/mine needs login and the host role (define it before /:id)
   - POST /api/properties needs login and the host role
   - PUT and DELETE /api/properties/:id need login, and only the host who created the listing may change it (403 for anyone else)
3. Write a test script (scripts/testProperties.sh) in the same style as testAuth.sh and run it.
4. Update PROGRESS.md, commit and push.

Images:
5. The student creates a free Cloudinary account. Put CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in server/.env only, and add the names to server/.env.example. Never share the values in chat.
6. Add config/cloudinary.js and middleware/uploadMiddleware.js (Multer, images only, size limit, up to 5 images) and attach the uploaded images to a property. Test, update the docs, commit and push.

Frontend:
7. Home page: load properties from the API instead of the sample data, with loading and error states. Remove data/sampleProperties.js when it is no longer used.
8. PropertyDetails page: show the real property (price, location, description, amenities, images).
9. Host pages: add property and edit property forms (hosts only), and a "My listings" section on the Dashboard with edit and delete.
10. Test in the browser, update the docs, commit and push. Milestone 6 is then complete.
11. Start Milestone 7: search and filters.

Decision to make later (Milestone 8): the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
