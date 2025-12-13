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
- yarn

## Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd retail-media-dashboard
   ```

2. **Install dependencies**
   We use Yarn workspaces, so you only need to run install once in the root directory.
   ```bash
   yarn install
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
   yarn workspace @retail-media/backend dev
   ```

   **Frontend**:
   ```bash
   yarn workspace @retail-media/frontend dev
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
## Output: Preview of Website

![WhatsApp Image 2025-12-13 at 5 51 40 PM](https://github.com/user-attachments/assets/fe51a178-a969-41b5-a1a6-0431c13f4073)
![WhatsApp Image 2025-12-13 at 5 52 29 PM](https://github.com/user-attachments/assets/a28e48ff-aa60-4d47-9ace-45cdcd5d8438)
[frontend.pdf](https://github.com/user-attachments/files/24142056/frontend.pdf)
![WhatsApp Image 2025-12-13 at 5 55 54 PM](https://github.com/user-attachments/assets/6edde738-0346-4db2-8d00-d826a1f7ee47)
![WhatsApp Image 2025-12-13 at 5 55 54 PM (1)](https://github.com/user-attachments/assets/f489c8b3-7ed9-4ed7-9a77-db90421a9014)
![WhatsApp Image 2025-12-13 at 5 55 54 PM (2)](https://github.com/user-attachments/assets/3ee8740e-5b95-47ee-ae6f-10d5f9414957)
![WhatsApp Image 2025-12-13 at 5 56 59 PM](https://github.com/user-attachments/assets/4c431df6-9b18-4f94-9575-229ec2ce281a)
![WhatsApp Image 2025-12-13 at 5 57 41 PM](https://github.com/user-attachments/assets/7720ca83-e7df-484a-8800-b633590be71a)
![WhatsApp Image 2025-12-13 at 5 57 41 PM](https://github.com/user-attachments/assets/f2fba421-a23a-4dfb-85fd-9c625f0b4d02)
![WhatsApp Image 2025-12-13 at 5 59 35 PM](https://github.com/user-attachments/assets/77eb68f4-788c-4c42-ad60-4a24cc5c2406)


## License

MIT
