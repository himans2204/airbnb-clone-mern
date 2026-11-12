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
