# Frontend

This directory contains the React and TypeScript frontend for the production platform.

The frontend uses Vite for local development and production builds. Production builds create static files in `dist/` for deployment.

## Requirements

* Node.js
* npm

## Install Dependencies

From the `frontend/` directory:

```bash
npm install
```

## Run Locally

```bash
npm run dev
```

Vite starts a local development server and prints the local URL in the terminal.

## Lint

```bash
npm run lint
```

## Build for Production

```bash
npm run build
```

The production build is created in `frontend/dist/`.
