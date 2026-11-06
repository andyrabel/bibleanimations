// Passing a tour on, shared by every animation: the "Share this tour" dialog
// (link, the phone's own share sheet, e-mail and social links, and an <iframe>
// snippet), a share button in the dock and on the finale card (each main.js
// calls openShare), and the embed mode.
//
// ?embed is how the tour runs inside someone else's page: the title bar is
// trimmed to the title and the version credit (the copyright notices stay),
// its "Bible Animations" link becomes "bibletours3d.org ↗", which opens the
// full tour in a new tab, and the dock's home button becomes a full-screen
// button. Importing this module is enough to set that up.

import { current, LANGS, t } from './i18n.js';
import { track } from './analytics.js';

export const EMBED = new URLSearchParams(location.search).has('embed');

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = new URL('share.css', import.meta.url).href;
document.head.append(css);

const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const SITE = 'https://bibletours3d.org';
const base = () => (location.hostname.endsWith('bibletours3d.org') ? SITE : location.origin);
const title = () => document.querySelector('.titlebar h1')?.textContent.trim() || document.title;

// The page's address to pass on: the canonical URL for this language (set by
// localizeDOM), plus the Bible version when it isn't the language's default.
function tourURL({ embed = false } = {}) {
  const q = [
    embed && 'embed',
    current.lang !== 'en' && `lang=${current.lang}`,
    current.version !== LANGS[current.lang].version && `version=${current.version}`,
  ].filter(Boolean);
  return base() + location.pathname + (q.length ? `?${q.join('&')}` : '');
}

function embedCode() {
  const page = tourURL(), name = title();
  return `<iframe src="${esc(tourURL({ embed: true }))}" title="${esc(name)} · ${esc(t('siteTitle'))}" width="800" height="500" `
    + `style="max-width:100%;border:0;border-radius:8px" allow="fullscreen; clipboard-write" allowfullscreen loading="lazy"></iframe>\n`
    + `<p><a href="${esc(page)}">${esc(name)}</a> · <a href="${SITE}/">${esc(t('siteTitle'))}</a></p>`;
}

async function copy(text, button) {
  try { await navigator.clipboard.writeText(text); } catch {
    const area = Object.assign(document.createElement('textarea'), { value: text });
    dialog.append(area);
    area.select();
    document.execCommand('copy');
    area.remove();
  }
  button.textContent = t('copied');
  setTimeout(() => { button.textContent = t('copy'); }, 1800);
}

// ---- the dialog, rebuilt on each opening so it follows the language and version

const dialog = document.createElement('dialog');
dialog.className = 'share-dialog';
// Keep the tour's keyboard shortcuts (Space, arrows, E, M) out of the dialog.
dialog.addEventListener('keydown', (e) => { if (e.key !== 'Escape') e.stopPropagation(); });
dialog.addEventListener('click', (e) => { if (e.target === dialog) dialog.close(); });
document.body.append(dialog);

