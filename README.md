# 🔐 Full-Stack Authentication Project

A full-stack application built with Next.js frontend and NestJS backend, implementing user authentication functionality.

## 📁 Project Structure

- `frontend/`: Next.js application
- `backend/`: NestJS application

## ⚡ Prerequisites

- Node.js (Latest LTS version recommended)
- MongoDB installed and running locally
- npm or yarn package manager

## 🚀 Getting Started

### Backend Setup

1. Navigate to the backend directory:

   ```bash
   cd backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the backend directory with the following content:

   ```
   PORT=3001
   MONGO_URI=mongodb://localhost/nest
   JWT_SECRET=secret
   JWT_EXPIRATION=3d
   ```

4. Start the development server:
   ```bash
   npm run start:dev
   ```

The backend server will start on http://localhost:3001 ✨

### Frontend Setup

1. Navigate to the frontend directory:

   ```bash
   cd frontend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the frontend directory with the following content:

   ```
   NEXT_PUBLIC_DUMMY_API_URL=https://dummyjson.com
   NEXT_PUBLIC_BASE_API_URL=http://localhost:3001
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

The frontend application will be available at http://localhost:3000 🌟

## 📜 Available Scripts

### Backend

- `npm run start`: Start the production server
- `npm run start:dev`: Start the development server with hot-reload
- `npm run build`: Build the application
- `npm run test`: Run tests
- `npm run lint`: Lint and fix files

### Frontend

- `npm run dev`: Start the development server
- `npm run build`: Build the application
- `npm run start`: Start the production server
- `npm run lint`: Lint and fix files

## ⚙️ Environment Variables

### Backend

- `PORT`: The port number for the backend server
- `MONGO_URI`: MongoDB connection string
- `JWT_SECRET`: Secret key for JWT token generation
- `JWT_EXPIRATION`: JWT token expiration time

### Frontend

- `NEXT_PUBLIC_DUMMY_API_URL`: URL for the dummy API service
- `NEXT_PUBLIC_BASE_API_URL`: URL for the backend API

> **⚠️ Disclaimer:** The `.env` files shown above are included for demonstration purposes only. In a production environment, these files should never be committed to version control. Make sure to add `.env` to your `.gitignore` file and maintain proper environment variable management for your production deployments.
