# Boo Personality Database Server

A Node.js/Express server for managing personality profiles with MongoDB.

## Features

- Create new personality profiles
- View profile details (MBTI, Enneagram, etc.)
- Store profiles in MongoDB
- RESTful API endpoints

## Installation

```bash
npm install
```

## Environment Setup

Create a `.env` file in the root directory:

```
MONGODB_URI=mongodb://localhost:27017/boo
PORT=3000
```

## Running the Server

**Development mode** (with auto-reload):
```bash
npm run dev
```

**Production mode**:
```bash
npm start
```

The server will start on `http://localhost:3000`

## Running Tests

```bash
npm test
```

## Project Structure

```
├── app.js                 # Main application file
├── config/
│   └── mongo.js          # MongoDB connection
├── models/
│   └── Profile.js        # Profile schema
├── routes/
│   └── profile.js        # Profile routes
├── views/
│   ├── create_profile.ejs
│   └── profile_template.ejs
└── tests/
    └── profile.spec.js   # Unit tests
```

## API Endpoints

- `GET /create` - Render create profile form
- `POST /profiles` - Create a new profile
- `GET /*` - View profile details

## Dependencies

- **express** - Web framework
- **mongoose** - MongoDB ODM
- **ejs** - Template engine

## Dev Dependencies

- **jest** - Testing framework
- **supertest** - HTTP assertion library
- **nodemon** - Auto-reload during development