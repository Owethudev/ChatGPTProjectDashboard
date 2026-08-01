# Project Management Dashboard

A frontend-only project management dashboard built with React 19, TypeScript, Vite, React Router, Tailwind CSS, Context API, and LocalStorage persistence. The app provides a modular experience for browsing projects, managing tasks, viewing project details, and creating tasks without a backend.

## Overview

This project demonstrates a production-style frontend architecture for a project management product. It focuses on reusable components, typed state, clean routing, controlled forms, validation, and instant UI updates powered by mock data.

## Features

- Dashboard with calculated statistics and project progress
- Projects page with search, status filtering, and sorting
- Project details with tasks, team members, and progress
- Task details with status, priority, assignee, and delete actions
- Controlled task creation form with validation
- LocalStorage persistence for projects, tasks, members, and activity
- Lazy-loaded routes for project details and task details
- Responsive Tailwind-based layout

## Screenshots

Placeholder for screenshots.

## Technologies Used

- React 19
- TypeScript
- Vite
- React Router
- Tailwind CSS
- Context API
- LocalStorage

## Folder Structure

- src/components: reusable UI and domain components
- src/context: global state management
- src/data: mock JSON-style data
- src/hooks: custom hooks
- src/pages: route-level views
- src/routes: router configuration and lazy-loaded routes
- src/types: typed models for projects, tasks, and members
- src/utils: small helpers

## Installation

```bash
cd frontend/@latest
npm install
npm run dev
```

## Available Scripts

```bash
npm run dev
npm run build
npm run preview
```

## Data Source

Mock data is provided from src/data/mockData.ts and is persisted in LocalStorage so refreshes preserve changes.

## State Management

Global state is managed through Context API with custom hooks for local persistence and dashboard statistics.

## Future Improvements

- Connect to a real backend API
- Add authentication and role-based access
- Expand analytics and charts
- Add drag-and-drop task boards

## Deployment

The app is Vite-based and can be deployed to Vercel with the standard build command.

## License

MIT
