# Krishi AI (demo)

Krishi AI is a farmer-friendly, ROI-based crop recommendation web app built with Flask and vanilla HTML/CSS/JS. It also supports Progressive Web App (PWA) features for offline access to static pages and fertilizer data.

## Features

- ROI-based crop recommendation from soil, season, rainfall and temperature
- ROI calculator for a chosen crop, area and cost
- Fertilizer comparison table (organic vs chemical, toxicity and price)
- Simple crop selling prototype (listings only, no bidding or payment)
- Profile page with basic farmer info and history of recommendations and listings
- PWA support with `manifest.json` and `service-worker.js` (offline static pages + `/api/fertilizers`)

## Tech stack

- Backend: Python, Flask
- Frontend: HTML, CSS, JavaScript
- PWA: Web App Manifest + Service Worker

## Setup

1. Create and activate a virtual environment (recommended).

2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Run the Flask app:

```bash
python app.py
```

4. Open the app in your browser:

- Navigate to `http://127.0.0.1:5000/`

## Notes

- Login/Register is a simple front-end only mechanism that stores the selected user in `localStorage` for demo purposes.
- All data (crop economics, fertilizers, listings, and history) is dummy/in-memory and resets when the server restarts.
- There is **no disease detection** and **no bidding or payment** logic; this is a focused ROI and recommendation prototype.

