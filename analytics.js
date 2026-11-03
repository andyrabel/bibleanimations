// Google Analytics events from the tours, shared by every animation. The tag
// itself is in each page's <head> and only configured on bibletours3d.org, so
// local testing and video exports send nothing.
//
// Each event carries the animation's folder name as `tour`; `tour_stop` also
// carries the stop number (from 1) and `version_change` the Bible version.

const live = location.hostname.endsWith('bibletours3d.org');
const tour = location.pathname.split('/').filter(Boolean)[0] || 'home';

export function track(name, params = {}) {
  if (live && window.gtag) window.gtag('event', name, { tour, ...params });
}
