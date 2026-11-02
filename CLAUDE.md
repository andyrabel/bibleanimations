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

- Root `index.html` is a landing page of cards. Each animation is a self-contained sibling folder with its own `index.html`; to add one, create the folder and add a card to the root page.
- `README.md` documents each animation's content decisions (which gate features the text records, archaeology sources). Update it when changing what is modelled.
- `i18n.js` (root, shared by the landing page and both animations) holds `LANGS`, every Bible version in `VERSIONS` (each with its `lang` and copyright notice), the interface strings `UI` per language with `t(key, vars)`, and `pick(v)` (the per-version text lookup). Static HTML text is tagged `data-i18n` / `data-i18n-title` / `data-i18n-aria` / `data-i18n-content` and filled by `localizeDOM()`. Never hard-code English UI text in `main.js`; add a `UI` key in every language.

## Languages

English and Spanish. Each version belongs to one language, so the version picks the language: `?version=` > `?lang=` > localStorage (`lang`, `bibleVersion.<lang>`) > `navigator.languages` > English. In an animation the Bible menu groups versions by language; the landing page has a language menu.

- Each animation's `data.js` is English. `lang/es.js` beside it has the same shape (text fields only; arrays such as `STOPS` line up by position) and is merged over it at load by `loadLanguages()` → `addLanguage()`. A merged field becomes `{ nasb, …, es, nbla, … }`, and `pick` tries the version, then the language, then English `default`. In a language file `default` means "that language's other versions".
- Code that reads text rather than displaying it (e.g. counting `builders`) must use `english(v)`, because merged fields are objects.
- Spanish versions: NBLA (default, Lockman, link www.NuevaBiblia.com), NVI, RVR1960, RVA (1909, public domain). Quote verbatim from the version named, in «…». RVA keeps its 1909 spelling.
- When changing an English text field, make the matching change in `lang/es.js`. Spanish nouns have gender: Tabernacle Spanish `TERMS` include article-bearing keys (`theBoards`, `theVeil`, `ofTheVeil`, `theTent`, …); write notes so no adjective has to agree with a term.

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
- Console: `__tour.jump(i)`, `__tour.advance(sec)`, `__tour.applyStatic(i)`, `__tour.groups`.
