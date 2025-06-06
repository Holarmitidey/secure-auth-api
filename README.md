﻿# secure Authentication API
This project is a secure authentication REST API built with **Node.js** and **Express**, featuring JWT token-based login, input validation, error handling, and a mock database.
## Features
- **Login Endpoint (`/api/login`)** 
- Accepts email and password
- Validates input manually
- Authenticates against a mock database 
- Returns a JWT token upon success
- **Token Verification Endpoint (`/api/verify`)** 
- Accepts a JWT token - Verifies validity 
- Returns decoded email if valid
## Tech Stack
- Node.js
- Express.js
- JSON Web Token (`jsonwebtoken`)
- dotenv
---
## Getting Started
### 1. Clone the Repository
```bash
    git clone https://github.com/Holarmitidey/secure-auth-api.git
    cd secure-auth-api
```
### 2. Install Dependencies
```bash
    npm install
```
### 3. Environment VariablesCreate a `.env` file in the root directory:
```env
    JWT_SECRET = SECRET_123
```
### 4. Start the Server
```bash
    node index.js
```
Server runs on `http://localhost:3000`.
---
## API Endpoints
### **POST /api/login**
**Request Body:**
```json
{
    "email": "test@example.com", 
    "password": "password123"
}
```
**Success Response:**
```json
{
    "token": "jwt-token-string"
}
```
**Errors:**
- `400 Bad Request` – Missing or invalid input
- `401 Unauthorized` – Wrong credentials
---
### **POST /api/verify**
**Request Body:**
```json
{
    "token": "jwt-token-string"
}
```
**Success Response:**
```json
{  
    "test@example.com"
}
```
**Errors:**
- `401 Unauthorized` – Wrong Credentials
- `403 Forbidden` -  Expired token
- `500 Internal Server Error` - JWT generation fails

---
## Mock DatabaseThe mock user database is stored in `mockDB.js`:
```js
[ 
    { 
        email: "test@example.com", 
        password: "password123" 
    }
]
```
---
## Project Structure
```
/routes
  auth.js
/middleware
  validateLogin.js
mockDB.js
index.js
.env
```
## License
This project is for educational and assessment purposes.
