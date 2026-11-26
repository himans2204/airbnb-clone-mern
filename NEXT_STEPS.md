# Next Steps

Milestone 5: authentication

Backend:
1. Replace JWT_SECRET in server/.env with a new random value, because the old one was shown in a chat screenshot. Restart the server.
2. Create a helper that makes a JWT for a user id (expires in 7 days).
3. Create controllers/authController.js with register and login. Never return the password.
4. Create middleware/authMiddleware.js: protect (reads the Bearer token, verifies it, attaches req.user) and restrictTo (checks the role).
5. Create routes/authRoutes.js with POST /api/auth/register, POST /api/auth/login and GET /api/auth/me (protected), and mount it in app.js.
6. Test with curl or Postman: register, duplicate email, login with a wrong password, login, /me with and without a token.
7. Update PROGRESS.md, commit and push.

Frontend:
8. Create an AuthContext that stores the user and token, with login and logout.
9. Build the Login and Register forms and connect them to the API with Axios.
10. Add a ProtectedRoute for /dashboard, and show Log in, Sign up or Log out in the Navbar depending on the user.
11. Test in the browser, update the docs, commit and push. Milestone 5 is then complete.

Decision to make later (Milestone 8): the Booking status currently defaults to pending. Decide whether bookings are confirmed immediately or need host approval.

Optional: check the Home page grid at tablet width (should show 2 columns).

Before deployment: also reset the Atlas database user password, because it was shown in a chat screenshot. Update server/.env and restart the server.
