# WoofMate

WoofMate is an AI-assisted animal adoption and pet care platform that connects adopters, shelters, and rescue communities in one place.

The project is designed to make adoption easier, safer, and more transparent through features like personalized pet matching, rescue reporting, real-time chat, and learning resources.

## Live Links

- Frontend (Netlify): https://woofmate.netlify.app/
- Backend (Render): https://s66-yashasvi-vinjamuri-capstone-woofmate.onrender.com/

## Mission

To help rescue animals find loving homes while promoting responsible pet ownership.

WoofMate combines practical adoption tools with AI-driven support so adopters can make better decisions, shelters can manage requests efficiently, and communities can contribute to animal welfare.

## Core Features

- Adoption listings with search and filters (breed, age, size, personality)
- Rescue reporting flow for stray or injured animals
- Donation support for shelters and welfare initiatives
- Real-time chat between adopters and shelter/admin contacts
- AI chatbot for pet care guidance and FAQs
- Personalized dog matching quiz powered by AI
- Adoption status and user-centered tracking workflows
- Foster-care participation support
- Nearby pet-friendly places and utility mapping

## Tech Stack

- Frontend: React + Vite + Tailwind CSS
- Backend: Node.js + Express.js
- Database: MongoDB (Mongoose)
- Authentication: JWT + Google OAuth
- Realtime: Socket.IO
- AI Integration: OpenAI API
- Deployment: Netlify (frontend), Render (backend)

## Project Structure

```text
S66_Yashasvi_Vinjamuri_Capstone_WoofMate/
	backend/
	client/
	README.md
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm
- MongoDB database (Atlas or local)

### 1. Clone the repository

```bash
git clone https://github.com/kalviumcommunity/S66_Yashasvi_Vinjamuri_Capstone_WoofMate.git
cd S66_Yashasvi_Vinjamuri_Capstone_WoofMate
```

### 2. Install dependencies

```bash
cd backend && npm install
cd ../client && npm install
```

### 3. Configure environment variables

Create a `.env` file in `backend/` with values similar to:

```env
PORT=4000
MONGOURL=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
SESSION_SECRET=<your_session_secret>
GOOGLE_CLIENT_ID=<your_google_client_id>
GOOGLE_CLIENT_SECRET=<your_google_client_secret>
GOOGLE_CALLBACK_URL=http://localhost:4000/auth/google/callback
FRONTEND_URL=http://localhost:5173
OPENAI_API_KEY=<your_openai_key>
```

For the frontend, use a `.env` file in `client/` for local development:

```env
VITE_API_URL=http://localhost:4000
```

### 4. Run locally

In one terminal:

```bash
cd backend
npm start
```

In another terminal:

```bash
cd client
npm run dev
```

Frontend local URL: http://localhost:5173

## Deployment Notes

### Frontend (Netlify)

- Set environment variable in Netlify:

```env
VITE_API_URL=https://s66-yashasvi-vinjamuri-capstone-woofmate.onrender.com
```

- After updating env vars, trigger "Clear cache and deploy site".

### Backend (Render)

- Ensure Render environment includes all backend secrets.
- Set `FRONTEND_URL=https://woofmate.netlify.app` for CORS and OAuth redirects.
- Set `GOOGLE_CALLBACK_URL=https://s66-yashasvi-vinjamuri-capstone-woofmate.onrender.com/auth/google/callback` for Google login in production.

## Development Milestones

### Day 1: Setup and backend foundation

- Repository and monorepo structure setup
- Dependency installation (React, Express, MongoDB, etc.)
- Core schema planning (users, animals, chats, donations, attempts)

### Day 2: Frontend base and authentication

- Vite + Tailwind frontend setup
- Landing, auth, and navigation flows
- Integration with backend auth endpoints

### Day 3: Adoption experience

- Adoption listings UI
- Backend data fetching and rendering
- Filtering and search implementation
- Functional testing of listing interactions

## Future Improvements

- Stronger admin moderation workflows
- Enhanced analytics for rescue and adoption funnels
- Performance optimization and route-level code splitting
- Improved test coverage (unit + integration)

## License

This project is intended for educational and portfolio use.
