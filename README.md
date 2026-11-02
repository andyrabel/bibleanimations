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

#### Video export

`video/export.py` renders the tour to an MP4 (1080p, 30 fps, H.264 + AAC). A male voice reads each stop's verse with its reference ("Nehemiah, chapter 3, verse 1. …"), plus the intro and finale verses, over a soft generated music bed. There is no web UI: it's a command-line script.

**One-time setup** (from the repo root):

```sh
python3 -m venv video/.venv
video/.venv/bin/pip install -r video/requirements.txt
video/.venv/bin/playwright install chromium   # only if Playwright says its browser is missing
```

`requirements.txt` pins `playwright==1.60.0` to match the Chromium already in `~/.cache/ms-playwright`. If you upgrade Playwright, run `playwright install chromium` too. ffmpeg comes bundled with `imageio-ffmpeg`, so no system install is needed. Narration needs internet access (see below).

**Each time:**

```sh
# 1. Preview the first 40 s (about 1-2 min to render) and check the voice and music levels.
video/.venv/bin/python video/export.py --seconds 40 --out video/out/preview.mp4

# 2. Full render: about 30 min on the GPU for a roughly 10 min video.
video/.venv/bin/python video/export.py            # -> video/out/nehemiahs-wall-kjv.mp4
```

Check the first lines it prints:

- `renderer: ANGLE (... D3D12 (AMD Radeon ...))` means the GPU is in use (about 9 frames/s). If it says `SwiftShader` or `llvmpipe`, it has fallen back to software rendering at about 1 s per frame, and a full render takes hours.
- `narration: 27 clips` (intro + 25 stops + finale), then one line per cue (`21.1s  stop:0`) as each stop is reached, and progress every 10 s of video.

**Options:**

| Flag | Default | |
|---|---|---|
| `--version` | `kjv` | `nasb`, `niv`, `esv` or `kjv`. Only KJV is public domain; check the publisher's terms before publishing a video with NASB/NIV/ESV. |
| `--voice` | `en-GB-RyanNeural` | Any edge-tts voice. List the male ones with `video/.venv/bin/edge-tts --list-voices \| grep Male`. Alternatives: `en-GB-ThomasNeural`, `en-US-ChristopherNeural`, `en-US-AndrewNeural`. |
| `--rate` | `-10%` | Speaking rate. |
| `--no-narration` | | Music only. Holds go back to their normal reading-time length. |
| `--music` | generated | Path to your own track (it loops), or `none`. |
| `--music-volume` | `0.22` | Music level before ducking. The voice is normalised to -16 LUFS. |
| `--seconds` | whole tour | Stop early, for previews. |
| `--size`, `--fps` | `1920x1080`, `30` | |
| `--gl` | `gpu` | `software` if the GPU path fails. |
| `--out` | `video/out/nehemiahs-wall-<version>.mp4` | |

**Files in `video/out/`** (git-ignored): the finished MP4; `frames.mp4` (the silent render, before mixing); `music.wav`; `script.json` (exactly what was read aloud: check this for odd phrasing); and `tts/` (cached speech clips keyed by voice, rate and text, so re-runs only synthesise changed lines). Delete `tts/` to force fresh speech.

**How it works:**

1. The script serves the repo on a local port and opens `nehemiahs-wall/?record&version=kjv` in headless Chromium.
2. `__record.script()` returns the text for each cue. The page builds the spoken reference from `ref` and cleans up the on-screen quote: it drops the quotation marks, turns ellipses into commas and capitalises the first word.
3. Each line goes to edge-tts, and the clip lengths go back through `__record.start()`. Every stop then holds for at least 0.8 s lead + the clip + 1.8 s tail.
4. `__record.step(1/30)` advances the tour and its CSS transitions by one frame. The script screenshots the frame into ffmpeg and collects the cue times.
5. ffmpeg places each clip at its cue time, ducks the music under the voice, adds a fade in and out, and muxes the result with the frames.

**Tuning:** to change the pauses around narration or the finale orbit, edit `NARR_LEAD`, `NARR_TAIL` and `RECORD_END` in the "recording" section of `nehemiahs-wall/main.js`. The intro card stays up for its narration plus 1 s. To change the music, edit `CHORDS`, `CHORD_SEC` and `BELLS` in `video/music.py` (`python3 video/music.py test.wav 60` renders a sample). Ducking and fades are in `mix()` in `export.py`. Editing a stop's `quote` or `ref` in `data.js` changes its narration automatically on the next run.

**Troubleshooting:**

- *`Executable doesn't exist at .../chromium_headless_shell-NNNN`*: the Playwright version doesn't match the installed browsers. Run `video/.venv/bin/playwright install chromium`.
- *edge-tts errors or hangs*: it's an unofficial use of Microsoft's online read-aloud service, so it needs internet and can occasionally break. Try `pip install -U edge-tts` in the venv.
- *Software renderer under WSL*: the script sets `GALLIUM_DRIVER=d3d12` for Chromium. Check that `/dev/dxg` exists and `/usr/lib/x86_64-linux-gnu/dri/d3d12_dri.so` is installed (Mesa).
- *Errors from the page itself* are printed as `page error: …`.

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
| Basin | 30:17–21; 38:8 | size and shape not given; Moses, Aaron and his four sons stand round it |
| Priestly garments | 28:4–43; 39:1–31 | Aaron: checkered linen tunic; robe of the ephod, all blue, with gold bells and pomegranates of blue, purple and scarlet round the hem; ephod of gold and coloured yarn with its woven band and an onyx stone in a gold setting on each shoulder; breastpiece a span square with twelve stones in four rows, hung by gold chains and tied with blue cord; linen turban with the gold plate on a blue cord. His sons: linen tunics, sashes of linen and coloured yarn, caps. The stones' colours follow common identifications, several of which are uncertain |
| Court | 27:9–19 | 100 × 50, hangings 5 high, 60 pillars at 5-cubit spacing with bronze bases, silver hooks, bands and capitals, bronze pegs and cords; 20-cubit embroidered gate on the east |

Where the text gives only a side, the position is a guess: the ark is centred in the Most Holy Place, the table and lampstand face each other halfway along the Holy Place, and the altar and basin stand on the centre line. The Most Holy Place is centred in the western half of the court, as is often assumed. The cloud in the finale is drawn as white, drifting smoke covering the tent and rising over it.

The camp follows Numbers 2–3: Judah, Issachar and Zebulun on the east; Reuben, Simeon and Gad on the south; Ephraim, Manasseh and Benjamin on the west; Dan, Asher and Naphtali on the north, each tribe in ordered rows under its flag, one tent per thousand men counted (2:4–30). The Levites camp closer in (3:23–38): Gershonites west, Kohathites south, Merarites north, one tent per 500, and Moses, Aaron and his sons on the east, before the entrance. Numbers gives each tribe's side but not its place along the side, so the leading tribe (whose flag stands taller) is put in the middle. The flag colours aren't given in the text and are only there to tell the tribes apart. The mountains are schematic.

| File | Contents |
|---|---|
| `data.js` | The versions and `TERMS`, the tent and court dimensions, where the furniture stands, labels, the tribes and Levites of the camp, and the tour stops (text, materials, camera). |
| `terrain.js` | The plain, level around the court, and the mountains. |
| `main.js` | Scene, every part of the tabernacle (grouped into build groups), effects, labels, camera tour and UI. |

### Adding a new animation

Create a sibling folder with its own `index.html`, then add a card for it to the root `index.html`.
