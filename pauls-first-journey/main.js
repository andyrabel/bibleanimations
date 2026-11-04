// Paul's First Missionary Journey: this journey's data, run by the shared engine.
import * as DATA from './data.js';
import { LEGS } from './route.js';
import { start } from './journey.js';

await start({ DATA, LEGS, base: import.meta.url, key: 'journey' });
