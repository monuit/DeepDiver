const { JSDOM } = require('jsdom');
const { extractLinkedIn, extractX } = require('../lib/extractors');

describe('extractors', () => {
  test('extractLinkedIn picks up name, headline, location and about', () => {
    const html = `
      <html><body>
        <h1>Jane Doe</h1>
        <div class="pv-text-details__left-panel">
          <div class="text-body-medium">Senior Engineer</div>
          <div class="text-body-small">San Francisco Bay Area</div>
        </div>
        <section class="pv-about__summary-text">Experienced engineer...</section>
        <a href="https://example.com">link</a>
      </body></html>`;

    const dom = new JSDOM(html);
    const out = extractLinkedIn(dom.window.document);
    expect(out.name).toBe('Jane Doe');
    expect(out.headline).toBe('Senior Engineer');
    expect(out.location).toBe('San Francisco Bay Area');
    expect(out.about).toBe('Experienced engineer...');
    expect(out.links).toContain('https://example.com/');
  });

  test('extractX picks up name, handle, bio and links', () => {
    const html = `
      <html><body>
        <div data-testid="UserName"><span>John X</span><div><span>@john</span></div></div>
        <div data-testid="UserDescription">I tweet</div>
        <a href="https://github.com/john">gh</a>
      </body></html>`;

    const dom = new JSDOM(html);
    const out = extractX(dom.window.document);
    expect(out.name).toBe('John X');
    expect(out.handle).toBe('@john');
    expect(out.bio).toBe('I tweet');
  expect(out.links.some(l => l.startsWith('https://github.com/john'))).toBeTruthy();
  });
});
