# SynergySquad Live Quiz System

A real-time, interactive quiz application built with the MERN stack and Socket.io. Features a Master Host Dashboard and dedicated Team Dashboards with live scoring, real-time locking, and countdown timers.

## 1. System Architecture

The project follows a modular client-server architecture:
- **Backend (Node.js + Express + Socket.io)**: Manages real-time state, handles database connections, broadcasts events to connected clients, and calculates scores based on a highly-optimized timestamp logic.
- **Frontend (React + Vite + Tailwind CSS)**: A fast, modern SPA containing logic for both the Host and Team Dashboards. Context API wraps the application to seamlessly provide Socket.io connections across components.
- **Database (MongoDB)**: Stores `Team`, `Question`, `QuizState`, and `Submission` models, ensuring state recovery and robust data relations.

## 2. Backend Code Structure
- **`server.js`**: Initializes the Express app, sets up the HTTP server, connects to MongoDB, and binds the Socket.io listeners. It also acts as the central state dispatcher.
- **`models/`**: Contains Mongoose Schemas (`Team.js`, `Question.js`, `QuizState.js`, `Submission.js`).
- **`utils/`**: Helper files containing the 20 Preloaded Demo Questions (`questions.js`) and the Scoring Algorithm logic (`scoring.js`).

## 3. Frontend Code Structure
- **`context/SocketContext.jsx`**: A React Context provider that establishes the WebSocket connection on load and exposes the global synced `quizState` and `timer` variables.
- **`pages/HostDashboard.jsx`**: The master view. Allows the host to start the quiz, increment questions, view live lock status, and reveal answers.
- **`pages/TeamDashboard.jsx`**: Team specific view (accessible via `/team/:id`). Provides interfaces for multiple-choice and fill-in-the-blank questions alongside a "Lock Answer" feature.
- **`components/`**: Reusable components like the dynamic `Timer.jsx` and `Leaderboard.jsx`.

## 4. Socket Events Mapping

### Host to Server
- `host:start_quiz`: Transitions the quiz from "waiting" to "active", resetting previous submissions and starting the timer.
- `host:next_question`: Increments the question index and resets the 60-second timer.
- `host:reveal_answer`: Closes submissons, triggers the scoring logic, and broadcasts the correct options/justifications.
- `host:time_up`: Force stops accepting answers but waits for the host to click reveal.

### Team to Server
- `team:lock_answer`: Emits `{ teamId, answer }`. The server timestamps the submission.

### Server to Clients
- `server:state_update`: Broadcasts the unified `QuizState`, `Question`, `Teams` (with scores), and `Submissions`.
- `server:timer_sync`: Pulses the timer duration (e.g. 60) down to all clients.

## 5. Scoring Algorithm

1. **Sorting**: Submissions are strictly sorted by the `Date` timestamp recorded precisely when `team:lock_answer` hit the Node.js server.
2. **Correctness Filtering**: Validates if the team's answer exactly matches or appropriately matches the `correctAnswer`.
3. **Awarding Points**: 
    - **Correct Answers**: 1st lock (+4), 2nd (+3), 3rd (+2), 4th (+1).
    - **Wrong Answers**: 1st wrong (-2), others (-1).
    - **Skipped** (No lock before reveal/timeout): 0 points.
4. **Mutations**: Updates are bundled and patched to the Database concurrently.

## 6. How to Run Locally

### Prerequisites
- Node.js (v16+)
- MongoDB running locally on `mongodb://127.0.0.1:27017`

### Backend Setup
```bash
cd backend
npm install
npm start (or node server.js)
```

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Open `http://localhost:5173/host` for the Host Dashboard.
Open `http://localhost:5173/team/A` for Team A (B, C, D available).

## 7. Deployment Steps

To deploy for production:

**Backend (e.g., Render, Heroku):**
1. Ensure the `MONGO_URI` environment variable is pointing to a cloud cluster (like MongoDB Atlas).
2. Set `NODE_ENV=production`.
3. Configure the start command as `node server.js`.

**Frontend (e.g., Vercel, Netlify):**
1. Add `.env.production` file with `VITE_BACKEND_URL=https://<your-backend-url>`.
2. Run `npm run build`.
3. Set the public directory to `/dist` and ensure routing rewrites all paths to `index.html`.

## 8. Future Extensibility
- **Dynamic Teams**: Adapt the `Server.js` logic to listen for dynamic `team:register` events rather than hardcoding A, B, C, and D.
- **Authentication**: Integrate JWT auth to prevent random users from joining the `/host` route.
- **Rich Media**: Extend the `Question` schema to hold image URLs or audio clips, passing them through `server:state_update`.
- **Custom Overrides**: Add an endpoint in the host view to manually increment/decrement points when teams argue an answer via a custom UI modal.
