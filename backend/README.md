# Wedding website backend

The Express server serves the website and accepts private guest messages at
`POST /api/messages`. Messages are inserted into Supabase and are not exposed
through a public read endpoint.

## Supabase setup

1. In the Supabase SQL Editor, run [`schema.sql`](./schema.sql).
2. Set `SUPABASE_URL` and `SUPABASE_SECRET_KEY` in the server environment. A
   legacy `SUPABASE_SERVICE_ROLE_KEY` variable is also accepted. Use the
   Supabase secret/service-role key only on the server; never put it in website
   code or a `VITE_` variable. The publishable key provided for the webpage is
   not sufficient for this backend because it would allow clients to bypass the
   API's validation and rate limit.
3. For local development, copy `.env.example` to `.env` and set your values.

`POST /api/messages` accepts JSON with `name` (1-100 characters) and `message`
(1-3000 characters). The endpoint limits each client to five submissions per
15 minutes. `GET /api/health` is the Render health check.

## Deploy to Render

Create a new **Blueprint** from this repository and Render will use the root
[`render.yaml`](../render.yaml). In the web service's Environment settings, add
`SUPABASE_URL` and `SUPABASE_SECRET_KEY` using values from your Supabase
project's API settings. Render supplies `PORT` automatically.

The server serves the existing `index.html`, `style.css`, `script.js`, and
`pictures/` directory, so the webpage and API share one origin.
