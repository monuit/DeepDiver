// popup/popup.js
// When user clicks "Scan profile", ask the active tab for extracted data, or inject script to extract and then ask background for enrichment

const scanBtn = document.getElementById('scan');
const output = document.getElementById('output');

scanBtn.addEventListener('click', async () => {
  output.textContent = 'Scanning...';
  // Ask the active tab to run the content script extraction if needed
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab) return (output.textContent = 'No active tab');

  // Use scripting.executeScript to run extractors in case content script didn't run
  try {
    await chrome.scripting.executeScript({
      target: { tabId: tab.id },
      files: ['content-scripts/linkedin.js', 'content-scripts/x.js']
    });
  } catch (err) {
    console.warn('executeScript', err);
  }

  // Listen for a postMessage from the page (content script forwards via window.postMessage)
  function onMessage(event) {
    if (event.source !== window && event.data && event.data.source === 'deepdiver-content' && event.data.type === 'profile-extracted') {
      const profile = event.data.payload;
      output.textContent = JSON.stringify(profile, null, 2);

      // Send to background for enrichment
      chrome.runtime.sendMessage({ type: 'enrich-profile', payload: profile }, (resp) => {
        if (resp && resp.ok) {
          output.textContent = JSON.stringify({ profile, enrichment: resp.result }, null, 2);
        } else {
          console.warn('enrich failed', resp);
        }
      });

      window.removeEventListener('message', onMessage);
    }
  }

  window.addEventListener('message', onMessage);

  // As a fallback, try to ask the content script via runtime messaging
  try {
    const resp = await chrome.tabs.sendMessage(tab.id, { type: 'request-profile' });
    if (resp && resp.profile) {
      output.textContent = JSON.stringify(resp.profile, null, 2);
    }
  } catch (e) { /* ignore */ }
});
