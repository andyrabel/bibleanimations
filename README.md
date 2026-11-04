# Bible Animations

3D animated tours of places and events in Scripture, built with [three.js](https://threejs.org/).

## Running

There's no build step, but the pages use ES modules, so they have to be served over HTTP (opening the file directly won't work):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

three.js loads from the jsDelivr CDN (pinned to 0.170.0), so you need to be online.

## Languages

The site is in English, Spanish and French. The language is chosen, in order, from:

1. `?version=` in the URL (e.g. `?version=rva`), since every Bible version belongs to one language;
2. `?lang=` in the URL (`en`, `es` or `fr`);
3. the last choice made on this browser;
4. the browser's language settings;
5. English.

The landing page has a language menu. In an animation, the **Bible** menu lists the versions grouped by language, so picking a Spanish or French version switches the whole page to that language. Each language remembers its own version. A choice made in a menu or in the URL is saved; one taken from the browser settings isn't.

| Spanish version | Pairs with | Licence | Notice shown |
|---|---|---|---|
| **NBLA** Nueva Biblia de las Américas (default) | NASB (also Lockman) | © The Lockman Foundation. Up to 500 verses, not over 25% of the work, may be quoted without written permission. The notice links to www.NuevaBiblia.com. | full notice and link on the intro and finale cards |
| NVI Nueva Versión Internacional | NIV | © Biblica, with a copyright notice. | full notice on the intro and finale cards |
| RVR1960 Reina-Valera 1960 | (the most widely used Spanish Protestant Bible) | © Sociedades Bíblicas en América Latina / Sociedades Bíblicas Unidas. Up to 500 verses, not over 25% of the work, may be quoted without written permission, with the credit line. | full notice on the intro and finale cards |
| RVA Reina-Valera Antigua (1909) | KJV | Public domain | short notice |

Spanish quotations were copied from Bible Gateway and checked word for word against it. They keep each version's own spelling and names; the RVA keeps its 1909 spelling (“á”, “Jerusalem”, “fué”). Where the RVA prints a verse's first words in capitals (“Y LEVANTOSE”, “Y HARAS”), they are written in lower case with the accent restored.

The versions don't always record the same details, and the Spanish notes follow the version on screen. For example, only the NBLA says the Sheep Gate was consecrated (the NVI says “la repararon”, the RVR1960 “arreglaron”), so the Spanish note says it is the Hebrew that records the consecration. In Nehemiah 3 the RVR1960 and RVA have “la enmaderaron” for the beams and “cerraduras y cerrojos” for the bolts and bars, and the gate-part chips use those words.

| French version | Pairs with | Licence | Notice shown |
|---|---|---|---|
| **SG21** Segond 21 (default) | NASB, NBLA (a modern formal translation) | © 2007 Société Biblique de Genève. Its quotation terms haven't been checked; quotes are kept short and carry the notice. | full notice on the intro and finale cards |
| BDS La Bible du Semeur | NIV, NVI (also Biblica) | © 1992, 1999 Biblica, with a copyright notice. | full notice on the intro and finale cards |
| NEG1979 Nouvelle Édition de Genève | RVR1960 (a revised Segond) | © 1979 Société Biblique de Genève. Quotation terms not checked, as for the SG21. | full notice on the intro and finale cards |
| LSG Louis Segond (1910) | KJV, RVA | Public domain | short notice |

These are the four French versions on Bible Gateway. French quotations were copied from Bible Gateway and checked word for word against it, apart from typography: curly apostrophes throughout, “œ” for the LSG's “oe”, and non-breaking spaces before “:”, “;”, “?”, “!” and inside « ». Each keeps its own spelling: the LSG has “l’Éternel”, “Éliaschib”, the SG21, BDS and NEG1979 “l’Eternel”. The SG21's square brackets (Exode 40:17) are its own.

The French versions differ less from each other than the English ones. Where the Hebrew of Nehemiah 3:3 and 3:6 has beams, the SG21, NEG1979 and LSG say the gate was covered, as they do for the Fountain Gate's roof (3:15), so the beams chip reads “Couverte” and the notes say the Hebrew has beams; only the BDS has a “charpente”. The BDS calls the Pool of Siloam “l’étang de l’aqueduc” and the Inspection Gate “la porte de la Surveillance”. The NEG1979 and LSG call the priests “sacrificateurs” and the temple servants “Néthiniens”, and the builders' names follow each version (Meshullam, Meshoullam, Meschullam). In Exodus the BDS has socles, cadres, traverses and piliers where the others have bases, planches, barres and colonnes, a “coffre” for the ark, and “pourpre violette et écarlate, rouge éclatant” for the colours; the NEG1979 and LSG have airain for bronze.

How it fits together:

- `i18n.js` (root) holds the languages, every Bible version with its notice, and the interface text (buttons, menus, titles, the landing page). Static text in the HTML is tagged with `data-i18n` (text), `data-i18n-title`, `data-i18n-aria` and `data-i18n-content`.
- Each animation's `data.js` is the English content. `lang/es.js` and `lang/fr.js` beside it has the same shape, with only the text fields, and is merged over it when the page loads. In a language file, a text field is a string, or an object keyed by that language's versions with `default` for the rest. Any field it leaves out falls back to English.
- To add a language: add it to `LANGS`, its versions to `VERSIONS` and its interface text to `UI` in `i18n.js`, then write `lang/<code>.js` for each animation. An animation without the file still works, with its content in English.

## Narration

Every animation reads each stop's reference and verse aloud as the tour arrives there, followed by the finale's verse. The notes aren't read and there is no background music. The reading uses the browser's own speech synthesis (the Web Speech API), so it needs no server or audio files and works with every Bible version and language. A stop isn't left until its verse has been read, even with the pause setting on **No pause**. Pausing the tour pauses the voice.

The dock has a speaker button to mute and unmute (M), a volume slider (hidden on phones, which use the device volume), and a **Voice** menu listing the browser's voices for the current language, best first. The default is a UK English male voice (Ryan in Edge, as in the video; Google UK English Male in Chrome; Daniel on a Mac) a US Spanish voice and a French voice from France; then other voices of that region, natural or neural ones first. Browsers don't say which voices are male, so they are recognised by name. Changing the voice or unmuting reads the current verse again, and so does a new volume. Mute, volume and the voice for each language are remembered on this browser.

The voices come from the browser and the operating system. Microsoft Edge has the same Microsoft neural voices as the video export; Chrome has Google voices; Safari and Firefox use the system's. If no voice exists for the language, the menu says so and the tour runs silently. The tour starts with a click on **Begin**, which counts as the user action that browsers require before they will speak.

The spoken text is built by `verseLine()` in `narrator.js` (root): the reference in words from the `refVerse`/`refVerses`/`refChapter`/`refChapters` strings in `i18n.js` ("Éxodo, capítulo 40, versículos 17 al 18."), then the on-screen quote without its quotation marks, with ellipses turned into pauses and words in capitals such as “LORD” written as “Lord”, so the voice says the word instead of spelling it out. Nehemiah's video export reads exactly the same lines. Timing is `LEAD`, `TAIL` and `RATE` at the top of `narrator.js`.

