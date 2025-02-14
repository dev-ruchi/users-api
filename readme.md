## Users API
A RESTful API for user authentication, registration, and search functionality using Node.js, Express, MongoDB, and JWT authentication 

## Features 
User signup with validation
User login with JWT authentication
Search users by username or email
Secure password handling with bcrypt
Authentication middleware for protected routes

## Tech Stack
Backend: Node.js, Express.js
Database: MongoDB (local or MongoDB Atlas)
ORM: Mongoose
Authentication: JSON Web Tokens (JWT)
Environment Management: dotenv 

## Routes
- POST /users/signup
- POST /users/login
- GET /users/search  

## Prerequisites
Node.js (version 16 or higher) A code editor like VS Code.

## Install the Node.js dependencies:
```npm install```

## Copy .env file from .env.example:
```cp .env.example .env```
Update the values in the `.env` file

## Start the Server
```npm start```