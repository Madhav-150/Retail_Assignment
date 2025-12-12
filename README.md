# Retail Media Dashboard

A comprehensive dashboard application for tracking sales, user activity, and managing reports.

## Features

- 👥 **User Authentication**: Secure Login and Signup with session management.
- 📊 **Dashboard**: Interactive charts for revenue, user growth, and category sales.
- 📝 **Reporting**: Create and manage monthly, quarterly, and yearly reports.
- ⚙️ **Settings**: User profile management with persistent storage.
- 📱 **Responsive Design**: Optimized for various screen sizes.
- 🎨 **Modern UI**: Built with Tailwind CSS for a sleek look.

## Tech Stack

- **Frontend**: 
  - React 18
  - TypeScript
  - Vite
  - Tailwind CSS
  - React Router DOM
  - Axios
  - Chart.js
  - React Toastify

- **Backend**: 
  - Node.js
  - Express
  - TypeScript
  - Prisma ORM
  - SQLite (Database)
  - Express Sessions

## Prerequisites

- Node.js 18+
- npm, pnpm, or yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd retail-media-dashboard
   ```

2. **Install dependencies**
   ```bash
   # Install root dependencies (if any)
   npm install

   # Install Backend dependencies
   cd packages/backend
   npm install

   # Install Frontend dependencies
   cd ../frontend
   npm install
   ```

3. **Set up Environment Variables**

   **Backend** (`packages/backend/.env`):
   ```env
   PORT=4000
   NODE_ENV=development
   DATABASE_URL="file:./dev.db"
   SESSION_SECRET=your_super_secret_session_key
   ```

   **Frontend** (`packages/frontend/.env`):
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```

4. **Database Setup**
   ```bash
   cd packages/backend
   npx prisma migrate dev --name init
   ```

5. **Start the Application**

   **Backend**:
   ```bash
   cd packages/backend
   npm run dev
   ```

   **Frontend**:
   ```bash
   cd packages/frontend
   npm run dev
   ```

6. **Access the App**
   - Frontend: [http://localhost:3000](http://localhost:3000)
   - Backend API: [http://localhost:4000](http://localhost:4000)

## Project Structure

```
retail-media-dashboard/
├── packages/
│   ├── backend/               # Express API server & Prisma
│   │   ├── src/
│   │   │   ├── api/          # API routes & controllers
│   │   │   ├── middleware/   # Auth & Error middleware
│   │   │   └── index.ts      # Entry point
│   │   └── prisma/           # Database schema
│   │
│   └── frontend/             # React Vite application
│       ├── src/
│       │   ├── components/   # UI Components
│       │   ├── contexts/     # React Contexts (Auth)
│       │   ├── pages/        # Application Pages
│       │   └── styles/       # Tailwind styles
```

## License

MIT
