# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running

Static site, no build, no package.json, no tests or linter. Pages use ES modules, so serve over HTTP:

```sh
python3 -m http.server 8000   # then open http://localhost:8000/
```

three.js comes from jsDelivr via an import map in each animation's `index.html`, pinned to `0.170.0`. Keep `three` and `three/addons/` on the same version.

Video export (Nehemiah's Wall only): `video/export.py` (Python venv in `video/.venv`, see README) drives `nehemiahs-wall/?record` with Playwright. In record mode `main.js` skips `setAnimationLoop` and exposes `__record.script()` (narration text per cue), `__record.start(durations)` (holds stretch to fit) and `__record.step(dt)` (one frame; also steps CSS transitions; returns cue times). `?version=kjv` overrides the saved Bible version. Narration timing is `NARR_LEAD`/`NARR_TAIL`/`RECORD_END` in main.js's "recording" section; `holdFor` takes the max of reading time and `narrationSpan`. Keep `playwright` in `video/requirements.txt` matched to the installed browsers. Full runbook, options and troubleshooting: README "Video export". The Tabernacle has no record mode yet; porting it means the same `frame()`/`__record` split in its `main.js`.

Console debugging hooks (Nehemiah's Wall): `__tour.jump(i)` goes to stop `i`; `__tour.advance(sec)` steps the simulation without rendering; `__tour.applyStatic(s)` sets the build state to "everything up to wall distance `s` is built".

## Layout

- Root `index.html` is a landing page of cards. Each animation (`nehemiahs-wall/`, `dedication-of-the-wall/`, `tabernacle/`, `priestly-garments/`, `day-of-atonement/`, `holy-week/`, `solomons-temple/`, `ezekiels-temple/`) is a self-contained sibling folder with its own `index.html`; to add one, create the folder, add a card to the root page and a still to `images/` (the landing page crossfades them behind a parchment wash; each `.bg img` has its own `animation-delay`, so adjust the cycle when adding one). The one exception: `dedication-of-the-wall/` imports the city (data, translations, terrain) from `nehemiahs-wall/`.
- `README.md` documents each animation's content decisions (which gate features the text records, archaeology sources). Update it when changing what is modelled.
- `narrator.js` (root, shared by every animation) reads each stop's reference and verse aloud with the Web Speech API. `verseLine(ref, quote, book)` builds the spoken line (the reference in words from the `ref*` `UI` keys); `createNarrator(ui)` drives the dock's mute/volume/voice controls. `titleLine(title, subtitle)` builds the title line (subtitle parts split on `·`, references in words). Each `main.js` calls `narrator.say(titleLine(...))` in `begin()`, `narrator.sayNext()` in `arrive()` (it waits for the title to finish) and `narrator.say()` on the finale, `narrator.stop()` in `startFly()` and `finish()`, `narrator.update(dt)` at the top of `update()`, and holds a stop while `narrator.busy()`. Nehemiah's record mode disables it (`enabled: !RECORD`) and builds its video script with the same `verseLine`, opening with the `titleLine` over the intro card.
- Google Analytics: every page's `<head>` has the gtag snippet (`G-9447JFD9MX`), configured only on `bibletours3d.org`; a new page needs it too. `analytics.js` (root) exports `track(name, params)`, which each `main.js` calls for `tour_start` (`begin()`), `tour_stop` (`arrive()`), `tour_complete` (`finish()`), `explore` and `version_change`; it adds the folder name as `tour`.
- `i18n.js` (root, shared by the landing page and every animation) holds `LANGS`, every Bible version in `VERSIONS` (each with its `lang` and copyright notice), the interface strings `UI` per language with `t(key, vars)`, and `pick(v)` (the per-version text lookup). Static HTML text is tagged `data-i18n` / `data-i18n-title` / `data-i18n-aria` / `data-i18n-content` and filled by `localizeDOM()`. Never hard-code English UI text in `main.js`; add a `UI` key in every language.

## Languages

English, Spanish and French. Each version belongs to one language, so the version picks the language: `?version=` > `?lang=` > localStorage (`lang`, `bibleVersion.<lang>`) > `navigator.languages` > English. In an animation the Bible menu groups versions by language; the landing page has a language menu.

- Each animation's `data.js` is English. `lang/es.js` and `lang/fr.js` beside it have the same shape (text fields only; arrays such as `STOPS` line up by position) and is merged over it at load by `loadLanguages()` → `addLanguage()`. A merged field becomes `{ nasb, …, es, nbla, … }`, and `pick` tries the version, then the language, then English `default`. In a language file `default` means "that language's other versions".
- Code that reads text rather than displaying it (e.g. counting `builders`) must use `english(v)`, because merged fields are objects.
- Spanish versions: NBLA (default, Lockman, link www.NuevaBiblia.com), NVI, RVR1960, RVA (1909, public domain). Quote verbatim from the version named, in «…». RVA keeps its 1909 spelling.
- French versions: SG21 (default), BDS, NEG1979, LSG (1910, public domain): the four on Bible Gateway. Quote verbatim in « … » with non-breaking spaces (U+00A0) inside the guillemets and before `: ; ? !`; curly apostrophes. LSG writes “l’Éternel”, the others “l’Eternel”. French `TERMS` carry articles like the Spanish ones, plus `ofBronze` because “de” elides (d’airain in NEG1979/LSG).
- When changing an English text field, make the matching change in `lang/es.js` and `lang/fr.js`. Spanish nouns have gender: Tabernacle Spanish `TERMS` include article-bearing keys (`theBoards`, `theVeil`, `ofTheVeil`, `theTent`, …); write notes so no adjective has to agree with a term.

## Nehemiah's Wall architecture (`nehemiahs-wall/`)

Three modules, one-way dependencies: `data.js` ← `terrain.js` ← `main.js`.

- **`data.js`** holds all content (English) and no logic: the `WALL` polygon, `GATES`/`TOWERS`/`FEATURES`, `INTRO`/`FINALE` cards, and the `STOPS` tour.
- **`terrain.js`** exports `ground(x, n)`, a pure height function (smooth-min/max of hills, carved `VALLEYS`, noise, ×1.4 `RELIEF`). `PADS` flatten ground under named `FEATURES`, so terrain imports `data.js`.
- **`main.js`** is one long script divided by `// ---- section` banners (constants, materials, wall path, terrain, gates, wall blocks, landmarks, labels, tour, explore mode, UI, loop).

Key concepts that span files:

- **Coordinates:** plan space is `x` = metres east, `n` = metres north. Three.js world is `X = x`, `Y = height`, `Z = -n`. Everything in `data.js` is in plan space.
- **Wall arc length `s`:** `WALL` is a closed counter-clockwise loop in Nehemiah 3 order starting at the Sheep Gate. `main.js` builds `segs` with cumulative `s`; `wallAt(s)`, `tangentAt(s)`, and `camAt(s, off, h)` all work in `s`. Each `WALL` point's `id` is how stops, gates, and towers attach to the wall (`wallById[id].s`). `THICK_SEGMENTS` is keyed by the segment's starting point id.
- **Build animation:** every wall block and rubble piece is an instance in an `InstancedMesh`, sorted by `s`. Ruin courses are always present. A build frontier moves along `s` while flying between stops (`buildA`→`buildB`); `updateBuild` raises blocks within `RAMP` metres behind it, lagging by course. Gates and other non-static `structures` expose `setProgress(p)` and rise the same way. `applyStatic(sDone)` snaps the whole state for jumps.
- **Text-driven gates:** boolean fields on each `GATES` entry (`beams`, `doors`, `bolts`, `bars`, `covered`, `consecrated`, ...) decide what `makeGate` builds, and the popup greys out unrecorded parts. Don't model anything the text doesn't mention.
- **Tour stops:** each `STOPS` entry anchors to a `wall` id. The look target comes from `target`, `gate`, `towers`, or the wall point, in that order. `view: { side: 'in'|'out', dist, h, along }` places the camera relative to the wall (defaults in `main.js`). Hold time scales with word count of `quote` + `note`. `closing: true` maps to `s = WALL_LEN`.
- **Tour state machine:** `tour.phase` is `intro` → `fly` → `hold` → ... → `finale`, plus an `explore` flag that hands the camera to `OrbitControls`. `update(dt)` drives it; the render loop also applies a view offset so the popup doesn't cover the subject.
- **Bible versions:** English NASB 2020 (default), NIV, ESV, KJV (the user wants at most four per language). Any text field (`name`, `title`, `quote`, `note`, `aside`, `builders`, `repair`, `PARTS` entries, card `ref`) is a string or `{ nasb, niv, esv, kjv, default }`. `main.js` resolves them with `tr(v)` (= `pick` from `i18n.js`) at render time; `setVersion` re-renders the static DOM text, labels, popup, card and progress titles. Quote Scripture verbatim from the version named (NASB/NIV/ESV and NBLA/NVI/RVR1960 are copyrighted: keep quotes short and keep their notices in `VERSIONS`; NASB and NBLA also require their links).
- **Labels** are `CSS2DObject`s keyed `gate:<id>`, `tower:<id>`, `feature:<id>`. A stop's `activeKeys` highlights them.

## The Tabernacle architecture (`tabernacle/`)

Same three-module layout (`data.js` ← `terrain.js` ← `main.js`, though here `terrain.js` doesn't import `data.js`) and the same tour engine, UI, version switching and explore mode as Nehemiah's Wall. Differences:

- **Units:** one world unit is one cubit (~45 cm), so sizes from the text go in directly. Plan space is still `x` east, `n` north, with the origin at the centre of the court; the tent runs from `TENT.west` (-30) to `TENT.east` (0) and faces east.
- **Build groups instead of wall arc length:** every part is registered with `piece(groupKey, object, mode)` (`drop`, `lower` or `grow`). `setGroup(key, p)` raises a group's pieces in sequence. Each stop's `build` array names the groups that go up, one after another, while flying in. `applyStatic(i)` means "stops before `i` are built". A group with no pieces never gets progress, so effects keyed to a group (e.g. smoke) must register a piece.
- **Camera:** each stop gives explicit `look` and `cam` positions (`{ x, n, y }`), not wall-relative views.
- **Cutaway:** stops with `cutaway: true` fade `COVER_MATS` (the coverings and clasps) and `MAT.goldSouth` (the south boards and bars), and turn off their shadows.
- **Terms:** text fields may contain `{term}` / `{Term}` placeholders resolved by `tr()` from `TERMS` (e.g. `{boards}` → frames in NIV/ESV). Titles and labels with more than one word to capitalise use explicit per-version objects instead.
- **Materials chips:** each stop's `materials` lists keys of `MATERIALS`; the others are greyed out. The same rule applies: don't model what Exodus doesn't describe, and say so in the note when a size or position is a guess.
- **Finale:** `tour.gloryT` drives the cloud and the glory (`GLORY_T`): the puffs come down from a column to their place over the tent, the glory's sprites follow `gloryCurve` in over the ark and `fill` sprites light the tent (one with `depthTest` off so it shows through); `finaleLook()` tilts the camera up at the column at first. `tour.glory` fades it all in and out.
- Console: `__tour.jump(i)`, `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.glory(sec)` (the finale, `sec` seconds in), `__tour.groups`.

## The Priestly Garments architecture (`priestly-garments/`)

A copy of the Tabernacle's engine (build groups, explicit `look`/`cam` per stop, `{term}` placeholders, materials chips), on the same coordinates: the doorway is at x = 0 and the tent, court, basin and altar are a fixed backdrop. Stops follow Leviticus 8:6-9; each `build` names the garment groups that go on during the flight in (they start at 0.3 of the flight, once the camera is close). Differences:

- **Figures** (`figure()` in main.js) face local +X with +Z on their right. Bodies and garments are lathes inside a `squashed()` group (scaled by `DEPTH` front to back); anything that must hug them, like the sash ends, has to sit inside that oval, not the round profile. Arms come from `limbs(parent, pose, fn)`; a garment that goes on builds its own sleeves with the same pose, while Moses' sleeves sit on his own arms (`onArms`) because his arms move (`tour.reach`). The head sits in `fig.head` (figure coordinates) inside `fig.neck`, which `heads()` turns each frame to look at the water or at Aaron, and anything worn on the head (turban, plate, caps, Moses' head cloth) must be added to `fig.head` so it turns too. Arms swing against the legs while walking (`fig.step`), and everyone blinks (`fig.eyes`).
- **Washing:** `washPlace(key, t)` says where each person stands `t` seconds into the washing: the man being washed at `WASH_AT` facing Moses at `POURER`, the rest in `QUEUE` slots or `WASHED` slots, moving up at the start of each `TURN`. `washing()` runs Moses' cycle from keyframe tables (`keyed()`): turn to the basin, fill the jug, step up, pour on the hands, then the feet; `reachArm()` is a two-joint arm solver that puts hands on targets. Getting there and back follows build groups: `atBasin()` = `wash` × (1 − `walk`); stop 0 builds `wash`, stop 1 builds `walk` then `tunic`, so `applyStatic` jumps work. `tour.washT` resets only while walking in and freezes on the walk back, so people leave from wherever they were. Legs pivot at the hip and swing while walking. Person labels follow their figure.
- **Build modes:** `lower` (a garment coming down over the head) and `wrap` (sash and band winding in) are added to `drop` and `grow`.
- **Text on surfaces:** the onyx and breastpiece stones show a cylinder's cap, whose UVs turn the canvas round, so `onyxTexture`/`stoneTexture` draw upside down. The plate uses an open cylinder's side and draws upright. Hebrew comes from `NAMES_HE` and `HOLY_HE` in data.js.
- **Finale:** `finish()` gives the overview flight `build: ['sons']`, so the sons are dressed (8:13) as the camera draws back; `applyStatic` keeps the `sons` group at 0 until then.
- `PARTS` labels show only while their stop is current (or close by in explore); `PEOPLE` labels show in wide shots. A stop's `stones: true` adds the stone list to the popup.
- Console: `__tour.jump(i)`, `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.groups`.

## The Day of Atonement architecture (`day-of-atonement/`)

The Priestly Garments engine (figures, garments, build groups, explicit `look`/`cam`, `{term}` placeholders) with the Tabernacle's furniture inside the tent and its camp round the court, on the same coordinates. Stops follow Leviticus 16. Differences:

- **Walks:** `actor(key, obj, at, face)` gives someone a start; `walk(key, group, points, face)` adds a smooth path from where their last walk ended, as a build group (`g.walk`, `g.actors`). `locate()` puts each actor on the last walk with progress > 0, so `applyStatic` jumps work. Walks must be declared in tour order. The man leading the goat is special (`leading()`): both follow `LEAD_PTS`, a rope's length apart, and keep walking during the hold (`tour.leadExtra`).
- **Flight length:** each build group has a weight (walks: length / `WALK_UNIT`; others: `WEIGHT`), its share of the flight; the flight lasts long enough for all of them. Walks start at once, other steps at 0.3 of the flight.
- **Follow camera:** `walker()` finds who is walking from the flight's first walk to its last, and `update()` blends the view towards them by `tour.follow`, offset by the stop's `follow` (`false` turns it off). While it follows someone inside the tent, the tent is cut away too.
- **The rite:** `rite()` works out every frame, from group progress alone, what Aaron holds and does: the jug (`bathe`), the lots, the firepan and incense (`coals`, `cloud`), the bowl of blood, the sprinkling (`SPRINKLES`: a flick per spot), the horns, his hands on the goat; also the man's rope. Garments that come off are wrapped by `removable()` and taken off with mode `off`. Tunic sleeves sit on the moving arms and show only while the tunic is on (`syncSleeves`).
- **Animals:** `beast(kind)` builds a bull, ram or goat facing +X; `poseBeast` swings the legs by distance walked and folds them for `down` (how the slaughter is shown; nothing more graphic).
- **Labels** come from `LABELS` in data.js: `actor` follows a figure or animal, `after` changes the text once a group is done (the goats after the lots), `inside` hides it unless the tent is cut away.
- **Popup:** each stop's `atone` keys (of `ATONE`, after 16:33) become chips, shown only when the list isn't empty; `where` and `wearing` (a key of `WEARING`) are facts.
- Console: `__tour.jump(i)`, `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.setGroup(key, p)`, `__tour.groups`, `__tour.actors`.

## The Dedication of the Wall architecture (`dedication-of-the-wall/`)

Nehemiah's Wall's city and tour engine, with the wall finished and no build animation. `main.js` imports `WALL`, `GATES`, `TOWERS`, `FEATURES` and `ground()` from `../nehemiahs-wall/` and calls `loadLanguages` on both data modules, so the city's names come from `nehemiahs-wall/lang/`. Its own `data.js` adds the Gate of Ephraim (placed on the wall by `at`), the Gate of the Guard (`court: true`, built into the temple court's north wall), `INSTRUMENTS`, `PEOPLE` and `STOPS`. Stops follow Nehemiah 12:27–43.

- **Walkway:** `rawTop` is the top of the wall's courses per metre of `s`; `walkTop` raises it over gates and towers (`tops`) with ramps no steeper than `RAMP_SLOPE`, and step blocks fill under the ramps. `wallTop(s)` is where people walk. Stairs (`makeStair`) run up the inside face of the wall.
- **Routes:** a `Route` is a 3D polyline in metres (`stair()`, `wall(from, to, ids)`, `ground(points)`, `mark(name)`); `marks` give distances along it, by name or by `WALL` id. Each choir has one route, from the stairs by the Valley Gate to the temple court. `gather`, `formed` and `court` marks are worked out from the procession so that everyone is in their slot.
- **Processions:** each walker has a `row` (two abreast, `GAP` apart), a `slot` in the gathering place and an `end` in the court. Where they are depends only on the state: `place(f, state)`; before the route they blend from their slot, after it to their end. Levites and singers (`arrive`) first walk in along `STREAMS` while `gather` < 1.
- **Tour state:** `{ lead: { 1, 2 }, gather, purify, smoke }`. Each stop's `lead1`/`lead2` (a mark name) and `effect` set its state on arrival (`st.state`, carried forward); flights interpolate from `st.before` (`mixState`). Stops either follow a choir (`view: { follow, side, dist, h, along }`, wall-relative to the head of the choir) or give fixed `cam`/`look` points; consecutive stops following the same choir fly along the wall.
- Console: `__tour.jump(i)`, `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.world`, `__tour.choirs`, `__tour.routes`.

## Holy Week in Jerusalem architecture (`holy-week/`)

The Day of Atonement's engine (figures, build groups, walks, explicit `look`/`cam`, follow camera, `{term}` placeholders) at city scale, with its own Herodian city and terrain (nothing is imported from `nehemiahs-wall/`). Stops follow Mark 11–16. Differences:

- **Units and coordinates:** metres, plan `x` east, `n` north, origin at the sanctuary; heights are metres above 600 m, the temple court at `PLATFORM.y` = 140. `terrain.js` imports `PLATFORM` from data.js and keeps the ground under the court; `addPad()` levels ground under buildings and must run before the terrain mesh is built. People are built in cubits like the other animations and scaled by `FIG` (0.5).
- **Floors:** `floorAt(x, n)` is where people stand: the court, the terrace and inner court levels, the steps up to the east gate, the upper room and its outside stair, Golgotha's rock, else `ground()`. Stop `look`/`cam` `y` values are metres above `floorAt` there.
- **Figures:** `figure(o)` returns `{ R, G, … }`: `R` stands and turns (labels follow it), `G` inside it takes the pose; the garment's `skirt` hangs from the hips and folds when sitting. `soldier()` adds helmet, cloak and spear. `donkey()` is the colt.
- **Timeline per actor:** `walk(key, group, pts, { face, t0, t1, jump })`, `pose(key, group, { sit, seat, lie: 'front'|'side', recline, ride, cross })`, all declared in tour order. `locate()` takes the last entry with progress: a jump puts them there at once (between days), a pose holds until their next walk and blends out at its start. `together(group, lead, members, pts, { form })` walks companions a little behind in their own lanes into a formation (`follow`, `around`, `behind`, `ring`, or `[f, r, faceLeader]` rows). `diners()`/`reclineAt()` seat people at a low table. Riding puts the rider on the colt; `cross` places them at a fixed point.
- **Visibility:** `SHOW[key] = [fromGroup, untilGroup]` for people, `shown(obj, from, until)` for objects (pieces combine with it); someone jumped to `P(0, -2000)` is hidden.
- **Time of day:** each stop has `day` (0–7) and `hour`; `tour.T` (hours) runs through the flight and `setTime(hour, dark)` moves the sun or the full moon and colours the sky dome, fog and light. `darkness()` is the 'dark' group until 'takenDown'. A few point lights go to the nearest lamps, fire and torches. The shadow camera follows the view (`placeLight`).
- **Crowds:** `crowd(from, until, places, { escort, wave, torch })`, instanced; `escort` places are `{ along, side }` metres from an actor.
- **Cutaway:** stops with `cutaway: true` fade `CUT_MATS` (the upper room's and Simon's house's roof and a wall, the tomb's roof and south wall).
- Popup: `when` and `where`; the progress dots leave a gap between days. Console: `__tour.jump(i)`, `__tour.show(i)` (jump and arrive at once), `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.setGroup(key, p)`, `__tour.groups`, `__tour.actors`.

## Solomon's Temple architecture (`solomons-temple/`)

The Tabernacle's engine (build groups, explicit `look`/`cam` per stop, `{term}` placeholders, materials chips, `size`/`made` facts) in cubits, on Holy Week's Jerusalem terrain converted to cubits (`terrain.js` copies its topography; nothing is imported). Stops follow 1 Kings 6–7 with 2 Chronicles 3–4. Differences:

- **Coordinates:** plan origin at the inside face of the main room's front wall (`HOUSE.east` = 0), the house facing east; `HOUSE`, `PORCH`, `COURT`, `GREAT` and `PLACES` are in data.js. The house floor is y = 0; the inner court is at `COURT_Y` (-0.6, from terrain.js) so the foundation shows.
- **Stone walls:** `layRuns(key, runs)` lays wall runs course by course (`COURSE` = 1.5) as the pieces of one group, splitting at openings and where the wall thickness changes (`thick(y)` steps in at `STEPS` for the side chambers). `worldBox()` makes boxes in world coordinates with UVs that follow the world, and `worldMesh()` re-centres them so they can be animated.
- **Gilding:** `gilded(mat, key)` clones a material that turns to gold as group `key` goes up (`updateGilding`); textures that get gilded (cedar, cypress) are drawn pale and take their colour from the material. Groups with no pieces of their own (`gold`, `goldFloor`, `cherubGold`) need a `marker()`.
- **Cutaways:** `cutMat(mat, sets)` registers a material that fades for stops whose `cutaway` is one of its sets (`'house'`: the south walls, south chambers, roofs, ceilings, the stair; `'chambers'`: only the chambers' south wall). `tour.cut` holds one amount per set. Labels with `inside` show only when cut away (`true` = the house).
- **People** are static figures (`person()`), shown between groups with `shown(obj, from, until)`.
- Console: `__tour.jump(i)`, `__tour.show(i)` (jump and arrive at once), `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.setGroup(key, p)`, `__tour.groups`.

## Ezekiel's Temple architecture (`ezekiels-temple/`)

Solomon's Temple's engine (build groups, explicit `look`/`cam` per stop, `{term}` placeholders, a cutaway) in long cubits (40:5), on a stylised mountain (`terrain.js`, nothing imported). Stops follow Ezekiel 40–42; the finale is 43:1–5. Differences:

- **Coordinates and levels:** plan origin at the altar in the middle of the inner court, the house facing east. `LEVEL` in data.js: the ground outside the wall, the outer court (y = 0), the inner court, the house's platform. `OUTER` is half the 500-cubit square; `INNER` is the inner court's terrace, which also carries the house and the building to the west. House sizes are `H` in main.js.
- **Walls:** `lay(key, walls, { merge })` lays boxes `{ x0, x1, n0, n1, y0, y1, mat, open }` course by course; openings cut along the longer side. `merge` makes one piece per course for all the walls (the gates); without it each wall's course is a piece.
- **Gates:** `makeGate(key, { at, dir, y, steps, base })` builds one of the six identical gates in local `u` (along its axis, 0 = outer threshold, 50 = porch end) and `w`; outer gates have 7 steps before `u = 0`, inner gates 8 beyond the porch. `GATES` keeps them for `floorAt`.
- **People:** the man (bronze, with the line and the rod) and Ezekiel, from `figure()`. Each stop gives `man`/`ezekiel` `[x, n, facing°]` and shared `via` points; during the flight in they walk `pathTo(i)` (from the previous stop) and `floorAt(x, n)` gives the height (gates, steps, platform, courts, ground). `measure: false` keeps the rod upright; otherwise the man holds it out (`tour.measure`). Their labels (`PEOPLE`) show at the first stop and close by.
- **Cutaway:** stops with `cutaway: true` fade the `cutMat` materials (the house's and porch's south walls, the south side chambers and their floors, the roof, the south lining); `tour.cut` is one number.
- **Measuring lines:** `measureLine(key, corners)` lays an instanced strip on `floorAt`, its count following group `key`: `courtLine` and `houseLine` (the squares of 40:47 and 41:13–14) and `line` (the wall, 42:15–20). A stop's `trace` names a line that goes round during the hold (`TRACE` seconds, `tour.traceT`, even while paused); `holdFor` waits for it.
- **Finale:** `place()` walks the two to `GLORY.gate`, then `tour.gloryT` drives the glory (`GLORY_T`): sprites and a point light along `GLORY_PATH` from the east, in by the east gate, then filling the house; Ezekiel falls on his face and is lifted to `GLORY.inner`. The finale camera waits for it before circling.
- Console: `__tour.jump(i)`, `__tour.show(i)`, `__tour.glory(sec)` (the finale, `sec` seconds in), `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.setGroup(key, p)`, `__tour.floorAt(x, n)`, `__tour.groups`.