## Animations

### Nehemiah's Wall (`nehemiahs-wall/`)

This is a fly-by of Jerusalem's walls being rebuilt, c. 445 BC. It was inspired by the original fly-by created by Luke Thomas. The tour goes counter-clockwise from the Sheep Gate, in the same order as Nehemiah 3. The wall starts as ruins: low courses, rubble, and burned gates. Each stretch rises block by block as the camera flies along it. At each of the 25 stops a short popup gives the Bible text, a note, and who did the repairs. A small crew of figures works each stretch, larger where more groups are named; priests are in white.

Controls: play/pause (Space), previous/next (← →), click a progress dot to jump to a stop, **Explore** (E) for free orbit, a speed setting, a pause setting for how long the tour stays at each stop, and a Bible version setting.

The tour reads each stop's reference and verse aloud ("Nehemiah, chapter 3, verse 1. …") as it arrives, and the finale's verse at the end. Nothing else is read, and there is no music. See [Narration](#narration).

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
| `data.js` | Everything content-related, in English: the wall circuit, what the text says about each gate, towers, labelled places, and the tour stops (text and camera views). |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text for the same fields. |
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

- Edit text or camera framing in the `STOPS` array in `data.js`. Text fields (`name`, `title`, `quote`, `note`, `builders`, `repair`) are either a plain string, used for every English version, or an object keyed by version id (`nasb`, `niv`, `esv`, `kjv`) with an optional `default`. Make the same change in `lang/es.js`. To add a version, add it to `VERSIONS` in `i18n.js` (with its copyright notice) and give it text wherever a field has no `default`. Each stop's `view` sets the camera side (`in`/`out`), distance, height, and offset along the wall.
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

**Files in `video/out/`** (git-ignored): the finished MP4, plus intermediates named after it (for the default output: `nehemiahs-wall-kjv.frames.mp4`, the silent render before mixing; `.music.wav`; and `.script.json`, exactly what was read aloud, which is worth checking for odd phrasing). Because they're named after `--out`, two exports with different `--out` can run at once, but two with the same output will overwrite each other's files; and `tts/` (cached speech clips keyed by voice, rate and text, so re-runs only synthesise changed lines). Delete `tts/` to force fresh speech.

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

This is a tour of the tabernacle being set up at Sinai, following Exodus 40:17–33. The site starts empty. At each of the 13 stops the next part goes up, in the order Moses set it up: the bases, the boards and bars, the linen curtains, the tent and its coverings, then the furniture from the ark outwards, and the court last. The finale brings the cloud down over the tent, and the glory of the LORD fills the tabernacle (40:34–38). The popup gives the Bible text, a note, the materials the text names, the size, and who made it.

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

Where the text gives only a side, the position is a guess: the ark is centred in the Most Holy Place, the table and lampstand face each other halfway along the Holy Place, and the altar and basin stand on the centre line. The Most Holy Place is centred in the western half of the court, as is often assumed. In the finale the cloud comes down as a column (the pillar of cloud of 13:21) and spreads over the tent as white, drifting smoke; the glory is drawn as in Ezekiel's Temple, a soft light that comes down inside the cloud, goes in over the ark and fills the tent, shining out through the coverings. The text says only that the cloud covered the tent and the glory filled it; how it came is a guess.

The camp follows Numbers 2–3: Judah, Issachar and Zebulun on the east; Reuben, Simeon and Gad on the south; Ephraim, Manasseh and Benjamin on the west; Dan, Asher and Naphtali on the north, each tribe in ordered rows under its flag, one tent per thousand men counted (2:4–30). The Levites camp closer in (3:23–38): Gershonites west, Kohathites south, Merarites north, one tent per 500, and Moses, Aaron and his sons on the east, before the entrance. Numbers gives each tribe's side but not its place along the side, so the leading tribe (whose flag stands taller) is put in the middle. The flag colours aren't given in the text and are only there to tell the tribes apart. The mountains are schematic.

| File | Contents |
|---|---|
| `data.js` | The English `TERMS`, the tent and court dimensions, where the furniture stands, labels, the tribes and Levites of the camp, and the tour stops (text, materials, camera). |
| `lang/es.js` | The Spanish text, including Spanish `TERMS`. Spanish nouns have gender, so some terms carry their article (`{theBoards}` is “las tablas” or “los tablones”) and the notes avoid adjectives that would have to agree with a term. |
| `lang/fr.js` | The French text, including French `TERMS`. As in Spanish, some terms carry their article, and `{ofBronze}` carries its preposition because “de” elides (de bronze, d’airain). |
| `terrain.js` | The plain, level around the court, and the mountains. |
| `main.js` | Scene, every part of the tabernacle (grouped into build groups), effects, labels, camera tour and UI. |

### The Priestly Garments (`priestly-garments/`)

This is a close-up of Aaron being dressed as high priest at the doorway of the tent of meeting, following Leviticus 8:6–9. Exodus 28 describes the garments and Exodus 39 tells how they were made. At each of the 9 stops Moses puts the next garment on, in the order Leviticus gives: the washing, the tunic, the sash, the robe, the ephod with its shoulder stones and band, the breastpiece, the Urim and Thummim, the turban, and the gold plate. The finale draws back while his four sons are dressed in tunics, sashes and caps (8:13). The popup gives the Bible text, a note, the materials the text names, the size where it is given, and who made it; at the breastpiece it also lists the twelve stones in the current version's names.

Controls, the Bible version setting and the copyright notices are the same as for the other animations. The tabernacle, court, basin and altar stand where they do in the Tabernacle animation (same coordinates, one unit to the cubit), already set up.

#### Bible versions

The garments' names follow the version: the tunic is a coat (ESV, KJV); the sash a girdle (KJV); the ephod's band the artistic band (NASB), decorative waistband (NIV), skillfully woven band (ESV) or curious girdle (KJV); the breastpiece a breastplate (KJV); the turban a mitre (KJV); the golden plate, the holy crown, is the gold plate, the sacred emblem in the NIV; the sons' caps are bonnets (KJV). The twelve stones differ most of all (28:17–20): the NASB's ruby, topaz, emerald is carnelian, chrysolite, beryl in the NIV and sardius, topaz, carbuncle in the ESV and KJV, and so on. In Spanish the turban is la tiara (NBLA), el turbante (NVI) or la mitra (RVR1960, RVA), the breastpiece el racional in the RVA, and the RVA's ninth stone is a rubí. In French the turban is la tiare, le turban in the BDS, where the plate is l’insigne d’or; the ephod's band is the écharpe (SG21) or ceinture de l’éphod; the sons' caps are coiffes (SG21), turbans (BDS) or bonnets (NEG1979, LSG); and the BDS's fourth stone is a rubis where the others have an escarboucle. Quotations were checked against Bible Gateway.

#### Following the text

| Garment | Ref | Modelled |
|---|---|---|
| Washing | Leviticus 8:6; Exodus 30:19–21; 40:31–32 | hands and feet, with water drawn from the basin and poured from a jug (the jug isn't in the text) |
| Undergarments | Exodus 28:42–43 | linen, waist to thighs, on Aaron and his sons while they are washed at the basin (Leviticus 8:6) |
| Tunic | 28:39; 39:27 | fine linen, checkered; length and sleeves not given (drawn to the ankles, with sleeves) |
| Sash | 28:39; 39:29 | fine linen with blue, purple and scarlet; how it was tied isn't given (ends hang in front, under the robe) |
| Robe of the ephod | 28:31–35; 39:22–26 | all blue, woven, a bound opening for the head, no sleeves mentioned; pomegranates of blue, purple and scarlet alternating with gold bells round the hem. Length and number aren't given (to the calf, 18 of each) |
| Ephod and band | 28:6–12; 39:2–7 | gold, coloured yarn and linen, front and back joined over the shoulders; shape not given (chest to hips, open at the sides). Two onyx stones in gold settings, each engraved with six names in order of birth, in Hebrew |
| Breastpiece | 28:15–29; 39:8–21 | the same work, folded double, a span (half a cubit) square; twelve stones in four rows in gold settings, each engraved with one name; gold chains to the shoulder settings, blue cord from its lower rings to the ephod above the band. The order of the names isn't given (birth order is used) |
| Urim and Thummim | 28:30 | never described, so shown only as two plain shapes that disappear into the breastpiece |
| Turban | 28:39; 39:28 | fine linen, wound; shape not given |
| Plate | 28:36–38; 39:30–31 | pure gold on a blue cord at the front of the turban, engraved “Holy to the LORD” in Hebrew; size not given |
| Sons' garments | 28:40; Leviticus 8:13 | tunics, sashes and linen caps, put on in the finale |

The stone colours follow the NASB's names and common identifications; several are uncertain. Where people stand isn't given beyond "the doorway of the tent of meeting" (8:3–4): Aaron faces east out of the doorway, Moses stands beside him, and the sons wait to the south. Aaron (83) and Moses (80) are grey-bearded (Exodus 7:7). The congregation (8:3–4) stands outside the court gate, one figure for many. For the washing, Moses leads Aaron and his sons to the basin. The priests washed their hands and their feet from it (Exodus 30:19–21; 40:31–32), so each man in turn, Aaron first, steps up to face Moses, who fills a jug at the basin and pours the water over his cupped hands and then his feet, leaving the ground wet. The text doesn't say how the water was drawn, so the jug is a guess. The others wait in line and the washed stand aside; then all walk back to the doorway to be dressed. Moses' arms reach out while each garment goes on.

| File | Contents |
|---|---|
| `data.js` | The English `TERMS`, where everyone stands, the garment labels, the twelve stones, the Hebrew names and inscription, and the tour stops (text, materials, camera). |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text, including their `TERMS` with articles where a note needs one. |
| `terrain.js` | The same plain and mountains as the Tabernacle. |
| `main.js` | Scene, the tabernacle and court as a backdrop, the figures and every garment (grouped into build groups), effects, labels, camera tour and UI. |

### The Day of Atonement (`day-of-atonement/`)

This is a tour of the Day of Atonement at the tabernacle, following Leviticus 16 in its own order. At each of the 15 stops the next step of the rite happens: Aaron bathes and puts on the linen garments; the bull, the two rams and the two goats are brought in; lots are cast over the goats; the bull is slaughtered; Aaron takes coals from the altar and brings incense inside the veil; he sprinkles the bull's blood, then the goat's, on and in front of the cover; he puts blood on the horns of the altar and sprinkles it; he lays his hands on the live goat, which a man leads out through the camp into the wilderness; he leaves the linen garments in the tent and puts on his own; he offers the burnt offerings; and the sin offerings are burned outside the camp. The finale is 16:30, "once a year" (16:34).

The tabernacle, court, basin and altar stand where they do in the other two animations (same coordinates, one unit to the cubit), with the camp of Numbers 2–3 round them as in the Tabernacle animation and the congregation outside the gate. For the stops inside the tent, and while the camera follows Aaron through it, the coverings and the south wall fade out. Aaron walks between the basin, the doorway, the altar and the ark, and the camera follows whoever is walking; the walks are speeded up.

The popup's chips show what the stop's verses say atonement is made for, from the list in 16:33 (Aaron and his household, the Holy Place, the tent of meeting, the altar, the people). Below them it says where the step happens and what Aaron is wearing. Controls, the Bible version setting and the copyright notices are the same as for the other animations.

#### Bible versions

Names follow the version: the atoning cover (NASB) is the atonement cover (NIV) or mercy seat (ESV, KJV); the veil is the curtain (NIV) or vail (KJV); the firepan (NASB) is a censer; the bull a bullock (KJV); the linen tunic a coat (ESV, KJV), the sash a girdle and the turban a mitre (KJV). The second lot is "for the scapegoat" except in the ESV, which has "for Azazel", so the goat's label changes with it. The man who leads it away "stands ready" (NASB), is "appointed for the task" (NIV), is "in readiness" (ESV) or is "a fit man" (KJV). In Spanish the cover is el propiciatorio, la tapa del arca (NVI) or la cubierta (RVA); the bull el novillo (NBLA, NVI) or el becerro; the scapegoat el macho cabrío expiatorio (NBLA) or the goat por Azazel (RVR1960, RVA), while the NVI has only "para soltarlo en el desierto"; the camp is el real in the RVA. In French the firepan is the brûle-parfum (SG21), encensoir (BDS) or brasier (NEG1979, LSG); the scapegoat the bouc émissaire in the BDS and the bouc pour Azazel in the others; the linen sash is the BDS's écharpe. The NVI quotes 16:20–21 at the live goat, since its verse 21 continues verse 20.

Quotations were copied from Bible Gateway, Leviticus 16 in all twelve versions, and a script checked every quoted phrase against the chapter (ignoring case and the spacing of punctuation): 208 phrases, all found. Spanish "SEÑOR" is written "Señor", as in the other animations.

#### Following the text

| Step | Ref | Modelled |
|---|---|---|
| Linen garments | 16:4 | plain linen tunic, sash and turban over the undergarments. He bathes first; where and how aren't given, so he pours water over himself from a jug at the basin |
| Offerings | 16:3, 5 | a bull and a ram for Aaron, two male goats and a ram from the people, brought in through the gate to wait north of the altar, where offerings were slaughtered (1:11; 4:24) |
| Lots | 16:7–10 | the goats stand at the doorway of the tent; the lots aren't described, so they are two plain stones thrown down in front of the goats |
| Bull for Aaron | 16:6, 11 | slaughtered north of the altar, shown lying down; its blood is kept in a bronze bowl (the vessel isn't named; the altar had bronze basins, Exodus 27:3) |
| Coals and incense | 16:12 | a bronze firepan (the altar's were bronze, Exodus 27:3) filled from the altar's fire, the incense carried in the other hand |
| The cloud | 16:13 | incense smoke filling the space over the ark and its cover; the firepan is set down before the ark (the text doesn't say) |
| Bull's blood | 16:14 | sprinkled once on the east side of the cover (no number is given) and seven times on the ground in front of it |
| Goat's blood | 16:15–17 | the same, after the goat for the LORD is slaughtered |
| The altar | 16:18–19 | blood on each of the four horns, then sprinkled seven times on its south side. Which altar is meant is debated (the gold altar's horns were also cleansed once a year, Exodus 30:10); here it is the bronze altar, which Aaron goes out to |
| The live goat | 16:20–22 | both of Aaron's hands on its head; the man leads it on a rope out of the court, along a way left clear through the camp and east into the wilderness (the direction isn't given) |
| Linen garments left | 16:23 | taken off in the Holy Place and left folded by the wall |
| His own garments | 16:24 | the second bathing ("in a holy place") isn't shown; the high priest's garments go on as in the Priestly Garments |
| Burnt offerings | 16:24–25 | the two rams go up on the altar, whose fire burns higher |
| Outside the camp | 16:27–28 | the bull and the goat burned on a fire beyond the eastern tents, with the one who burns them standing by |

The slaughter of the animals isn't shown: they lie down, and are gone once they are burned. Where Aaron stands is a guess wherever the text gives only the place (at the doorway, inside the veil, at the altar). He keeps south of the gold altar inside the tent and goes through the doorway and the veil between their pillars.

| File | Contents |
|---|---|
| `data.js` | The English `TERMS`, what atonement is made for, the labels, the camp, the breastpiece stones and Hebrew names for the garments, and the tour stops (text, camera, place, garments). |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text, including their `TERMS` with articles where a note needs one. |
| `terrain.js` | The same plain and mountains as the Tabernacle. |
| `main.js` | Scene, the tabernacle with its furniture, the camp, the people and the animals, the walks, what Aaron does at each step (bathing, lots, firepan, blood, laying on of hands), labels, camera tour and UI. |

### The Dedication of the Wall (`dedication-of-the-wall/`)

This is a tour of the dedication of Jerusalem's wall, following Nehemiah 12:27–43. The Levites and singers come in from their villages and gather inside the Valley Gate; the priests and Levites purify the people, the gates and the wall; the leaders go up on the wall and two choirs are formed. The first choir, led by Ezra, goes right (south) past the Dung Gate and the Fountain Gate, up the City of David to the Water Gate. The second, with Nehemiah and half the people behind it, goes left (north) past the Tower of Furnaces, the Broad Wall, the Gate of Ephraim, the Old Gate and the Fish Gate, the towers of Hananel and the Hundred, to the Sheep Gate, and stops at the Gate of the Guard. Both choirs then stand in the temple court, and the great sacrifices are offered. The finale is 12:43, "the joy of Jerusalem was heard far away", seen from the Mount of Olives. There are 11 stops.

The city is Nehemiah's Wall's, finished: `main.js` imports its wall, gates, towers, landmarks and terrain (and their translations) from `nehemiahs-wall/`, so a change to the city there shows in both. The processions walk two abreast along the top of the wall, up flights of steps onto the gates and towers, and come down by stairs on the inside of the wall; the walk is speeded up and the camera follows the head of the choir. The popup lists who walks in that part of the procession, and at the stops whose verses name instruments, chips for the cymbals, harps, lyres, trumpets and "the instruments of David".

#### Bible versions

The KJV's "psalteries, and harps" are the NASB's "harps, and lyres"; the NVI has "liras y arpas", the RVR1960 and RVA "salterios y cítaras", and the French luths with harpes (lyres in the BDS). The Gate of the Guard is the "prison gate" in the KJV, la puerta de la Cárcel in the RVR1960 and RVA, and la porte de la prison in French. The ESV says the first choir went "to the south" and the second "to the north" where the others have right and left. The choirs are "companies" in the KJV.

Quotations were copied from Bible Gateway, Nehemiah 12:27–43 in all twelve versions, and a script checked every quoted phrase against the passage: 180 phrases, all found. The RVA's "la mujeres" (12:43) is as Bible Gateway has it.

#### Following the text

| Step | Ref | Modelled |
|---|---|---|
| The Levites sought out | 12:27–29 | Levites and singers in linen (as in 2 Chr 5:12) come up the valley from the south (Netophah) and the north (Geba, Azmaveth) and in through the Valley Gate, whose doors stand open |
| Purified | 12:30 | the text doesn't say how; a gold light spreads round the wall both ways from the Valley Gate and fades |
| Up on the wall | 12:31 | the starting point isn't named; the Valley Gate, halfway along the west side, fits both routes. Both choirs climb stairs inside the wall |
| The first choir | 12:31–36 | Ezra in front, the choir, Hoshaiah and half the leaders, priests' sons with trumpets, Zechariah and his kinsmen. The text says only "the musical instruments of David"; they carry lyres, harps and cymbals, the instruments of 12:27 |
| The steps of the City of David | 12:37 | the choir stays on top of the wall as it climbs the ridge (whether it went up a stairway beside the wall is debated) |
| The Water Gate | 12:37 | past the king's upper house; the first choir waits here while the second goes round, since the text tells the two routes in turn |
| The second choir | 12:38 | the choir, Nehemiah, half the officials, priests with trumpets (12:41) and half the people |
| The Gate of Ephraim | 12:39 | not in chapter 3; placed between the Broad Wall and the Old Gate by the order of this verse, as a gatehouse with nothing more described |
| The Gate of the Guard | 12:39 | mentioned nowhere else; shown as an opening with piers and a lintel in the north wall of the temple court |
| In the house of God | 12:40–42 | the choirs face each other across the court, the first from the south, the second from the north |
| Great sacrifices | 12:43 | smoke rises from the altar; the people in the court, women and children among them, leap for joy |

| File | Contents |
|---|---|
| `data.js` | The instruments, the Gate of Ephraim and the Gate of the Guard, the labelled people, and the tour stops (text, where each choir is, camera). |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text. The city's names come from `nehemiahs-wall/lang/`. |
| `main.js` | The finished city (from Nehemiah's Wall), the walkway and stairs, the routes, the processions and the crowd, the purification and the smoke, labels, camera tour and UI. |

### Holy Week in Jerusalem (`holy-week/`)

This is a tour of Jesus' last week in Jerusalem, day by day in Mark's order (Mark 11–16), with the other Gospels where they add to it: the colt at Bethphage, the ride down the Mount of Olives, the weeping over the city (Luke), into the temple; the fig tree and the overturned tables (Monday); Caesar's coin, the widow's two coins and "not one stone upon another" (Tuesday); the anointing at Bethany (Wednesday); the man with the jar of water, the Last Supper and Gethsemane (Thursday); the arrest, Peter's denial, Pilate, Simon of Cyrene, the cross and the burial (Friday); the guard at the tomb (Saturday, from Matthew); and the empty tomb on the first day of the week. The finale is 1 Corinthians 15:3–4, over the city at sunrise. There are 21 stops.

The city is Herod's Jerusalem of about AD 30, built for this animation (not Nehemiah's): the temple platform with its porticoes and the Royal Stoa, the inner courts, the sanctuary and the altar; the Antonia; Herod's palace with its three towers; the Hasmonean palace; the first and second walls (Agrippa's third wall is later and isn't shown); the pools of Siloam and Bethesda; houses in the Upper and Lower City; the Mount of Olives with Gethsemane, Bethphage and Bethany. The terrain runs east to Bethany at about true scale, with the relief exaggerated 1.3 times. Each stop has a day and an hour: the sun moves, the full moon of Passover lights the night scenes, lamps, torches and the courtyard fire light their surroundings, and the sky darkens from the sixth hour to the ninth. People are built like the figures of the Leviticus animations (Jesus, the twelve, the women, Joseph and Nicodemus, Pilate, soldiers and others), walking, sitting, reclining at table, lying face down and riding; crowds are simple instanced figures. The crucifixion is shown only from a distance.

#### Bible versions

The colt is "un pollino" in the NBLA and RVR1960, "un burrito" in the NVI. The KJV's "penny" is the NASB's denarius; its "two mites, which make a farthing" are two lepta making a quadrans. Caesar is "l'empereur" in the SG21. The SG21 brackets "[mangez,]", "[nouvelle]" and "[entendit son cri et]" are kept as it prints them. The LSG has "pour plusieurs" (14:24) where the others have "pour beaucoup". The NIV's darkness is "at noon… until three in the afternoon", the SG21's and BDS's "à midi… jusqu'à trois heures".

Quotations were copied from Bible Gateway in all twelve versions, and a script checked every quoted phrase against the passages: 352 phrases, all found, except where Bible Gateway's page has a slip: the NBLA's "habiéndolo" (14:22), split in two there, and the RVA's "¡" (Mark 11:9, Luke 19:42) and "oró" (14:35), which it gives as a soft hyphen and "oro".

#### Following the text

| Stop | Ref | Modelled |
|---|---|---|
| The colt | Mark 11:1–7 | two disciples (not named) fetch the colt tied at a door in Bethphage; cloaks on its back |
| Hosanna! | Mark 11:8–10; John 12:13 | cloaks and branches spread on the road ahead; crowds before and behind, with palm branches |
| He wept over the city | Luke 19:41–44 | the view of the city across the Kidron from the western slope |
| Into the temple | Mark 11:11 | the gate isn't named; he comes in by the east gate (the Mishnah's Shushan Gate, aligned with the sanctuary), up steps from the Kidron that are a guess |
| The fig tree | Mark 11:12–14 | in leaf, on the road from Bethany; the place isn't given |
| The tables overturned | Mark 11:15–17 | money changers' tables and dove sellers' seats in the Royal Stoa, where many place the market |
| Caesar's coin | Mark 12:13–17 | the place in the courts isn't given; Solomon's Portico (John 10:23) |
| The widow's two coins | Mark 12:41–44 | thirteen horn-shaped chests (Mishnah Shekalim 6:5) round the Court of the Women |
| Not one stone upon another | Mark 13:1–3 | sitting on the Mount of Olives opposite the temple, with Peter, James, John and Andrew |
| Anointed at Bethany | Mark 14:3–11 | shown on the Wednesday, from "two days before the Passover" (14:1); reclining at a low table, the house cut away; Judas leaves |
| The man with the jar | Mark 14:12–16 | Peter and John (Luke 22:8) follow him up from the Pool of Siloam to a house on Mount Zion, the traditional site of the upper room |
| The Last Supper | Mark 14:17–25; John 13:30 | reclining at table (14:18), bread and cup; Judas goes out into the night |
| Gethsemane | Mark 14:26–42 | the way from Mount Zion past Siloam and up the Kidron is a guess; he falls on his face, the disciples sleep |
| The arrest | Mark 14:43–50; John 18:3 | Judas with a crowd with torches; the kiss; all flee |
| Peter's denial | Mark 14:53–72 | the high priest's house at the traditional site (St Peter in Gallicantu); the council in the hall, Peter and the guards at the fire, the servant girl |
| Before Pilate | Mark 15:1–15; John 19:13 | the Praetorium at Herod's palace (others say the Antonia), Pilate on the judgement seat on the Pavement; Barabbas released |
| Simon of Cyrene | Mark 15:20–22; Luke 23:26–27; John 19:17 | Jesus carries the beam out, then Simon carries it behind him; out by the Gennath Gate, which is a guess |
| The cross | Mark 15:24–41 | three crosses on the rock at the traditional Golgotha (Church of the Holy Sepulchre), seen from a distance; soldiers casting lots, the centurion, the women far off; the darkness |
| The burial | Mark 15:42–47; John 19:39–41 | Joseph and Nicodemus carry the wrapped body into a rock-cut tomb with a bench and a rolling stone; the two Marys watch |
| The Sabbath | Matthew 27:62–66 | four soldiers on guard; the seal shown as a cord fixed with clay |
| He is not here | Mark 16:1–8 | the stone rolled back, the young man in white sitting on the right, the three women with spices at sunrise |

| File | Contents |
|---|---|
| `data.js` | The temple platform, walls and gates, the places, the days, labels, and the tour stops (text, day and hour, camera). |
| `terrain.js` | `ground(x, n)`: the valleys, the western hill, the temple ridge and the Mount of Olives, and level pads under buildings. |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text. |
| `main.js` | Sky and time of day, the city and its buildings, people and their clothes, walks and poses, the week's choreography, things carried, crowds, labels, camera tour and UI. |

### Solomon's Temple (`solomons-temple/`)

This is a tour of Solomon's temple being built on Mount Moriah, in the order of 1 Kings 6–7, with what 2 Chronicles 3–4 adds. The hilltop starts bare. At each of the 21 stops the next part goes up: the foundation, the stone house course by course, the porch, the windows, the side chambers and their winding stair, the cedar roof; then inside, the cedar lining, the inner sanctuary, the gold overlay, the cherubim, the carvings and the doors; the inner court and the great court; and Hiram's bronze work (Jachin and Boaz, the Sea, the ten stands and basins, the bronze altar), the gold furnishings, and the house finished in seven years. The finale is God's word to Solomon in 1 Kings 6:13, circling the finished temple. A few builders and priests stand still to show the scale; the story of the dedication (1 Kings 8) isn't told.

For the stops inside, the south walls, the south side chambers and the roofs fade out; at the winding stair only the chambers' outer wall does. The cedar lining turns to gold as it is overlaid. The temple stands on the hilltop of the Holy Week animation's Jerusalem (the same topography, in cubits), with the City of David sketched on the ridge to the south: houses and a wall, nothing more. Solomon's palace (7:1–12) isn't shown.

#### Bible versions

The porch is the portico (NIV) or vestibule (ESV); the main room is the main hall (NIV), the nave (ESV) or the temple (KJV); the inner sanctuary is the oracle (KJV); the cypress is juniper (NASB, NIV) or fir (KJV); Hiram is Huram and Jachin is Jakin (NIV); the stands are bases and the basins lavers (KJV); the Sea is a molten sea (KJV) and its oxen bulls (NIV). In Spanish the Sea is "la fuente" in the NVI, the stands are bases (NVI) or basas, and the RVA's cypress is haya; in French the Sea is la cuve (SG21, BDS) or la mer, the stands are chariots in the BDS, and bronze is airain in the NEG1979 and LSG. The SG21 and BDS turn the cubits into metres, a cubit to half a metre; the notes keep cubits. Where the RVA opens a chapter in capitals ("Y COMENZO", "HIZO", "Y FUÉ"), the quotation starts after them.

Quotations were copied from Bible Gateway in all twelve versions, and a script checked every quoted phrase against the passages: 276 phrases, all found.

#### Following the text

Everything is built in cubits, one world unit to the cubit (about 45 cm). Where the text gives no size, the notes say so.

| Part | Ref | Modelled |
|---|---|---|
| Foundation | 5:17; 6:37 | great dressed stones under the house, the porch and the pillars, a little above the court |
| The house | 6:2, 7 | 60 × 20 × 30 inside, of stone dressed at the quarry. Wall thickness isn't given: 6 cubits at the foot, as in Ezekiel 41:5, stepping in a cubit at each storey of the side chambers |
| Porch | 6:3; 2 Chronicles 3:4 | 20 × 10, overlaid with gold inside. Kings gives no height; Chronicles has 20 (NASB, NIV, BDS) or 120 (the Hebrew, ESV, KJV); drawn 20. Shown open at the front |
| Windows | 6:4 | the words are uncertain (narrowing frames or lattices); five a side, high in the main room's walls above the side chambers, with stepped frames and a lattice. Their number isn't given |
| Side chambers | 6:5–6, 10 | three storeys, 5, 6 and 7 cubits wide, each 5 high, round the sides and back, their floors on the ledges where the wall steps in. Rooms and the outer wall's thickness (3) aren't given |
| Winding stair | 6:8 | the door on the south (right) side; the word is rare (a winding stair, or trapdoors and ladders); drawn as a winding stair inside the door |
| Roof | 6:9 | cedar beams across the 20 cubits, then planks; flat, no parapet |
| Cedar lining, floor | 6:15, 18 | cedar carved with gourds and open flowers from floor to ceiling; cypress floor |
| Inner sanctuary | 6:16–20 | a 20-cubit cube behind a cedar partition; the ceiling is drawn lower (the floor could have been raised instead), with the space above (2 Chronicles 3:9's upper rooms?) |
| Gold | 6:20–22, 30 | the lining, ceiling, partition and floor overlaid; gold chains across the front of the partition; the altar of cedar overlaid with gold, its size from Ezekiel 41:22 (2 × 2 × 3) |
| Cherubim | 6:23–28; 2 Chronicles 3:13 | olive wood overlaid with gold, 10 high, wings of 5, wall to wall and touching in the middle, standing, facing the main room; their look isn't described |
| Carvings | 6:29 | cherubim, palm trees and open flowers in bands, a cherub between two palms as in Ezekiel 41:18; the layout isn't described |
| Inner doors and veil | 6:31–32; 7:50; 2 Chronicles 3:14 | two doors of olive wood, carved and gilded, on gold hinges, in a five-sided (pointed) frame 4 cubits wide; both the doors (Kings) and the veil (Chronicles) are drawn, the doors open |
| Main doors | 6:33–35 | two doors of cypress, each of two folding leaves, in square olive-wood posts 5 cubits wide (a fourth of the wall); the height (10) is a guess |
| Inner court | 6:36; 2 Chronicles 4:9 | three courses of stone and one of cedar beams; its size isn't given, drawn 200 × 100 (twice the tabernacle's court) |
| Great court | 7:12; 2 Chronicles 4:9 | built the same way round the inner court, with gateways east and south whose doors are overlaid with bronze; size and gates are guesses |
| Jachin and Boaz | 7:13–22 | bronze shafts 18 high and 12 round, freestanding before the porch, Jachin on the south (right); capitals of 5 with a rounded bowl, lattice, seven chains, two rows of 100 pomegranates, and lily work above. 2 Chronicles 3:15's 35 cubits is noted |
| The Sea | 7:23–26, 39 | 10 across, 5 high, brim like a lily, two rows of gourds (ten to a cubit) under the brim, on twelve oxen three facing each way, at the south-east corner |
| Stands and basins | 7:27–39 | 4 × 4 × 3 with panels of lions, oxen and cherubim, four wheels 1½ high, a round band on top; basins 4 across; five on each side of the house |
| Bronze altar | 2 Chronicles 4:1; 1 Kings 8:64 | 20 × 20 × 10 in front of the house; no steps (Exodus 20:26), ledges or horns are described, so none are drawn |
| Gold furnishings | 7:48–50; 2 Chronicles 4:7–8, 19 | ten tables with the bread and ten lampstands, five on each side; sizes aren't given (the tabernacle's table and a seven-branched lampstand) |

| File | Contents |
|---|---|
| `data.js` | The English `TERMS` and materials, the house, porch and court dimensions, where things stand, labels, and the tour stops (text, materials, camera, cutaway). |
| `terrain.js` | `ground(x, n)`: the Holy Week topography in cubits, with the courts levelled. |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text. As in the Tabernacle, some terms carry their article (`{theMainRoom}`), and French `{ofBronze}` its preposition. |
| `main.js` | Scene, stone walls laid course by course, the inside and its gilding, Hiram's bronze work, the gold furnishings, people, the city, labels, camera tour and UI. |

### Ezekiel's Temple (`ezekiels-temple/`)

This is a tour of the temple Ezekiel saw in his vision (Ezekiel 40–42), on "a very high mountain" (40:2). The man "whose appearance was like bronze" leads Ezekiel round with his measuring rod, and each part goes up as he measures it. The 21 stops go: the man, the outer wall, the three outer gates, the outer court with its pavement and thirty chambers, the inner gates, the tables for the burnt offering, the priests' chambers, the inner court and the altar; then the house, from the porch and its columns to the nave, the most holy place, the side chambers, the building to the west, the house's hundred cubits, the carvings and the wooden altar, and the doors; then the holy chambers, and the wall measured all round. The finale is 43:1–5: the glory of the LORD comes in from the east by the east gate and fills the house; Ezekiel falls on his face and is lifted into the inner court.

The two walk between the stops (through gates and up steps; `via` points keep them off the walls), and the man holds out his rod at each stop. For the stops inside the house, its south walls, the south side chambers and the roof fade out. The mountain is not a real place, and there is no city: the "structure like a city" (40:2) is taken to be the temple itself.

#### Bible versions

The rod is a reed (ESV, KJV), a caña (NBLA, RVR1960, RVA) or vara (NVI), a canne (SG21, NEG1979, LSG) or règle (BDS); the guardrooms are alcoves (NIV), side rooms (ESV) or little chambers (KJV); the porch is the portico (NIV) or vestibule (ESV); the nave is the sanctuary (NASB), main hall (NIV) or temple (KJV); the separate area is the temple courtyard (NIV), separate yard (ESV) or separate place (KJV). The KJV's man is like brass, and the RVA's like metal. The NBLA gives metres in brackets after the cubits and the SG21 turns the cubits into metres (a long cubit as half a metre); the notes keep cubits. In 42:16–20 the NASB, KJV, NBLA, RVR1960, RVA, SG21, NEG1979 and LSG have 500 rods a side (the Hebrew); the NIV, ESV, NVI and BDS have 500 cubits (the Greek). The NIV, ESV and BDS give the porch 12 cubits (the Greek), the others 11. Where the RVA opens a chapter in capitals ("METIOME", "LLEVOME"), the quotation starts after them.

Quotations were copied from Bible Gateway in all twelve versions, and a script checked every quoted phrase against the passages: 310 phrases, all found.

#### Following the text

Everything is built in long cubits (40:5), one world unit to the cubit (about 52.5 cm). Ezekiel gives almost no heights; where a size is a guess, the notes say so.

| Part | Ref | Modelled |
|---|---|---|
| Layout | 40:19, 23, 27, 47; 41:13–14; 42:20 | the usual plan: from east to west the outer gate (50), the outer court (100), the inner gate (50), the inner court (100), the house (100) and the building to the west (100) make 500; north to south, gates and courts make 500 the same way. 42:16–20's 500 rods (about 1.6 km) are drawn as 500 cubits |
| Outer wall | 40:5 | a rod thick and a rod high, measured from the outer court; its foot goes down to the ground outside |
| Gates | 40:6–37 | six alike, 50 × 25: the outer threshold (a rod), three guardrooms a side (a rod square, 5 cubits apart, a barrier of a cubit in front), the inner threshold, a porch of 8 with jambs of 2; passage 10 wide; windows into the guardrooms and the porch; palm trees on the jambs and the walls between the guardrooms. The guardrooms are roofed (40:13), the passage open. Heights are guesses (walls 11, jambs 15); 40:14's sixty cubits are uncertain. Outer gates face out, porch inwards, 7 steps; inner gates are turned round, porch towards the outer court, 8 steps. 40:30's porches aren't drawn |
| Levels | 40:22, 26, 31; 41:8 | the outer court 7 steps above the mountain top, the inner court 8 more, the house on a platform a rod high; the step height (½ cubit) is a guess |
| Outer court | 40:17–19 | the pavement along the wall, as wide as the gates are long; thirty chambers in rows of five beside each gate (their size and layout aren't given) |
| Inner court | 40:47 | 100 × 100, on a terrace that also carries the house, its yards and the building to the west; its square is paved paler, with a kerb where it meets the yards, and the man's line goes round it (and round the house's square at 41:13); its wall isn't described, a low one is drawn |
| Tables | 40:38–43 | at the inner north gate: two a side in the porch, two a side outside it, four of cut stone 1½ × 1½ × 1; a chamber for rinsing beside the gate. The hooks are too small to show |
| Priests' chambers | 40:44–46 | beside the north gate facing south and the south gate facing north (the Greek; the Hebrew has singers' chambers and the east gate); size not given |
| Altar | 40:47; 43:13–17 | in the middle of the inner court: base 18 square with a rim, ledges at 16 and 14, the hearth 12 square with four horns, steps on the east |
| Porch | 40:48–49 | 20 × 12 inside (11 in the Hebrew), entrance 14 between jambs of 5 and sidewalls of 3; ten steps (the Greek); two columns beside the jambs, their size a guess; height not given |
| Nave, most holy place | 41:1–4 | 40 × 20 and 20 × 20, walls 6, the dividing wall 2 with an entrance of 6; the height (30) is taken from Solomon's temple. Nothing stands in the most holy place; only the man goes in |
| Side chambers | 41:5–11 | 4 wide at the bottom, the house wall stepping in at each storey (6, 5, 4), three storeys of 30 rooms; outer wall 5 with a door north and south onto a free space of 5 on the platform; a yard of 20 round it. Storey heights (6) are guesses |
| Building to the west | 41:12 | 70 × 90 inside, walls 5; height, roof and doors aren't given (drawn 15 high, roofed, no doors) |
| Roof | not mentioned | drawn flat over the house |
| Panelling, carvings | 41:15–20 | wood from the floor to the windows; cherubim with a man's and a young lion's face between palm trees from the floor to above the entrance; no gold |
| Wooden altar | 41:22 | 3 high, 2 long; its width isn't given (drawn 2) |
| Doors | 41:23–25 | double doors of two folding leaves for the nave and the most holy place, carved; a wooden canopy (or threshold) in front of the porch |
| Holy chambers | 42:1–14 | one reading: north and south of the house, a block 100 long beside the yard and one 50 long outside it, three storeys set back, a passage of 10 between them, a wall of 50, the way in from the east |
| The glory | 43:1–5 | a light coming from the east, in by the east gate and over the altar into the house, which it fills; Ezekiel falls on his face at the gate and is lifted into the inner court |

| File | Contents |
|---|---|
| `data.js` | The English `TERMS`, the levels and the plan's sizes, labels, where the two people stand, and the tour stops (text, camera, cutaway, people). |
| `terrain.js` | `ground(x, n)`: a stylised mountain with a level summit, the courts levelled on it. |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text. As in Solomon's Temple, some terms carry their article (`{theNave}`). |
| `main.js` | Scene, walls laid course by course, the six gates, the courts, the house and its chambers, people and their walks, the glory, labels, camera tour and UI. |

### Paul's First Missionary Journey (`pauls-first-journey/`)

This is a fly-over of Paul and Barnabas's first journey (Acts 13–14), on a map of the real land and sea. The 18 stops go: Antioch, where they are sent off; down to Seleucia; by sea to Salamis; across Cyprus to Paphos and the proconsul; by sea to Perga; over the Taurus (2 Corinthians 11:26); Pisidian Antioch and Paul's turn to the Gentiles; Iconium; Lystra, where the crowd takes them for gods and Paul is stoned; Derbe; back through Lystra and Iconium strengthening the disciples; elders in every church at Pisidian Antioch; the churches of Galatia (Galatians 4:13); Perga and Attalia; and by sea home to Antioch. The intro is 13:2 and the finale 14:27, over the whole route. Notes bring in Acts 4:36, 11:26, 12:12, 12:25, 15:36–39, 16:1, Colossians 4:10, 2 Timothy 3:11 and 4:11.

No people are shown. The route is drawn as it is travelled: red on the way out, orange on the way home (beside the outward road where they go back the same way), dashed at sea, with a light at the head of it on land and a ship carrying it over the sea. At each stop the popup gives the distance of that leg, overland and by sea, and the distance so far (about 2,100 km in all).

#### The map

`tools/terrain.py <journey>` downloads Terrarium elevation tiles (Mapzen's open data on AWS, from SRTM, ETOPO1 and GMTED) and resamples them onto a flat map in kilometres centred on 36.6° N, 33.2° E: `terrain.png` covers the journey at 0.5 km per pixel (heights as 16 bits in red and green, lakes in blue) and `terrain-wide.png` the lands round about at 3 km. Heights are drawn three times higher; the sea floor is flattened. The coastline is today's (the Cilician plain and the river mouths have grown since). Below sea level, ground the sea doesn't reach (the Jordan valley) is drawn at sea level, with its flat water (the Dead Sea, the Sea of Galilee) as lakes. The engine builds a mesh from every other pixel, with colour and an object-space normal map at full resolution, so the relief shows in the lighting.

`tools/route.py <journey>` writes that journey's `route.js`. Acts names the places but not the roads, so the land legs take the least-cost way over `terrain.png` (steep ground costs more, water can't be crossed) through guide points where the usual reconstruction says the road went: the coast road of Cyprus by Kition, Amathus and Kourion; from Perga up the Cestrus valley by Adada and east of Lake Eğirdir. The first journey's sea legs are drawn by hand off the capes and checked against the coastline; the later journeys' take the shortest way through open water (kept a few km off the coasts) through the harbours Acts names, smoothed. The return voyage (14:26) lands at Seleucia, Antioch's port, and goes up the Orontes valley. Rerun both scripts after changing a place or a guide point.

| Place | Where it is drawn |
|---|---|
| Antioch | Antakya, on the Orontes |
| Seleucia | Seleucia Pieria (Çevlik), by the sea |
| Salamis, Paphos | the ancient sites (New Paphos at Kato Paphos) |
| Perga | the site near Aksu, 12 km inland; the voyage lands at the mouth of the Cestrus (Aksu Çayı) |
| Pisidian Antioch | the site by Yalvaç |
| Iconium | Konya |
| Lystra | the mound near Hatunsaray, where an inscription names the colony |
| Derbe | north-east of Karaman, near Kerti Hüyük and Devri Şehri, where inscriptions name it; the exact site is debated |
| Attalia | Antalya |
| Temple of Zeus | outside Lystra (14:13); its site is unknown, so it is drawn by the road |

Towns are not plans of the real towns: a wall where the town had one, houses with tiled roofs and a few public buildings, all much larger than life so they show from a distance. The ship is a small Roman merchantman of the first century (rounded hull, curved sternpost, a square mainsail, an artemon, two steering oars), about twenty times life size; Acts doesn't describe it.

#### Bible versions

Zeus and Hermes are Jupiter and Mercurius in the KJV, Júpiter and Mercurio in the NBLA, RVR1960 and RVA, and Jupiter and Mercure in the NEG1979 and LSG. The proconsul is the deputy (KJV), the gobernador (NVI) and the gouverneur (SG21). Place names follow each version: Antioch in Pisidia (ESV, KJV), Papho and Pamphylia (RVA), Atalía (NVI), Icone (NEG1979, LSG), Pergé, Lystres and Derbé (BDS). Where the RVA opens a chapter in capitals ("Y ACONTECIO"), the quotation starts after them.

Quotations were copied from Bible Gateway in all twelve versions, and a script checked every quoted phrase against the passages: of 240 phrases, 231 match as they stand, and the other nine differ only where speech inside a quotation takes the inner quotation marks (and the NVI's dialogue dash becomes quotation marks).

| File | Contents |
|---|---|
| `data.js` | The map (`MAP`, `OVERVIEW`), the English `TERMS`, `PLACES` (latitude and longitude, town size), other labels (`model` draws a temple or theatre), the intro and finale cards, and the tour stops (text, place on the route, camera bearing, distance and height). |
| `terrain.js` | The projection (`projection(lon0, lat0)`), `loadMap()` for the height maps, and `worldY()` (heights raised, the sea floor flattened). |
| `route.js` | The legs of the journey in plan kilometres, made by `tools/route.py`. |
| `terrain.png`, `terrain-wide.png` | The height maps, made by `tools/terrain.py`. |
| `lang/es.js`, `lang/fr.js` | The Spanish and French text. |
| `journey.js` | The engine all three journeys share (`start({ DATA, LEGS, base, key })`): terrain, sea, towns, the route lines, the ship, labels, the camera tour and UI. |
| `main.js` | Runs `journey.js` with this journey's data. |
| `tools/` | `terrain.py` and `route.py`, for all three journeys (`REGIONS`, `JOURNEYS` and one route function per journey). |

### Paul's Second Missionary Journey (`pauls-second-journey/`)

The first journey's engine and tools, on a larger map (1 km per pixel, from Greece to Jerusalem; the third journey uses it too). The 18 stops follow Acts 15:36–18:22: Paul chooses Silas at Antioch; through Syria and Cilicia (by the Syrian Gates, Tarsus and the Cilician Gates); Timothy at Lystra; the churches strengthened; forbidden to speak in Asia; not into Bithynia; the man of Macedonia at Troas; by Samothrace to Neapolis; Lydia, and the jailer, at Philippi; Thessalonica (by Amphipolis and Apollonia on the Via Egnatia); Berea; Athens; the altar "to an unknown god" at the Areopagus; Corinth (18:9–10); Cenchrea; Ephesus; and home to Antioch by Caesarea and Jerusalem (18:22). The intro is 15:36 and the finale 1 Thessalonians 1:8, written from Corinth.

The route is a guess where Acts is silent: from Pisidian Antioch north through Phrygia to the border of Bithynia (near Dorylaeum) and west through Mysia to Troas (16:6–8); from Berea to the coast near Pydna and by sea round Euboea to Piraeus (17:14–15, "as far as the sea" taken as a voyage); from Athens by Megara to Corinth; from Jerusalem to Antioch by the coast road. 18:22's "went up" is taken as Jerusalem.

### Paul's Third Missionary Journey (`pauls-third-journey/`)

The same engine, on the second journey's map. The 18 stops follow Acts 18:23–21:17 with the letters: from Antioch (18:23); through Galatia, with the collection (1 Corinthians 16:1); Ephesus (19:1); "all Asia heard" (19:10), with the cities of Asia and of Revelation 2–3 labelled; the riot in the theatre (19:29), with the theatre drawn; Troas (2 Corinthians 2:12); Titus in Macedonia (2 Corinthians 7:6); Greece (20:2); the gift for Jerusalem (Romans 15:26); back through Macedonia (20:3); breaking bread at Troas (20:7); on foot to Assos (20:13); by Mitylene, Chios and Samos (20:15); the farewell at Miletus (20:38); Cos, Rhodes and Patara (21:1); past Cyprus to Tyre (21:3); Agabus at Caesarea (21:13); and Jerusalem (21:17). The intro is 20:24 and the finale 21:19.

The road to Ephesus goes over the uplands by Apamea and Philadelphia, north of Laodicea and Colossae, which Paul hadn't visited (Colossians 2:1); Ephesus to Troas by Smyrna and Pergamum; Macedonia to Corinth by the land road through Thessaly; Tyre to Ptolemais by sea and on to Caesarea by land (21:7–8).

#### Bible versions (second and third journeys)

The quotations were generated from the Bible Gateway text (with the inner quotation marks, the RVA's chapter openings and the small capitals of "TO AN UNKNOWN GOD" handled as in the other animations), and a script checked every phrase against the passages: 480 phrases, all found. Place names follow each version: Cenchreae (NIV, ESV), Cencreas (NVI, RVA), Kos (NIV), Coos (KJV, RVA), Rhodas, Assón, Chîo and Samo (RVA), Ptolemaïs (NEG1979), Chio (BDS). Artemis is Diana in the KJV, NBLA, RVR1960, RVA, NEG1979 and LSG, Artemisa in the NVI; the Areopagus is Mars' Hill in the KJV.

### Adding a new animation

Create a sibling folder with its own `index.html`, then add a card for it to the root `index.html`. Put the card's title and blurb in `UI` in `i18n.js` (for every language) and tag them with `data-i18n`.
