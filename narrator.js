// Reads each stop's reference and verse aloud with the browser's own speech
// synthesis (the Web Speech API), shared by every animation.
//
// The tour calls say() on arriving at a stop and stop() on leaving it, and
// waits while busy() so a stop's hold lasts at least as long as its reading.
// Voices come from the browser and the system, so the list differs between
// browsers; Edge has the same Microsoft neural voices the video export uses.

import { current, t } from './i18n.js';

const LEAD = 0.6;   // seconds between arriving and the voice starting
const TAIL = 1.2;   // seconds after the voice ends before the tour moves on
const RATE = 0.9;   // the video export reads at -10%

// The default voice: UK English male, US Spanish, French from France. Browsers
// don't say which voices are male, so those are known by name (Edge, Chrome,
// Windows, macOS).
const PREFERRED = {
  en: { region: 'en-gb', name: /Ryan|Thomas|\bMale\b|George|Daniel|Arthur|Oliver/ },
  es: { region: 'es-us' },
  fr: { region: 'fr-fr' },
};

// "Nehemiah 6:15–16" or "3:1" (with book "Nehemiah") -> "Nehemiah, chapter 6, verses 15 to 16."
export function spokenRef(ref, book = '') {
  const m = ref.match(/^(.*?)\s*(\d+)(?:[–-](\d+))?(?::(\d+)(?:[–-](\d+))?)?$/);
  if (!m) return `${ref}.`;
  const [, own, ch, ch2, v, v2] = m;
  const b = own || book;
  if (!v) return ch2 ? t('refChapters', { book: b, a: ch, b: ch2 }) : t('refChapter', { book: b, ch });
  return v2 ? t('refVerses', { book: b, ch, a: v, b: v2 }) : t('refVerse', { book: b, ch, v });
}

// The on-screen quote without its quotation marks, with ellipses turned into pauses.
export function spokenQuote(q) {
  return q.replace(/[“”«»]/g, '').trim().replace(/^…\s*|\s*…$/g, '').replace(/\s*…\s*/g, ', ').trim().replace(/^./, (c) => c.toUpperCase());
}

// The reference, then the verse. A quote ending in its own reference, e.g. "… fire.” (1:3)", is read with that one.
export function verseLine(ref, quote, book) {
  const m = quote.match(/\s*\((\d+:\d+[–\d]*)\)$/);
  return `${spokenRef(m ? m[1] : ref, book)} ${spokenQuote(m ? quote.slice(0, m.index) : quote)}`;
}

function load(key) { try { return localStorage.getItem(key); } catch { return null; } }
function store(key, value) { try { localStorage.setItem(key, value); } catch {} }

function rank(v) {
  const want = PREFERRED[current.lang] ?? {};
  return (v.lang.toLowerCase().replace('_', '-') === want.region ? 10 : 0) + (want.name?.test(v.name) ? 5 : 0)
    + (/Natural|Neural|Online/.test(v.name) ? 2 : 0) + (v.localService ? 0 : 1);
}
// "Microsoft Ryan Online (Natural) - English (United Kingdom)" -> "Ryan (GB)"
function voiceLabel(v) {
  const name = v.name.replace(/^(Microsoft|Google)\s+/, '').replace(/\s+-\s+.*$/, '').replace(/\s*Online\s*/, ' ').replace(/\s*\(.*\)\s*$/, '').trim();
  const region = v.lang.split(/[-_]/)[1]?.toUpperCase();
  return region ? `${name} (${region})` : name;
}

