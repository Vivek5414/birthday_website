# Little Wild One Birthday Website

The site is a single React, TypeScript, and Vite application. The public invitation and the existing Organizer Corner dashboard are served by the same app.

## Local development

```sh
npm install
npm run dev
```

Vite runs at [http://localhost:5173](http://localhost:5173). The port is fixed and strict, so startup fails instead of silently choosing a different port if it is already in use. The organizer dashboard is available at [http://localhost:5173/admin](http://localhost:5173/admin).

## Build and preview

```sh
npm run build
npm run preview
```

The production build is written to `dist/`. Vercel serves that build and uses `vercel.json` to route direct requests and refreshes, including `/admin`, back to the SPA entry point.

## Dashboard data

The Organizer Corner is an existing local demo dashboard. Its data is stored in the current browser and is not synchronized, backed up, or protected by authentication. Do not enter private guest information or credentials; a production system requiring private shared data needs an authenticated backend.