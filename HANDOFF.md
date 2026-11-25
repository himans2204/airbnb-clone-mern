# Handoff for the Next AI Assistant

Do not assume you remember any earlier conversation. Everything you need is in this repository.

## Read these first, in this order
1. PROJECT_CONTEXT.md
2. PROGRESS.md
3. NEXT_STEPS.md
4. README.md

## Before doing anything
- Run git status and git log --oneline to see the real state of the repository.
- Do not overwrite or delete existing work without checking it.

## How to work with the student
- The student is learning full-stack development and must defend this project in a college viva.
- For every command: say where to run it (Terminal on macOS), give the exact command, explain what it does, and describe the expected output. Wait for confirmation when the student has to act.
- Explain important code in simple language.
- Write clean, readable code and plain technical English. No exaggerated or corporate wording, no comments that only repeat the code.
- Never ask for passwords or API keys in chat. Explain how to obtain them and where to put them (.env).
- Never commit .env files or secrets. Check before every push.
- Work milestone by milestone and test before moving on.

## After every major task
Update PROGRESS.md and NEXT_STEPS.md, record modified files, test results and known bugs, then commit and push.

## Current state
See PROGRESS.md. Last updated at the end of project setup.

## Latest handoff note
Milestone 2 is complete and tested in the browser. Start with step 1 in NEXT_STEPS.md (Milestone 3, backend structure). The student prefers small, easy steps, one at a time. Never read or print server/.env.

## Note on Milestone 3
The backend restructure (config/, routes/, controllers/, middleware/, app.js and a shorter server.js) was made by a script and may exist locally, but it is NOT tested or committed. Run git status first. To test: cd server, npm run dev, then curl http://localhost:5001/api/health (expect status ok, database connected). Also test an unknown route (JSON 404) and a POST with bad JSON to /api/health (JSON 400). If it fails, restore the old server with git restore server/server.js and delete the new folders. Commit only after it works.
