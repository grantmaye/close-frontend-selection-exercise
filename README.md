# Close Frontend Selection Exercise

This repository contains my solution to Close's frontend item-selection exercise.

## What it demonstrates

- Select and unselect individual items
- Keep multiple items selected at once
- Display selected item names above the list
- Highlight selected items visually
- Support keyboard interaction with Enter and Space
- Avoid unnecessary list-item renders with `React.memo` and a stable callback

The application uses the same generated item data and component boundary as the original exercise. Only the implementation above the exercise's protected marker is changed.

## Run locally

Serve the repository over HTTP because Babel fetches `app.jsx`:

```sh
python3 -m http.server 0 --bind 127.0.0.1
```

Open the localhost URL and port printed by the server. React 18.2.0 and Babel 7.25.6 load from public CDNs, so internet access is required for this no-build demo. Opening `index.html` directly with `file://` can fail because of browser cross-origin restrictions.

## Documentation and checks

- [Technical manual](docs/technical-manual.md)
- [Exercise story and demo](docs/product-story.md)

For deterministic Chromium tests (the server supplies the same pinned dependencies locally):

```sh
npm ci
npx playwright install chromium
npm test
```

This remains a small interview exercise, without a backend, persistence, account system, or production SaaS claims. No proprietary interview prompt is included.

