// content-scripts/linkedin.js
// Minimal LinkedIn profile extractor — extracts visible name, headline, location, and about

(function() {
  function extract() {
    const data = {};
    // Name
    const nameEl = document.querySelector('h1');
    data.name = nameEl ? nameEl.innerText.trim() : null;

    // Headline
    const headlineEl = document.querySelector('.pv-text-details__left-panel .text-body-medium') || document.querySelector('.text-heading-xlarge');
    data.headline = headlineEl ? headlineEl.innerText.trim() : null;

    // Location
    const locEl = document.querySelector('.pv-text-details__left-panel .text-body-small') || document.querySelector('.text-body-small');
    data.location = locEl ? locEl.innerText.trim() : null;

    // About / summary
    const aboutEl = document.querySelector('.pv-about__summary-text') || document.querySelector('.artdeco-entity-lockup__subtitle');
    data.about = aboutEl ? aboutEl.innerText.trim() : null;

    // Top card links (company, website, twitter)
    const links = [];
    document.querySelectorAll('a').forEach(a => {
      if (a.href) links.push(a.href);
    });
    data.links = Array.from(new Set(links));

    return data;
  }

  // Send extracted data to the background service worker for enrichment
  const extracted = extract();
  window.postMessage({ source: 'deepdiver-content', type: 'profile-extracted', payload: extracted }, '*');

})();
