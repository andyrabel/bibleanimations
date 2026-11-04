// Paul's Voyage to Rome: this voyage's data, run by the shared engine.
import * as DATA from './data.js';
import { LEGS } from './route.js';
import { start } from '../pauls-first-journey/journey.js';

await start({ DATA, LEGS, base: import.meta.url, key: 'voyage' });
