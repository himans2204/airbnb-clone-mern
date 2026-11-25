# Progress

## Current milestone
Milestone 2: frontend architecture and UI (in progress)

## Completed
- Milestone 1: tools checked, GitHub repo created, Express server connected to MongoDB Atlas (GET /api/health works), React client created with Vite, Tailwind v4, React Router and Axios
- Brand name is StayinYourRoom (stored in client/src/config.js). Colour theme is teal (brand-*) and warm sand (sand-*), defined in client/src/index.css
- Vite demo files removed
- Added in client/src: main.jsx (BrowserRouter), App.jsx (route table), layouts/MainLayout.jsx, components/Navbar.jsx and Footer.jsx, and placeholder pages Home, Login, Register, PropertyDetails (/properties/:id), Dashboard, NotFound

## Ongoing
- The new routing, navbar, footer and pages are written and the dev server starts, but they have NOT been checked in the browser yet.

## Pending
- Browser test of the routing and layout (links, /properties/42, 404 page, mobile menu)
- Property card component with sample data, shown on the home page
- Responsive check at mobile, tablet and desktop widths
- Milestones 3 to 12

## Testing results
- bcrypt hashing test passed
- GET http://localhost:5001/api/health returned {"status":"ok","database":"connected"}
- Client theme test page showed the sand background and teal styling
- Routing and layout: not tested yet

## Known issues and limitations
- The old Atlas database password and JWT_SECRET were shown in a chat screenshot. Both must be replaced before deployment.
- The free Atlas cluster pauses after inactivity. Resume it before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. Add the new IP in Network Access if the network changes.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work.
