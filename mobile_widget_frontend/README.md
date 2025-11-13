# Mobile Widget Frontend (Ocean Professional)

Mobile-first React widget with a single-column layout, fixed header, sticky bottom actions, and theme-driven design.

## Quick Start

- Requirements: Node 18+
- Install: `npm install`
- Run: `npm start` (http://localhost:3000)
- Test: `npm test`
- Build: `npm run build`

## Theme

Ocean Professional palette:
- Primary: `#2563EB`
- Secondary/Success: `#F59E0B`
- Error: `#EF4444`
- Background: `#f9fafb`
- Surface: `#ffffff`
- Text: `#111827`

See `src/theme.css` for variables.

## Layout

- Fixed header with app title/logo placeholder
- Main content hosts `WidgetCard`
- Sticky bottom bar with primary and secondary CTAs
- Routing (react-router-dom@6 with HashRouter):
  - `/` (Home/Widget)
  - `/settings`
  - Health: `{REACT_APP_HEALTHCHECK_PATH}` (defaults to `/health`)
  - Note: HashRouter is used for broad static hosting compatibility. URLs appear as `/#/...`.

## Accessibility

- All interactive elements have aria labels/roles
- Focus rings and keyboard navigation supported
- Honors `prefers-reduced-motion`

## Configuration

The app reads configuration from environment variables (optional) and falls back safely:

- REACT_APP_API_BASE
- REACT_APP_BACKEND_URL
- REACT_APP_FRONTEND_URL
- REACT_APP_WS_URL
- REACT_APP_NODE_ENV
- REACT_APP_NEXT_TELEMETRY_DISABLED
- REACT_APP_ENABLE_SOURCE_MAPS
- REACT_APP_PORT
- REACT_APP_TRUST_PROXY
- REACT_APP_LOG_LEVEL (silent|error|warn|info|debug|trace; default info)
- REACT_APP_HEALTHCHECK_PATH (default /health)
- REACT_APP_FEATURE_FLAGS (comma-separated keys)
- REACT_APP_EXPERIMENTS_ENABLED (true/false; default false)

See `src/utils/config.js`.

## Data

`src/services/mockApi.js`:
- Uses `REACT_APP_API_BASE` if set and returns JSON from `/items`
- Otherwise returns local mock data. Fails gracefully.

## State

`src/context/AppContext.jsx` provides:
- Theme (light/dark)
- Feature flags (persisted via localStorage)
- Experiments toggle (persisted via localStorage)

## Health

Health component at `REACT_APP_HEALTHCHECK_PATH` or `/health`. Navigate via header "Health" button.

## No Telemetry

If `REACT_APP_NEXT_TELEMETRY_DISABLED=true`, telemetry is disabled. This app does not integrate external telemetry services.

## Tests

Minimal test stubs in `src/__tests__/` and `src/App.test.js`.

## .env.example

Create `.env` and set any of the following:
```
REACT_APP_API_BASE=
REACT_APP_BACKEND_URL=
REACT_APP_FRONTEND_URL=
REACT_APP_WS_URL=
REACT_APP_NODE_ENV=development
REACT_APP_NEXT_TELEMETRY_DISABLED=true
REACT_APP_ENABLE_SOURCE_MAPS=false
REACT_APP_PORT=3000
REACT_APP_TRUST_PROXY=false
REACT_APP_LOG_LEVEL=info
REACT_APP_HEALTHCHECK_PATH=/health
REACT_APP_FEATURE_FLAGS=beta,new-ui
REACT_APP_EXPERIMENTS_ENABLED=false

# Supabase (frontend-safe)
REACT_APP_SUPABASE_URL=https://doimejfdhaoionftdiqd.supabase.co
REACT_APP_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIs...
```
