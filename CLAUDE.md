# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Running

Static site, no build, no package.json, no tests or linter. Pages use ES modules, so serve over HTTP:

```sh
python3 -m http.server 8000   # then open http://localhost:8000/
```

three.js comes from jsDelivr via an import map in each animation's `index.html`, pinned to `0.170.0`. Keep `three` and `three/addons/` on the same version.

Console debugging hooks (Nehemiah's Wall): `__tour.jump(i)` goes to stop `i`; `__tour.advance(sec)` steps the simulation without rendering; `__tour.applyStatic(s)` sets the build state to "everything up to wall distance `s` is built".

## Layout

- Root `index.html` is a landing page of cards. Each animation is a self-contained sibling folder with its own `index.html`; to add one, create the folder and add a card to the root page.
- `README.md` documents each animation's content decisions (which gate features the text records, archaeology sources). Update it when changing what is modelled.

## Nehemiah's Wall architecture (`nehemiahs-wall/`)

Three modules, one-way dependencies: `data.js` ← `terrain.js` ← `main.js`.

- **`data.js`** holds all content and no logic: the `VERSIONS` list (with copyright notices), the `WALL` polygon, `GATES`/`TOWERS`/`FEATURES`, `INTRO`/`FINALE` cards, and the `STOPS` tour.
- **`terrain.js`** exports `ground(x, n)`, a pure height function (smooth-min/max of hills, carved `VALLEYS`, noise, ×1.4 `RELIEF`). `PADS` flatten ground under named `FEATURES`, so terrain imports `data.js`.
- **`main.js`** is one long script divided by `// ---- section` banners (constants, materials, wall path, terrain, gates, wall blocks, landmarks, labels, tour, explore mode, UI, loop).

Key concepts that span files:

- **Coordinates:** plan space is `x` = metres east, `n` = metres north. Three.js world is `X = x`, `Y = height`, `Z = -n`. Everything in `data.js` is in plan space.
- **Wall arc length `s`:** `WALL` is a closed counter-clockwise loop in Nehemiah 3 order starting at the Sheep Gate. `main.js` builds `segs` with cumulative `s`; `wallAt(s)`, `tangentAt(s)`, and `camAt(s, off, h)` all work in `s`. Each `WALL` point's `id` is how stops, gates, and towers attach to the wall (`wallById[id].s`). `THICK_SEGMENTS` is keyed by the segment's starting point id.
- **Build animation:** every wall block and rubble piece is an instance in an `InstancedMesh`, sorted by `s`. Ruin courses are always present. A build frontier moves along `s` while flying between stops (`buildA`→`buildB`); `updateBuild` raises blocks within `RAMP` metres behind it, lagging by course. Gates and other non-static `structures` expose `setProgress(p)` and rise the same way. `applyStatic(sDone)` snaps the whole state for jumps.
- **Text-driven gates:** boolean fields on each `GATES` entry (`beams`, `doors`, `bolts`, `bars`, `covered`, `consecrated`, ...) decide what `makeGate` builds, and the popup greys out unrecorded parts. Don't model anything the text doesn't mention.
- **Tour stops:** each `STOPS` entry anchors to a `wall` id. The look target comes from `target`, `gate`, `towers`, or the wall point, in that order. `view: { side: 'in'|'out', dist, h, along }` places the camera relative to the wall (defaults in `main.js`). Hold time scales with word count of `quote` + `note`. `closing: true` maps to `s = WALL_LEN`.
- **Tour state machine:** `tour.phase` is `intro` → `fly` → `hold` → ... → `finale`, plus an `explore` flag that hands the camera to `OrbitControls`. `update(dt)` drives it; the render loop also applies a view offset so the popup doesn't cover the subject.
- **Bible versions:** NIV (default), ESV, BSB, KJV. Any text field (`name`, `title`, `quote`, `note`, `aside`, `PARTS` entries) is a string or `{ niv, esv, bsb, kjv, default }`. `main.js` resolves them with `tr(v)` at render time; `setVersion` re-renders labels, popup, card and progress titles. Quote Scripture verbatim from the version named (NIV/ESV are copyrighted: keep quotes short and keep their notices in `VERSIONS`).
- **Labels** are `CSS2DObject`s keyed `gate:<id>`, `tower:<id>`, `feature:<id>`. A stop's `activeKeys` highlights them.
