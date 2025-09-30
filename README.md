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

## How to push this repo to GitHub

This repository can be pushed to your remote `https://github.com/monuit/DeepDiver.git`.

If you want me to attempt the push from this machine, I will try to initialize git, create the initial commit, add the remote, and push. Note: pushes will require authentication — typically via a personal access token (PAT) for HTTPS or an SSH key. If the automated push fails due to missing credentials, follow the commands below locally in PowerShell.

Commands to run locally in PowerShell (replace with your email/name and the path if different):

```powershell
cd "c:\Users\boredbedouin\Desktop\linkedin-deep-dive"
git init
git add .
git commit -m "chore: initial DeepDiver scaffold"
git branch -M main
git remote add origin https://github.com/monuit/DeepDiver.git
# If using HTTPS, push with a PAT (it will prompt for username/password where password is the PAT)
git push -u origin main
```

If you prefer SSH, first add your SSH key to GitHub and then run:

```powershell
git remote set-url origin git@github.com:monuit/DeepDiver.git
git push -u origin main
```

If a push fails here, I'll report the exact error so you can follow the steps or provide credentials/token if you want me to complete the push.

## License
MIT
