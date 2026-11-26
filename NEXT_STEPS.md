# Next Steps

Milestone 6, continued: listing pages in the client (images come after this works)

1. Home page: load properties from GET /api/properties instead of the sample data, with loading and error states. PropertyCard shows title, location, type, guests and price from the API (the host's name is in property.host.name). Remove data/sampleProperties.js when it is no longer used.
2. PropertyDetails page: load one property by id and show price, location, description, amenities and the host's name. Show a friendly message when the property is not found (404).
3. Host pages: AddProperty and EditProperty forms (a shared PropertyForm component), only for logged-in hosts. Add routes /dashboard/properties/new and /dashboard/properties/:id/edit inside ProtectedRoute.
4. Dashboard: for hosts, a "My listings" section (GET /api/properties/mine) with Edit and Delete buttons. Ask for confirmation before deleting. Guests see a short message instead.
5. Test in the browser as a host and as a guest, update the docs, commit and push.

Then images:
6. The student creates a free Cloudinary account. Put CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in server/.env only, and add the names to server/.env.example. Never share the values in chat.
7. Add config/cloudinary.js and middleware/uploadMiddleware.js (Multer, images only, size limit, up to 5 images), attach the uploaded images to a property, and show them in the client. Test, update the docs, commit and push. Milestone 6 is then complete.
8. Start Milestone 7: search and filters.

Decision to make later (Milestone 8): the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
