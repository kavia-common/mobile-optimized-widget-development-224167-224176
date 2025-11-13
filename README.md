# mobile-optimized-widget-development-224167-224176

This workspace contains the mobile_widget_frontend React app implementing a mobile-first widget with the Ocean Professional theme.
Navigate to `mobile_widget_frontend` to run the app.

Routing: The app uses react-router-dom v6 with HashRouter for compatibility with static hosting and base path constraints.

Supabase Integration:
- Env vars required (frontend-safe):
  - REACT_APP_SUPABASE_URL
  - REACT_APP_SUPABASE_ANON_KEY
- Auth routes:
  - /auth/callback (handles email/magic-link/oauth callbacks)
  - /auth/error (generic auth error page)
- Configure Authentication > URL Configuration in Supabase to allow http://localhost:3000/**