// Google Analytics events from the tours, shared by every animation. The tag
// itself is in each page's <head> and only configured on bibletours3d.org, so
// local testing and video exports send nothing.
//
// Each event carries the animation's folder name as `tour`; `tour_stop` also
// carries the stop number (from 1) and `version_change` the Bible version.
// Embedded tours (?embed, see share.js) add `embed: 1` and the host of the page
// they are embedded in (`embed_host`, from the referrer) to every event.

const live = location.hostname.endsWith('bibletours3d.org');
const tour = location.pathname.split('/').filter(Boolean)[0] || 'home';
const embed = new URLSearchParams(location.search).has('embed')
  ? { embed: 1, embed_host: (() => { try { return new URL(document.referrer).hostname; } catch { return ''; } })() }
  : {};

export function track(name, params = {}) {
  if (live && window.gtag) window.gtag('event', name, { tour, ...embed, ...params });
}
