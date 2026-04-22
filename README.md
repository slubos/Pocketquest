
  # Pocket Quest

  Pocket Quest is a frontend prototype for discovering activities based on your current mood, available time, budget, and real-time context.

  ## Features

  - Guided onboarding flow to capture:
    - mood/energy level
    - social preference
    - available time
    - budget
    - preferred activity categories
  - Context-aware recommendations that rank quests using:
    - profile inputs
    - real-time day/time context
    - weather label simulation
  - Interactive quest browsing with:
    - primary “hero” recommendation
    - alternative cards
    - dismiss/archive actions
    - preference refinement
  - Local persistence via `localStorage` for profile, archived quests, dismissed quests, and category preferences.

  ## Tech Stack

  - `React` + `TypeScript`
  - `Vite`
  - `react-router`
  - `Tailwind CSS`
  - `Radix UI`
  - `lucide-react`
  - `motion` (Framer Motion API)

  ## Getting Started

  ### Prerequisites

  - Node.js 18+ (recommended)
  - npm

  ### Install dependencies

  ```bash
  npm install
  ```

  ### Start development server

  ```bash
  npm run dev
  ```

  By default, Vite serves the app at `http://localhost:5173`.

  ### Build for production

  ```bash
  npm run build
  ```

  ## App Flow

  1. `/` – Landing page
  2. `/onboarding` – Multi-step onboarding
  3. `/recommendations` – Personalized quest recommendations
  4. `/quest/:questId` – Quest detail view

  ## Project Structure

  ```text
  src/
    app/
      components/      # UI and route-level screens
      contexts/        # Quest and real-time state providers
      data/            # Mock quest data
      routes.tsx       # App routes
    styles/
      index.css
    main.tsx
  ```

  ## Notes

  - This project currently uses mock data and simulated weather context.
  - There is no backend integration in this code bundle.
  