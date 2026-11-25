# Next Steps

1. Run the client (cd client, npm run dev) and test in the browser: Home page with navbar and footer, Log in and Sign up links change the page without reload, /properties/42 shows the id, an unknown URL shows the 404 page, and under about 768px width the Menu button opens the links.
2. Fix anything that fails.
3. Build a reusable PropertyCard component (client/src/components) with sample data and show it as a responsive grid on the Home page.
4. Check the layout at mobile, tablet and desktop widths.
5. Update PROGRESS.md, commit and push. Milestone 2 is then complete.
6. Start Milestone 3: organise the backend (routes, controllers, models folders).

Before deployment: reset the Atlas database user password and generate a new JWT_SECRET, because the old values were shown in a chat screenshot. Update server/.env and restart the server.
