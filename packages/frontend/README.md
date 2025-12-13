# Retail Media Creative Builder - Frontend

This is the frontend application for the Retail Media Creative Builder, built with React, TypeScript, and Vite.

## Tech Stack

- **Framework**: [React](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Routing**: [React Router DOM](https://reactrouter.com/)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [React Chartjs 2](https://react-chartjs-2.js.org/)
- **Notifications**: [React Toastify](https://fkhadra.github.io/react-toastify/)
- **Icons**: [React Icons](https://react-icons.github.io/react-icons/)

## Getting Started

1. **Install Dependencies**
   ```bash
   yarn install
   ```

2. **Environment Setup**
   Create a `.env` file in this directory:
   ```env
   VITE_API_URL=http://localhost:4000/api
   ```

3. **Run Development Server**
   ```bash
   yarn dev
   ```
   The app will run at [http://localhost:3000](http://localhost:3000).

4. **Build for Production**
   ```bash
   yarn build
   ```

5. **Linting**
   ```bash
   yarn lint
   ```

## Project Structure

- `src/components`: Reusable UI components (Auth forms, Layouts, etc.)
- `src/contexts`: React Context providers (AuthContext)
- `src/pages`: Main application pages (Dashboard, Settings, Login, Signup)
- `src/styles`: Global styles and Tailwind configuration
