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

This is a fly-by of Jerusalem's walls being rebuilt, c. 445 BC. It was inspired by the original fly-by created by Luke Thomas. The tour goes counter-clockwise from the Sheep Gate, in the same order as Nehemiah 3. The wall starts as ruins: low courses, rubble, and burned gates. Each stretch rises block by block as the camera flies along it. At each of the 25 stops a short popup gives the Bible text, a note, and who did the repairs. A small crew of figures works each stretch, larger where more groups are named; priests are in white.

Controls: play/pause (Space), previous/next (← →), click a progress dot to jump to a stop, **Explore** (E) for free orbit, a speed setting, a pause setting for how long the tour stays at each stop, and a Bible version setting.

#### Bible versions

The **Bible** setting switches the quotations and the place names (gate, tower and landmark labels, stop titles) between four versions. The choice is remembered in the browser.

| Version | Licence | Notice shown |
|---|---|---|
| **NASB** 2020 (default) | © The Lockman Foundation. Up to 1,000 verses, not over 50% of the work, may be quoted without written permission. Web pages need the full notice and a clickable link to www.Lockman.org. | full notice and link on the intro and finale cards |
| NIV | © Biblica. Up to 500 verses may be quoted without written permission, with a copyright notice. | full notice on the intro and finale cards |
| ESV | © Crossway. Up to 1,000 verses may be quoted without written permission, with a copyright notice. | full notice on the intro and finale cards |
| KJV | Public domain | short notice |

Every quotation is tagged with its version (e.g. “Nehemiah 3:6 (NASB)”), and the title bar names the current version. Fewer than 50 verses are quoted in total, well inside the publishers' limits.

Names differ between versions, e.g. the Old Gate (KJV) is the Ancient Gate (NASB), Jeshanah Gate (NIV) or Gate of Yeshanah (ESV); the Muster Gate (ESV) is the Inspection Gate (NASB, NIV) or gate Miphkad (KJV); the Pool of Siloam (NIV) is the Pool of Shelah (NASB, ESV) or Siloah (KJV). The gate-part chips also follow the wording (Bolts/Locks, Roofed/Covered, Dedicated/Consecrated/Sanctified). Builders' names use one spelling for all versions. NASB, NIV and ESV quotations were checked against Bible Gateway; KJV against the published text.

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

- Edit text or camera framing in the `STOPS` array in `data.js`. Text fields (`name`, `title`, `quote`, `note`) are either a plain string, used for every version, or an object keyed by version id (`nasb`, `niv`, `esv`, `kjv`) with an optional `default`. To add a version, add it to `VERSIONS` (with its copyright notice) and give it text wherever a field has no `default`. Each stop's `view` sets the camera side (`in`/`out`), distance, height, and offset along the wall.
- Add a labelled place in `FEATURES`. If it needs a building or other model, add it in the "landmarks" section of `main.js`. If it needs level ground, add it to `PADS` in `terrain.js`.
- In the browser console, `__tour.jump(i)` goes to stop `i`, and `__tour.advance(seconds)` fast-forwards time, which helps on slow machines.

### The Tabernacle (`tabernacle/`)

This is a tour of the tabernacle being set up at Sinai, following Exodus 40:17–33. The site starts empty. At each of the 13 stops the next part goes up, in the order Moses set it up: the bases, the boards and bars, the linen curtains, the tent and its coverings, then the furniture from the ark outwards, and the court last. The finale brings the cloud down over the tent (40:34–38). The popup gives the Bible text, a note, the materials the text names, the size, and who made it.

For the interior stops (ark, veil, table, lampstand, gold altar), the coverings and the south wall fade out so you can see inside.

Controls, the Bible version setting and the copyright notices are the same as for Nehemiah's Wall.

#### Bible versions

Many names differ between versions, so text fields can contain `{term}` placeholders, filled from `TERMS` in `data.js`. For example, the boards (NASB, KJV) are frames (NIV, ESV); the bases (NASB, NIV, ESV) are sockets (KJV); the mercy seat (ESV, KJV) is the atoning cover (NASB) or atonement cover (NIV); the veil is the shielding curtain (NIV) or vail (KJV); the basin is the laver (KJV); bronze is brass (KJV); acacia is shittim wood (KJV); and NASB has violet where the others have blue. The outer covering is fine leather (NASB), durable leather (NIV), goatskins (ESV) or badgers' skins (KJV). Quotations were checked against Bible Gateway.

#### Following the text

Everything is built in cubits, one world unit to the cubit (about 45 cm), so the sizes in the text are used as given.

| Part | Ref | Modelled |
|---|---|---|
| Bases | 26:19–25, 37; 38:27 | two silver bases under each board, four under the veil pillars (100 in all), five of bronze at the door |
| Boards | 26:15–25 | 10 × 1½ cubits, gold; 20 south, 20 north, 6 west, 2 corner boards. Board thickness isn't given (shown as ¾ cubit) |
| Bars | 26:26–29 | five per side, the middle one running end to end, outside the boards |
| Linen curtains | 26:1–6 | ten of 28 × 4, with cherubim, in two sets of five joined by 50 gold clasps over the veil line; they make the ceiling and hang down the sides and back |
| Goats' hair | 26:7–13 | eleven of 30 × 4, the sixth doubled over the front, the rest hanging down the back; bronze clasps |
| Rams' skins and outer covering | 26:14 | no sizes given, so shown over the roof only |
| Veil | 26:31–33 | coloured, with cherubim, on four gold pillars, dividing a 10-cubit cube for the Most Holy Place |
| Doorway curtain | 26:36–37 | embroidered, no cherubim, on five gold pillars |
| Ark and cover | 25:10–22 | 2½ × 1½ × 1½, open chest with moulding, rings and poles; tablets go in before the cover; two cherubim facing each other with wings spread up over it |
| Table | 25:23–30 | 2 × 1 × 1½, rim and moulding, rings and poles; twelve loaves in two rows (Leviticus 24:5–6) |
| Lampstand | 25:31–40 | shaft, three branches each side, seven lamps lit; height isn't given |
| Gold altar | 30:1–10 | 1 × 1 × 2, horns and moulding, incense smoke |
| Altar of burnt offering | 27:1–8 | 5 × 5 × 3, hollow, horns, ledge and grating halfway down, rings and poles, fire and smoke |
| Basin | 30:17–21; 38:8 | size and shape not given; Moses, Aaron (in the high priest's garments of chapter 28) and his four sons stand round it |
| Court | 27:9–19 | 100 × 50, hangings 5 high, 60 pillars at 5-cubit spacing with bronze bases, silver hooks, bands and capitals, bronze pegs and cords; 20-cubit embroidered gate on the east |

Where the text gives only a side, the position is a guess: the ark is centred in the Most Holy Place, the table and lampstand face each other halfway along the Holy Place, and the altar and basin stand on the centre line. The Most Holy Place is centred in the western half of the court, as is often assumed. The camp around the court is scenery (Numbers 2's tribal layout isn't modelled), and the mountains are schematic.

| File | Contents |
|---|---|
| `data.js` | The versions and `TERMS`, the tent and court dimensions, where the furniture stands, labels, and the tour stops (text, materials, camera). |
| `terrain.js` | The plain, level around the court, and the mountains. |
| `main.js` | Scene, every part of the tabernacle (grouped into build groups), effects, labels, camera tour and UI. |

### Adding a new animation

Create a sibling folder with its own `index.html`, then add a card for it to the root `index.html`.
