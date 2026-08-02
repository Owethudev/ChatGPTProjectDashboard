# Project Management Dashboard

## Project Overview

This project is a frontend-only project management dashboard built with React, TypeScript, Vite, and Tailwind CSS. It provides a polished interface for viewing projects, tracking tasks, and managing work items without requiring a backend.

## Features

- Dashboard with summary statistics and progress insights
- Projects page with search, filtering, and status views
- Project detail pages showing tasks, members, and progress
- Task detail pages with status, priority, assignee, and notes
- Task creation form with validation and instant updates
- LocalStorage-based persistence for a realistic demo experience
- Responsive layout designed for desktop and smaller screens

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Context API
- LocalStorage

## Setup Instructions

From the repository root, run:

```bash
cd frontend
npm install
npm run dev
```

The app will be available in your browser at the local Vite URL shown in the terminal.

## Data Source Information

The app uses mock data stored in the frontend source under the data folder. Project and task changes are also persisted locally in the browser using LocalStorage, so updates remain available after a refresh.
