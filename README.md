# 📝 Notes Backend API

A fully functional RESTful API built with **Node.js, Express, and MongoDB**, featuring authentication, authorization, and full CRUD operations.

---

## 🚀 Live API

https://notes-backend-production-c2d2.up.railway.app

---

## ⚙️ Tech Stack

- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- bcrypt.js
- Railway Deployment

---

## 📌 Features

### 👤 Authentication

- User Registration
- User Login
- JWT Token Generation
- Protected Routes

---

### 👥 Users

- Get all users
- Get user by ID
- Update user (protected)
- Delete user (admin only)

---

### 📝 Posts

- Create post (protected)
- Get all posts (with pagination)
- Update post (protected)
- Delete post (protected)

---

### 🔐 Security

- Password hashing (bcrypt)
- Role-based access (user / admin)
- Middleware protection

---

## 📊 Pagination Example

GET /api/posts?page=1&limit=5

---

## 🧪 Testing

You can test the API using:

- Postman
- Thunder Client

---

## 📂 API Base URL

https://notes-backend-production-c2d2.up.railway.app

---

## 📌 API Endpoints

### 🔐 Auth

- POST /api/auth/register
- POST /api/auth/login
- GET /api/auth/me

---

### 👥 Users

- GET /api/users
- GET /api/users/:id
- PUT /api/users/:id
- DELETE /api/users/:id

---

### 📝 Posts

- GET /api/posts
- POST /api/posts
- PUT /api/posts/:id
- DELETE /api/posts/:id

---

## 🚀 Status

Project is fully functional and deployed.

---

## 🚀 Next Step

Building a full frontend using **Next.js + TypeScript + Tailwind CSS**

---

## 🧠 What I Learned

- REST API Design
- Authentication & Authorization
- JWT Security Flow
- MongoDB Schema Design
- Middleware Architecture
- Deployment on Railway

---

## 👨‍💻 Author

Omar Salama