// ui: { box, mute, volume, voice } elements in the dock. With enabled false
// (e.g. while recording a video) it stays silent and never holds the tour.
export function createNarrator(ui, { enabled = true } = {}) {
  const synth = enabled ? window.speechSynthesis : null;
  const state = {
    muted: load('narration.muted') === '1',
    volume: Number(load('narration.volume') ?? 1),
  };
  let voices = [];
  let pending = null, lead = 0, tail = 0, last = null;
  let utter = null, spoken = 0, paused = false;

  if (!synth) { ui.box.hidden = true; }

  function voice() {
    const saved = load(`narration.voice.${current.lang}`);
    return voices.find((v) => v.voiceURI === saved) ?? voices[0] ?? null;
  }

  // The voice menu lists the voices for the current language, best first.
  function refresh() {
    if (!synth) return;
    voices = synth.getVoices()
      .filter((v) => v.lang.toLowerCase().split(/[-_]/)[0] === current.lang)
      .sort((a, b) => rank(b) - rank(a) || a.name.localeCompare(b.name));
    ui.voice.replaceChildren(...voices.map((v) => new Option(voiceLabel(v), v.voiceURI)));
    if (!voices.length) ui.voice.append(new Option(t('noVoice'), ''));
    ui.voice.disabled = !voices.length;
    ui.voice.value = voice()?.voiceURI ?? '';
    ui.voice.title = voice()?.name ?? t('noVoice');
    ui.mute.classList.toggle('muted', state.muted);
    ui.mute.setAttribute('aria-pressed', state.muted);
    ui.mute.title = t(state.muted ? 'unmuteTitle' : 'muteTitle');
    ui.mute.setAttribute('aria-label', t(state.muted ? 'unmute' : 'mute'));
    ui.volume.value = String(state.volume);
    ui.volume.title = t('volume');
    ui.volume.setAttribute('aria-label', t('volume'));
  }

  function speak(text) {
    pending = null;
    if (!synth || state.muted || !text) return;
    if (!voices.length) refresh();
    // With no voice for the language, stay silent rather than hold the tour.
    if (!voices.length) return;
    const u = new SpeechSynthesisUtterance(text);
    const v = voice();
    if (v) u.voice = v;
    u.lang = v?.lang ?? current.lang;
    u.rate = RATE;
    u.volume = state.volume;
    u.onend = u.onerror = () => {
      if (utter !== u) return;
      utter = null;
      tail = TAIL;
    };
    synth.cancel();
    synth.resume();
    utter = u;
    spoken = 0;
    synth.speak(u);
  }

  function stop() {
    pending = null;
    last = null;
    tail = 0;
    if (utter) {
      utter = null;
      synth.cancel();
      synth.resume();
    }
  }

  function say(text) {
    stop();
    if (!synth) return;
    last = pending = text;
    lead = LEAD;
  }

  // Counts down the lead-in and the pause after, while the tour is playing.
  function update(dt) {
    if (paused || !synth) return;
    if (pending != null) {
      if ((lead -= dt) <= 0) speak(pending);
    } else if (utter) {
      // Some browsers never fire onend; give up well after the text should have finished.
      if ((spoken += dt) > 15 + utter.text.length * 0.12) { utter = null; tail = TAIL; }
    } else if (tail > 0) tail -= dt;
  }

  function setPaused(on) {
    paused = on;
    if (!utter) return;
    if (on) synth.pause();
    else synth.resume();
  }

  function busy() {
    return !!synth && !state.muted && (pending != null || !!utter || tail > 0);
  }

  // Starts the current line again, e.g. to hear a newly chosen voice.
  function replay() {
    if (last == null) return;
    const text = last;
    stop();
    last = text;
    speak(text);
  }

  function setMuted(on) {
    state.muted = on;
    store('narration.muted', on ? '1' : '0');
    if (on) {
      const keep = last;
      stop();
      last = keep;
    } else replay();
    refresh();
  }

  if (synth) {
    synth.addEventListener?.('voiceschanged', refresh);
    ui.mute.onclick = () => setMuted(!state.muted);
    ui.volume.oninput = () => {
      state.volume = Number(ui.volume.value);
      store('narration.volume', String(state.volume));
    };
    // A new volume only takes effect from the next line, so read this one again at the new level.
    ui.volume.onchange = () => { if (utter) replay(); };
    ui.voice.onchange = () => {
      store(`narration.voice.${current.lang}`, ui.voice.value);
      refresh();
      replay();
    };
    // Some browsers (Safari on iOS) only speak after speech has started inside a tap or key press.
    const unlock = () => {
      if (!utter) synth.speak(Object.assign(new SpeechSynthesisUtterance(''), { volume: 0 }));
      removeEventListener('pointerdown', unlock, true);
      removeEventListener('keydown', unlock, true);
    };
    addEventListener('pointerdown', unlock, true);
    addEventListener('keydown', unlock, true);
    addEventListener('pagehide', () => synth.cancel());
  }
  refresh();

  return { say, stop, update, setPaused, busy, refresh, toggleMute: () => setMuted(!state.muted) };
}
