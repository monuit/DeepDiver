// lib/extractors.js
// Export pure DOM-based extractor functions so they can be unit-tested with jsdom.

function extractLinkedIn(doc) {
  const getText = sel => {
    const el = doc.querySelector(sel);
    return el ? el.textContent.trim() : null;
  };

  const name = getText('h1');
  const headline = getText('.pv-text-details__left-panel .text-body-medium') || getText('.text-heading-xlarge');
  const location = getText('.pv-text-details__left-panel .text-body-small') || getText('.text-body-small');
  const about = getText('.pv-about__summary-text') || getText('.artdeco-entity-lockup__subtitle');

  const links = Array.from(doc.querySelectorAll('a')).map(a => a.href).filter(Boolean);

  return { name, headline, location, about, links: Array.from(new Set(links)) };
}

function extractX(doc) {
  const getText = sel => {
    const el = doc.querySelector(sel);
    return el ? el.textContent.trim() : null;
  };
  const name = getText('div[data-testid="UserName"] span') || getText('div.r-1wbh5a2.r-dnmrzs');
  const handle = getText('div[data-testid="UserName"] div span') || getText('div.r-1f6r7vd');
  const bio = getText('div[data-testid="UserDescription"]') || getText('div.css-901oao.r-1k78y06');
  const links = Array.from(doc.querySelectorAll('a')).map(a => a.href).filter(Boolean);
  return { name, handle, bio, links: Array.from(new Set(links)) };
}

module.exports = { extractLinkedIn, extractX };
