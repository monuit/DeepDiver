// service-worker.js
// Background service worker to receive messages from content scripts and perform enrichment

chrome.runtime.onInstalled.addListener(() => {
  console.log('DeepDiver service worker installed');
});

// Listen for messages from content scripts via window.postMessage; content scripts can also use chrome.runtime.sendMessage
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log('bg received message', message);
  if (message && message.type === 'enrich-profile') {
    // Placeholder: perform enrichment using Wikidata SPARQL
    enrichWithWikidata(message.payload).then(result => sendResponse({ ok: true, result })).catch(err => sendResponse({ ok: false, error: err.message }));
    return true; // keep channel open for async response
  }
});

async function enrichWithWikidata(profile) {
  // Try to query Wikidata by label (name) to find possible matching entities
  if (!profile || !profile.name) return { wikidata: null };
  const name = profile.name;
  const q = `SELECT ?item ?itemLabel ?description WHERE { ?item rdfs:label "${name}"@en. OPTIONAL { ?item schema:description ?description FILTER(lang(?description) = "en") } SERVICE wikibase:label { bd:serviceParam wikibase:language "en". } } LIMIT 10`;
  const url = 'https://query.wikidata.org/sparql?format=json&query=' + encodeURIComponent(q);
  const res = await fetch(url, { headers: { 'User-Agent': 'DeepDiver/0.1 (https://example.com)' } });
  const data = await res.json();
  const results = data.results.bindings.map(b => ({ id: b.item.value, label: b.itemLabel.value, description: b.description ? b.description.value : null }));
  return { wikidata: results };
}

// Also listen to window messages proxied by content scripts
self.addEventListener('message', (e) => {
  console.log('SW got message', e.data);
});
