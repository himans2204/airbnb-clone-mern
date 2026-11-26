# Next Steps

Milestone 5, frontend part: login and registration in the React client

1. Create client/src/services/api.js: an Axios instance with baseURL from VITE_API_URL (default http://localhost:5001/api). Add client/.env.example and client/.env with VITE_API_URL. The CORS setup on the server already allows the client.
2. Create client/src/context/AuthContext.jsx: keeps the user and token, with login, register and logout functions. Store the token in localStorage so a refresh keeps the user logged in, and load it again when the app starts.
3. Build the Login and Register forms (pages/Login.jsx and Register.jsx): controlled inputs, a loading state, and the server's error message shown on the page. Registration lets the user choose guest or host.
4. Create components/ProtectedRoute.jsx and use it for /dashboard. Visitors who are not logged in are sent to /login.
5. Update the Navbar: show Log in and Sign up when logged out, and the user's name with a Log out button when logged in. Keep the mobile menu working.
6. Test in the browser: register, log out, log in, wrong password message, refresh keeps the login, /dashboard redirects when logged out.
7. Update PROGRESS.md, commit and push. Milestone 5 is then complete.
8. Start Milestone 6: property listing management (create, edit, delete, image upload with Multer and Cloudinary). Use restrictTo('host') on the create, edit and delete routes.

Decision to make later (Milestone 8): the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
