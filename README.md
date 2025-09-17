## 🔐 Authentication & Password Reset – Backend (Node.js + Express + MongoDB)

A complete Node.js/Express backend implementation for user authentication (Register, Login) and password reset functionality.

This is the **backend** for the Password Reset flow, built using:
- Node.js + Express
- MongoDB + Mongoose
- JWT for authentication
- BcryptJS for password hashing
- Nodemailer for sending emails
- CORS enabled for frontend connection

It provides APIs for **register, login, forgot password, and reset password**.  
 backend on **Render**.

---

## 🚀 Features
✅ User Registration & Login (with JWT)

✅ Password Hashing with BcryptJS

✅ Forgot Password with random reset string

✅ Password Reset with token expiry (15 minutes)

✅ Nodemailer (Gmail SMTP) integration

✅ Centralized Error Handler

✅ MongoDB Atlas connection

✅ CORS enabled for frontend

---

## Project Structure

backend/
├── src/
│   ├── config/
│   │   └── Db.js
│   ├── controllers/
│   │   └── authController.js
│   ├── middlewares/
│   │   └── errorHandlers.js
│   ├── models/
│   │   └── User.js
│   ├── routes/
│   │   └── authRoute.js
│   └── utills/
│       └── sendEmail.js
├── .env
└── index.js

## Gmail App Password Setup

Enable 2-factor authentication on your Gmail account

Go to Google Account settings → Security → 2-Step Verification → App passwords

Generate a password for "Mail" application

Use this generated password as your EMAIL_PASS


## Authentication Routes

| Method | Endpoint | Description | Request Body |
| --- | --- | --- | --- |
| POST | /api/auth/register | Register a new user | { name, email, password } |
| POST | /api/auth/login | User login | { email, password } |
| POST | /api/auth/forgotPassword | Initiate password reset | { email } |
| POST | /api/auth/resetPassword/:token | Reset password with token | { newPassword } |

## Database Schema

**User Model**
{
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  resetPasswordString: String,    
  resetPasswordExpires: Date,      
  timestamps: true                 

}

###  Clone Repository
```bash
git clone https://github.com/arunjo96/password-reset-flow-backend.git

