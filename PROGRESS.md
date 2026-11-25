# Progress

## Current milestone
Milestone 2 (frontend architecture and UI) is complete. Next: Milestone 3, backend structure.

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas (GET /api/health works), React client created with Vite, Tailwind v4, React Router and Axios
- Brand name is StayinYourRoom (client/src/config.js). Colour theme is teal (brand-*) and warm sand (sand-*), defined in client/src/index.css
- Routing with React Router: layout route (MainLayout) with Navbar and Footer, pages Home, Login, Register, PropertyDetails (/properties/:id), Dashboard and a 404 page
- Responsive Navbar with a Menu button on small screens
- PropertyCard component and a responsive grid on the Home page, using sample data from client/src/data/sampleProperties.js (prices in rupees)

## Ongoing
- Nothing in progress

## Pending
- Milestone 3: backend structure (routes, controllers, models, middleware)
- Milestones 4 to 12
- The sample data and the "Photo coming soon" placeholders are temporary. Real data and Cloudinary images come in the property listing milestone.

## Testing results
- bcrypt hashing test passed
- GET http://localhost:5001/api/health returned {"status":"ok","database":"connected"}
- Browser checks passed: Log in and Sign up links change the page without a reload, the active link is highlighted, /properties/42 shows the id, an unknown URL shows the 404 page, the mobile Menu button opens and closes the links
- Home page grid showed 3 columns on a wide window and 1 column at phone width. Tablet width (2 columns) was not checked.
- Browser console showed no errors

## Known issues and limitations
- The old Atlas database password and JWT_SECRET were shown in a chat screenshot. Both must be replaced before deployment.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
