// The stop popup's minimise button, shared by every animation: on a phone the
// popup covers much of the picture, so it can be folded down to its title (the
// button in its corner, a tap on the folded popup, or H). The choice is
// remembered. popupLift() tells the tour how far to lift the picture on a
// phone so that what it looks at stays above the popup.

import { t } from './i18n.js';

const css = document.createElement('link');
css.rel = 'stylesheet';
css.href = new URL('popup.css', import.meta.url).href;
document.head.append(css);

const popup = document.getElementById('popup');
let folded = false;
try { folded = localStorage.getItem('popup.folded') === '1'; } catch {}

const button = document.createElement('button');
button.type = 'button';
button.className = 'popup-fold';
button.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 9l6 6 6-6"/></svg>';

function setFolded(on) {
  folded = on;
  try { localStorage.setItem('popup.folded', on ? '1' : '0'); } catch {}
  label();
}
function label() {
  document.body.classList.toggle('popup-folded', folded);
  const text = t(folded ? 'showText' : 'hideText');
  button.title = text;
  button.setAttribute('aria-label', text);
  button.setAttribute('aria-expanded', String(!folded));
}

if (popup) {
  // Each stop rebuilds the popup's contents, so put the button back each time.
  new MutationObserver(() => {
    if (button.parentNode !== popup) popup.prepend(button);
    label();
  }).observe(popup, { childList: true });
  button.onclick = (e) => { e.stopPropagation(); setFolded(!folded); };
  popup.addEventListener('click', (e) => { if (folded && !e.target.closest('a, button')) setFolded(false); });
  addEventListener('keydown', (e) => {
    if (e.target.closest?.('select, input, textarea, dialog') || e.ctrlKey || e.metaKey || e.altKey) return;
    if (e.key === 'h' || e.key === 'H') setFolded(!folded);
  });
  label();
}

// How far (a fraction of the screen's height) to lift the picture on a phone
// while a stop's popup may be showing.
export function popupLift() {
  if (innerWidth > 640) return 0;
  return folded ? 0.06 : 0.3;
}
