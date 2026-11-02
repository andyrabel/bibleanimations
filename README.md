# Bible Animations

3D animated tours of places and events in Scripture, built with [three.js](https://threejs.org/).

## Running

There's no build step, but the pages use ES modules, so they have to be served over HTTP (opening the file directly won't work):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

three.js loads from the jsDelivr CDN (pinned to 0.170.0), so you need to be online.

## Animations

### Nehemiah's Wall (`nehemiahs-wall/`)

This is a fly-by of Jerusalem's walls being rebuilt, c. 445 BC. The tour goes counter-clockwise from the Sheep Gate, in the same order as Nehemiah 3. The wall starts as ruins: low courses, rubble, and burned gates. Each stretch rises block by block as the camera flies along it. At each of the 25 stops a short popup gives the KJV text, a note, and who did the repairs. A small crew of figures works each stretch, larger where more groups are named; priests are in white.

Controls: play/pause (Space), previous/next (← →), click a progress dot to jump to a stop, **Explore** (E) for free orbit, a speed setting, and a pause setting for how long the tour stays at each stop.

| File | Contents |
|---|---|
| `data.js` | Everything content-related: the wall circuit, what the text says about each gate, towers, labelled places, and the tour stops (text and camera views). |
| `terrain.js` | Procedural terrain: the eastern ridge, the Kidron, Central and Hinnom valleys, and the Mount of Olives. |
| `main.js` | Scene, wall/gate construction, the build animation, labels, camera tour, and UI. |

#### Following the text

Each gate gets only the parts Nehemiah 3 records for it. The popup shows what is recorded and greys out what isn't mentioned.

| Gate | Ref | Recorded | Modelled |
|---|---|---|---|
| Sheep | 3:1 | built, consecrated, doors | doors only (no bolts or bars) |
| Fish | 3:3 | built; beams, doors, locks, bars | timber beams over the passage, doors, lock box and drop-bolts, two crossbars |
| Old | 3:6 | repaired; beams, doors, locks, bars | same as the Fish Gate |
| Valley | 3:13 | repaired, built; doors, locks, bars | no beams |
| Dung | 3:14 | repaired, built; doors, locks, bars | no beams |
| Fountain | 3:15 | repaired, built, **covered**; doors, locks, bars | the only roofed gatehouse |
| Water | 3:26 | repairs ran “over against” it | on the wall line, standing intact from the start as needing no repair; doors shown (though not mentioned) since it is in use |
| Horse | 3:28 | priests repaired “from above” it | no doors |
| East | 3:29 | only its keeper is named | no doors |
| Muster (Miphkad) | 3:31 | repairs ran “over against” it | no doors |

#### Archaeology used

- **Limestone ashlar blocks** about 2 m × 1 m. Older (ruined) courses are darker; new courses are bright. The rubble heaps clear as each section is built (4:10).
- **The wall on the eastern crest.** Kenyon found that the post-exilic wall ran along the top of the ridge, above the collapsed older wall on the slope (cf. 2:14).
- **The smaller city.** The circuit covers only the City of David and the Temple Mount. The western hill is outside it.
- **Valley Gate** where Crowfoot and FitzGerald excavated a gate (1927). The **Dung Gate** is about 1,000 cubits (~480 m) further south (3:13).
- **Broad Wall** drawn about 6.5 m thick, after Avigad's 7 m Hezekian wall. Its position here is schematic, because whether Nehemiah's line reached it is debated.
- **Tombs of David** as rock-cut tunnel tombs in the southern City of David (Weill, 1913–14).
- **Sparse houses, many still ruined:** “the people were few therein, and the houses were not builded” (7:4). They stand in short terraces along a few streets (a spine up the ridge, lanes to the gates, a street in the western valley) and against the inside of the wall, where builders repaired “over against his house” (3:23, 28–30).
- Vertical relief is exaggerated 1.4× so the valleys read from the air. All positions are approximate.

#### Extending

- Edit text or camera framing in the `STOPS` array in `data.js`. Each stop's `view` sets the camera side (`in`/`out`), distance, height, and offset along the wall.
- Add a labelled place in `FEATURES`. If it needs a building or other model, add it in the "landmarks" section of `main.js`. If it needs level ground, add it to `PADS` in `terrain.js`.
- In the browser console, `__tour.jump(i)` goes to stop `i`, and `__tour.advance(seconds)` fast-forwards time, which helps on slow machines.

### Adding a new animation

Create a sibling folder with its own `index.html`, then add a card for it to the root `index.html`.
