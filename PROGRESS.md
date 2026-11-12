# Progress

## Current milestone
Milestone 1 (environment and project setup) is complete. Next: Milestone 2, frontend architecture and UI.

## Completed
- Checked tools on the student's Mac: Node 24, npm 11, Git 2.50
- Created the GitHub repository and pushed the initial documentation
- Initialised the server in server/ with express, mongoose, dotenv, cors, bcrypt, jsonwebtoken, multer, cloudinary and nodemon (dev)
- Connected to MongoDB Atlas (existing free cluster, new database user, database airbnb_clone)
- Added server/server.js with GET /api/health, which reports the database connection state
- Created the React client in client/ with Vite, plus react-router-dom, axios and Tailwind CSS v4 (@tailwindcss/vite plugin)
- Replaced the default Vite page with a small test page that uses Tailwind classes

## Ongoing
- Nothing in progress

## Pending
- Milestones 2 to 12

## Files modified in the last task
- client/ (new Vite project), client/vite.config.js, client/src/App.jsx, client/src/index.css
- PROGRESS.md, NEXT_STEPS.md, PROJECT_CONTEXT.md, CLAUDE.md

## Testing results
- bcrypt hashing test passed (hash length 60)
- GET http://localhost:5001/api/health returned {"status":"ok","database":"connected"}
- Client at http://localhost:5173 showed the Tailwind test page with the expected styling

## Known issues and limitations
- The old Atlas database password and JWT_SECRET were shown in a chat screenshot. Both must be replaced before deployment.
- The free Atlas cluster pauses after inactivity. Resume it in Atlas before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. If the network changes, add the new IP in Network Access.
- npm audit reports a few moderate vulnerabilities in dev dependencies. Not reviewed yet.
- npm warns about unapproved install scripts for bcrypt and fsevents. Both work, so this is ignored for now.
- Unused Vite boilerplate (client/README.md, client/src/App.css, client/src/assets/) is still present. To be removed in Milestone 2.
