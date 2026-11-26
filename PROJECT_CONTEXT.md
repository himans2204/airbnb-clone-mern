# Project Context

## Purpose
Airbnb-inspired booking platform, built as a B.Tech CSE capstone (Module 8). The student must be able to explain every part of the code in a viva, so code is kept simple and readable.

## Stack and decisions
- Monorepo with two folders: client/ (React) and server/ (Express API).
- Frontend: React with Vite (Create React App is deprecated), React Router, Axios, Tailwind CSS.
- Backend: Node.js, Express, Mongoose.
- Database: MongoDB Atlas free tier, so no local MongoDB install is needed and the same database can be used when deployed.
- Auth: JWT for sessions, bcrypt for password hashing.
- Images: Multer for receiving uploads, Cloudinary for storage.
- Secrets live in .env files that are never committed. A .env.example documents the variables.
- Node version in use: 24 (LTS). npm 11.

## Required features
1. Authentication: register, login, logout, protected routes, user roles
2. Property listings: create, edit, delete, multiple images, details page
3. Search and filters: location, price range, property type, guest capacity, available dates
4. Bookings: dates, guests, availability check, no overlapping confirmed bookings, total price, view and manage bookings
5. Dashboard: own bookings, own listings, booking status, account info
6. Responsive UI with loading and error states

## Business rules
- Only confirmed bookings block a property's dates.
- Total price = nightly price x number of nights.

## Milestones
1. Environment and project setup
2. Frontend architecture and UI
3. Backend setup and API structure
4. MongoDB connection and models
5. Authentication
6. Property listing management
7. Search and filtering
8. Booking system
9. User dashboard
10. Testing and bug fixing
11. Final documentation
12. Deployment

## Not decided yet
- Final project name and branding
- Exact role names and permissions (to be settled in the authentication milestone)

## Setup notes
- The server runs on port 5001 because macOS uses port 5000 for AirPlay Receiver.
- Atlas: the project reuses an existing free cluster. This app uses its own database, airbnb_clone.
- Environment variables (in server/.env, not committed): PORT, MONGO_URI, JWT_SECRET. Cloudinary variables will be added later.
- The server uses ES modules ("type": "module" in server/package.json).
- Client: Vite (create-vite 9.x) with React and JavaScript, ESLint for linting, Tailwind CSS v4 through the @tailwindcss/vite plugin (no tailwind.config.js or PostCSS file).
- The client dev server runs on port 5173 and the API on port 5001.

## Frontend structure
- client/src/main.jsx wraps the app in BrowserRouter. App.jsx holds the route table.
- layouts/MainLayout.jsx renders Navbar, the current page (through Outlet) and Footer.
- pages/: Home, Login, Register, PropertyDetails, Dashboard, NotFound.
- components/: Navbar, Footer, PropertyCard.
- data/sampleProperties.js: temporary sample data, to be replaced by API data.
- services/ is reserved for Axios calls to the API.
- Routes: / (home), /login, /register, /properties/:id, /dashboard, anything else shows the 404 page.
- Brand name comes from config.js (APP_NAME). Colours come from the @theme block in index.css, used as classes like bg-brand-600 and bg-sand-100.
- Prices are shown in rupees.

## Backend structure
- server/server.js loads the environment variables, connects to MongoDB and starts the server.
- server/app.js creates the Express app, adds cors and express.json, mounts the routes, then the notFound and errorHandler middleware.
- config/db.js holds the MongoDB connection (connectDB).
- routes/ maps URLs to controller functions. controllers/ holds the request handlers. middleware/ holds shared code such as error handling. models/ will hold the Mongoose models (Milestone 4).
- Current route: GET /api/health.
- Errors are returned as JSON: {"message": "..."} with a suitable status code.

## Data models
- User: name, email (unique, lowercase), password (hashed with bcrypt in a pre-save hook), role (guest or host), timestamps. Method matchPassword compares a plain password with the stored hash.
- Property: host (ref User), title, description, location, propertyType (Apartment, House, Cottage, Room, Houseboat, Villa), pricePerNight, maxGuests, amenities (array of strings), images (array of url and publicId, for Cloudinary), timestamps.
- Booking: property (ref Property), guest (ref User), checkIn, checkOut (must be after checkIn), guests, totalPrice, status (pending, confirmed or cancelled, default pending), timestamps. Indexed on property, checkIn and checkOut for the availability check.
- Roles: guest and host. A host is a user who lists properties.
- server/scripts/testModels.js checks the models against the real database and deletes the data it creates. Run it from server/ with: node scripts/testModels.js

## Authentication
- POST /api/auth/register takes name, email, password and an optional role (guest or host). It returns id, name, email, role and a token.
- POST /api/auth/login takes email and password. A wrong email and a wrong password give the same message (401), so it does not reveal which one was wrong.
- GET /api/auth/me needs the header Authorization: Bearer <token> and returns the user without the password.
- The token is a JWT signed with JWT_SECRET and expires in 7 days. The payload holds only the user id.
- The register and login controllers reject an email or password that is not a string, which blocks NoSQL injection such as {"email": {"$gt": ""}}.
- protect (middleware/authMiddleware.js) verifies the token and puts the user in req.user. restrictTo('host') blocks other roles with 403.
- Errors use res.status(...) and next(error), and the errorHandler sends {"message": "..."}.
- server/scripts/testAuth.sh checks all of this. Run it inside server/ while the server is running: bash scripts/testAuth.sh

## Frontend authentication
- services/api.js is an Axios instance. The base URL comes from VITE_API_URL in client/.env (see client/.env.example). A request interceptor adds the saved token as a Bearer token.
- context/authContext.js holds the context and the useAuth hook. context/AuthProvider.jsx keeps the user, and has login, register and logout. The token and the user are saved in localStorage so a refresh keeps the login. (The trade-off: JavaScript on the page can read localStorage. httpOnly cookies are the more secure option in production.)
- AuthProvider wraps App in main.jsx, inside BrowserRouter.
- components/ProtectedRoute.jsx sends visitors who are not logged in to /login and remembers the page they wanted, so Login can return them there. It is used for /dashboard.
- Login and Register show the server's error message from err.response.data.message.
- The Navbar shows Log in and Sign up when logged out, and Dashboard, the user's name and Log out when logged in.
