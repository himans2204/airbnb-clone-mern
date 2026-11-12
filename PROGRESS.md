# Progress

## Current milestone
1. Environment and project setup (almost done: server works, client not created yet)

## Completed
- Checked tools on the student's Mac: Node 24, npm 11, Git 2.50
- Created GitHub repository and pushed the initial commit with documentation
- Initialised the server in server/ and installed express, mongoose, dotenv, cors, bcrypt, jsonwebtoken, multer, cloudinary and nodemon (dev)
- Connected to MongoDB Atlas (existing free cluster, new database user, database name airbnb_clone)
- Created server/server.js with a GET /api/health route that reports the database connection state

## Ongoing
- Nothing in progress

## Pending
- Create the React client with Vite and add Tailwind CSS, React Router and Axios
- Milestones 2 to 12

## Files modified in the last task
- server/package.json, server/package-lock.json, server/server.js, server/.env.example
- PROGRESS.md, NEXT_STEPS.md, PROJECT_CONTEXT.md, CLAUDE.md

## Testing results
- bcrypt hashing test passed (hash length 60)
- GET http://localhost:5001/api/health returned {"status":"ok","database":"connected"} in the browser

## Known issues and limitations
- npm audit reports 2 moderate vulnerabilities after installing nodemon. Not reviewed yet.
- npm warns that the bcrypt install script is not approved. bcrypt works, so this is ignored for now.
- The free Atlas cluster pauses after inactivity. Resume it in Atlas before running the server or a demo.
- Atlas only accepts connections from allowed IP addresses. If the network changes, add the new IP in Network Access.
