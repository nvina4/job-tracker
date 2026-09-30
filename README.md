# JobTrack

A full-stack job application tracker. Users can create an account, log in, and manage (create, view, update, delete) the jobs they're applying to, with filtering by application status.

## Tech Stack

- **Frontend:** React (Vite)
- **Backend:** Node.js, Express
- **Database:** SQLite (via better-sqlite3)
- **Auth:** JWT (jsonwebtoken), bcrypt for password hashing
- **Validation:** Zod

## Project Structure

job-tracker/
├── client/ React frontend
└── server/ Express backend


## Setup Instructions

### 1. Backend (`server`)

```bash
cd server
npm install
```

Create a `.env` file inside `server/` with:

PORT=4000
JWT_SECRET=your_secret_here


Start the server:

```bash
node server.js
```

The server runs on `http://localhost:4000`. The SQLite database (`jobs.db`) and its tables are created automatically on first run — no manual setup needed.

### 2. Frontend (`client`)

In a separate terminal:

```bash
cd client
npm install
npm run dev
```

The app runs on `http://localhost:5173` (Vite's default) and expects the backend to be running at `http://localhost:4000`.

## Features

- Sign up / log in with JWT-based authentication, persisted in `localStorage`
- Auto-logout on token expiry (401 responses)
- Create, view, edit, and delete job applications (company, title, status, application date, notes)
- Filter jobs by status (All / Applied / Interviewing / Rejected / Offer)
- Form-level validation on both frontend (required fields via `<select>`) and backend (Zod schema)
- Error handling and messaging on all API calls
- Light/dark mode support (based on system preference)

## Decisions & Trade-offs

- **SQLite** was chosen for simplicity and zero external setup — appropriate for a small take-home project, though not suited for concurrent production use.
- **No deployment**: this app runs locally only, as the assessment didn't require a hosted version. If deployed, note that most free hosting tiers use an ephemeral filesystem, meaning the SQLite database would reset on every server restart — a managed database (e.g. Postgres) would be the next step for a persistent, production-ready version.
- **Status field** is a fixed dropdown (Applied / Interviewing / Rejected / Offer) rather than free text, to keep values consistent for the filter feature.
- **CORS** is currently open (`cors()` with no restrictions) for local development simplicity; a production version would restrict it to a specific frontend origin.