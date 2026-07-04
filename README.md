# Real-Time Chat Application

A production-ready, full-stack real-time chat application built with React, Node.js, MongoDB, and Socket.io.

## Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React (Vite), Tailwind CSS, React Router, Axios |
| Backend | Node.js, Express, MongoDB, Mongoose, JWT, Socket.io |
| Deployment | Vercel (frontend), Render (backend), MongoDB Atlas (database) |

## Project Structure

```
REALTIME_CHAT/
├── client/                 # React frontend (Vite)
│   ├── public/             # Static assets
│   └── src/
│       ├── components/     # Reusable UI components
│       ├── pages/          # Route-level page components
│       ├── hooks/          # Custom React hooks
│       ├── context/        # React Context (auth, socket, etc.)
│       ├── services/       # API & Socket.io service layer
│       └── utils/          # Helper functions
│
└── server/                 # Node.js backend
    ├── config/             # DB, Cloudinary, env config
    ├── controllers/        # Business logic (MVC)
    ├── models/             # Mongoose schemas
    ├── routes/             # Express route definitions
    ├── middleware/         # Auth, validation, error handling
    ├── socket/             # Socket.io event handlers
    └── index.js            # Entry point
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- MongoDB Atlas account (Step 3)
- Git

### 1. Clone & install

```bash
# Frontend
cd client
npm install
cp .env.example .env

# Backend
cd ../server
npm install
cp .env.example .env
```

### 2. Run locally

```bash
# Terminal 1 — Backend
cd server
npm run dev

# Terminal 2 — Frontend
cd client
npm run dev
```

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health

## License

MIT