export function openShare() {
  const url = tourURL(), name = title(), text = t('shareText', { title: name });
  const enc = encodeURIComponent;
  const links = [
    ['email', t('shareEmail'), `mailto:?subject=${enc(text)}&body=${enc(`${text}\n${url}`)}`],
    ['whatsapp', 'WhatsApp', `https://wa.me/?text=${enc(`${text} ${url}`)}`],
    ['facebook', 'Facebook', `https://www.facebook.com/sharer/sharer.php?u=${enc(url)}`],
    ['x', 'X', `https://x.com/intent/post?text=${enc(text)}&url=${enc(url)}`],
  ];
  dialog.innerHTML = `
    <button class="share-close" data-act="close" aria-label="${esc(t('close'))}" title="${esc(t('close'))}">×</button>
    <h2>${esc(t('share'))}</h2>
    <p class="share-name">${esc(name)}</p>
    <label class="share-field">
      <span>${esc(t('shareLink'))}</span>
      <span class="share-row">
        <input type="text" readonly value="${esc(url)}">
        <button class="primary" data-act="copy-link">${esc(t('copy'))}</button>
      </span>
    </label>
    <div class="share-links">
      ${navigator.share ? `<button data-act="native">${esc(t('shareMore'))}</button>` : ''}
      ${links.map(([k, label, href]) => `<a data-via="${k}" href="${esc(href)}" target="_blank" rel="noopener">${esc(label)}</a>`).join('')}
    </div>
    <label class="share-field">
      <span>${esc(t('embedCode'))}</span>
      <textarea readonly rows="4">${esc(embedCode())}</textarea>
    </label>
    <p class="share-hint">${esc(t('embedHint'))}</p>
    <div class="share-row end"><button data-act="copy-embed">${esc(t('copy'))}</button></div>`;

  const $ = (s) => dialog.querySelector(s);
  $('[data-act=close]').onclick = () => dialog.close();
  $('[data-act=copy-link]').onclick = (e) => { copy(url, e.currentTarget); track('share', { method: 'copy' }); };
  $('[data-act=copy-embed]').onclick = (e) => { copy($('textarea').value, e.currentTarget); track('share', { method: 'embed' }); };
  for (const field of dialog.querySelectorAll('input, textarea')) field.onfocus = () => field.select();
  for (const a of dialog.querySelectorAll('[data-via]')) a.onclick = () => track('share', { method: a.dataset.via });
  const native = $('[data-act=native]');
  if (native) native.onclick = () => navigator.share({ title: name, text, url })
    .then(() => track('share', { method: 'native' }), () => {});

  if (!dialog.open) dialog.showModal();
  $('[data-act=copy-link]').focus();
  track('share_open');
}

// ---- the dock: a share button after the home button (or, embedded, after the full-screen button)

const SHARE_ICON = '<svg viewBox="0 0 24 24"><path d="M18 16a3 3 0 0 0-2.4 1.2l-6.7-3.4a3 3 0 0 0 0-1.6l6.7-3.4A3 3 0 1 0 15 7l-6.7 3.4a3 3 0 1 0 0 3.2L15 17a3 3 0 1 0 3-1z"/></svg>';
const FULL_ICON = '<svg viewBox="0 0 24 24"><path d="M4 4h6v2H6v4H4zm10 0h6v6h-2V6h-4zM4 14h2v4h4v2H4zm14 0h2v6h-6v-2h4z"/></svg>';

function iconButton(id, icon, key) {
  const b = document.createElement('button');
  b.id = id;
  b.innerHTML = icon;
  b.dataset.i18nTitle = key;
  b.dataset.i18nAria = key;
  b.title = t(key);
  b.setAttribute('aria-label', t(key));
  return b;
}

const home = document.querySelector('.controls .home-btn');
let anchor = home;
if (EMBED && home) {
  if (document.fullscreenEnabled) {
    const full = iconButton('fullscreen', FULL_ICON, 'fullscreen');
    full.onclick = () => (document.fullscreenElement ? document.exitFullscreen() : document.documentElement.requestFullscreen());
    home.replaceWith(full);
    anchor = full;
  } else {
    anchor = null;
    home.remove();
  }
}
if (anchor) anchor.after(iconButton('share', SHARE_ICON, 'share'));
else document.querySelector('.controls')?.prepend(iconButton('share', SHARE_ICON, 'share'));
document.getElementById('share')?.addEventListener('click', openShare);

// ---- embed mode: a trimmed title bar whose link opens the full tour

if (EMBED) {
  document.body.classList.add('embed');
  const link = document.querySelector('.titlebar .home');
  if (link) {
    delete link.dataset.i18n;
    link.textContent = 'bibletours3d.org ↗';
    link.dataset.i18nTitle = 'embedOpen';
    link.target = '_blank';
    link.rel = 'noopener';
    const point = () => { link.href = tourURL(); };
    point();
    // The version can change in the tour; keep the link on it.
    document.getElementById('version')?.addEventListener('change', () => setTimeout(point));
  }
}
