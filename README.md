# DeepDiver

DeepDiver is a free, open-source Chrome extension that helps you "deep dive" into a LinkedIn or X profile by extracting public profile metadata and enriching it with free data sources (Wikidata, GitHub public data, email-pattern heuristics).

This repository contains a minimal Manifest v3 Chrome extension scaffold you can load as an unpacked extension for development.

## Goals
- Extract name, headline, location, job history, and social links from LinkedIn and X profiles
- Enrich extracted data using free sources: Wikidata SPARQL, GitHub public APIs, and email pattern guessers
- Respect privacy and site Terms of Service; provide clear disclaimers in the UI

## Getting started (development)
1. Open Chrome and go to chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked" and select this repository's folder

## Files
- `manifest.json` - Chrome extension manifest (v3)
- `content-scripts/` - content scripts for LinkedIn/X parsing
- `service-worker.js` - background service worker for enrichment requests
- `popup/` - popup UI shown when user clicks the extension

## Getting started (development)

1. Open Chrome and go to chrome://extensions
2. Enable "Developer mode"
3. Click "Load unpacked" and select this repository's folder (the folder containing `manifest.json`)

Optional: run a quick local check

- Open any LinkedIn or X profile page in your browser
- Click the DeepDiver extension icon and press "Scan profile"
- You'll see extracted JSON shown in the popup (basic fields: name, headline/bio, location, links) and a small Wikidata enrichment result if a match is found.

## License
MIT
