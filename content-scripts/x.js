// content-scripts/x.js
// Minimal X/Twitter profile extractor

(function() {
  function extract() {
    const data = {};
    // Name
    const nameEl = document.querySelector('div[data-testid="UserName"] span') || document.querySelector('div.r-1wbh5a2.r-dnmrzs');
    data.name = nameEl ? nameEl.innerText.trim() : null;

    // Handle
    const handleEl = document.querySelector('div[data-testid="UserName"] div span') || document.querySelector('div.r-1f6r7vd');
    data.handle = handleEl ? handleEl.innerText.trim() : null;

    // Bio
    const bioEl = document.querySelector('div[data-testid="UserDescription"]') || document.querySelector('div.css-901oao.r-1k78y06');
    data.bio = bioEl ? bioEl.innerText.trim() : null;

    // Links
    const links = [];
    document.querySelectorAll('a').forEach(a => {
      if (a.href) links.push(a.href);
    });
    data.links = Array.from(new Set(links));

    return data;
  }

  const extracted = extract();
  window.postMessage({ source: 'deepdiver-content', type: 'profile-extracted', payload: extracted }, '*');
})();
