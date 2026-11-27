# Next Steps

Milestone 6, last part: image uploads

1. The student creates a free Cloudinary account and finds the cloud name, API key and API secret in the Cloudinary dashboard. Put CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY and CLOUDINARY_API_SECRET in server/.env only, and add the names (with placeholder values) to server/.env.example. Never share the values in chat.
2. Install the cloudinary package if needed (it is already in server/package.json). Add config/cloudinary.js and middleware/uploadMiddleware.js (Multer with memory storage, images only, a size limit, up to 5 images). Upload the files to Cloudinary and save each url and public id in the property's images array.
3. Add the upload to the property routes: send images with the create request (multipart form data) and allow adding or removing images on update. When a property is deleted, delete its images from Cloudinary too.
4. Extend scripts/testProperties.sh or add scripts/testImages.sh, and run it.
5. Client: add an image picker to PropertyForm (several files, with previews), send the form as FormData, and show the images on the card and the details page.
6. Test in the browser, update the docs, commit and push. Milestone 6 is then complete.
7. Start Milestone 7: search and filters (location, price range, property type, guests, available dates).

Decision to make later (Milestone 8): the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns), the "This property does not exist." page, and the error message on the Home page when the server is stopped.

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
