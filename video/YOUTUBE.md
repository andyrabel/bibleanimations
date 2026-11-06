# Uploading a tour video to YouTube

Channel: **Old Family Bible**. Playlist for every tour: **Bible Tours in 3D**.
The first upload was Nehemiah's Wall (KJV), made with `video/export.py`.

## Details

- **Title** (≤ 100 chars, aim for about 70): `<Tour> Rebuilt in 3D | <what the viewer sees> (<Book ch>, <VERSION>)`,
  e.g. `Nehemiah's Wall Rebuilt in 3D | Every Gate of Nehemiah 3 (KJV)`.
  For Paul's journeys (fly-overs, nothing is rebuilt): `<Tour> in 3D | <from> to <to> (<Book chs>, <VERSION>)`,
  e.g. `Paul's First Missionary Journey in 3D | Cyprus to Galatia (Acts 13–14, KJV)`; thumbnail subtitle `In 3D · <Book chs>`,
  over the finished route (the finale overview with the UI hidden) rather than the tour's still.
- **Description**, in this order:
  1. Two or three sentences: what the viewer flies through, named the way the text names it (gates, rooms,
     garments), and the rule that only what the text mentions is modelled.
  2. `▶ Explore it yourself, interactive and free, in English, Spanish and French:` + the tour's URL
     (`https://bibletours3d.org/<folder>/`), then a line naming the other tours, with `https://bibletours3d.org/`.
  3. `Chapters`: see below. Keep a blank line before the list and start it with `0:00`; each chapter must
     last at least 10 s.
  4. Scripture credit. KJV is public domain. Any other version needs that version's copyright notice from
     `VERSIONS` in `i18n.js` (NASB and NBLA also need their links).
  5. A note on sources and guesses (from the README), then 3 hashtags (`#<Book> #BibleStudy #<Place>`).
- **Thumbnail:** 1280×720 JPEG under 2 MB. Crop the tour's still in `images/` (they are 1280×800) to 16:9
  and put the tour's name on it in large serif type, light text with a dark outline over a dark gradient
  on the left, plus a smaller gold subtitle (`Rebuilt in 3D · <Book ch>`). A frame with no text gets fewer clicks.
- **Playlist:** Bible Tours in 3D.
- **Audience:** *No, it's not made for kids.* "Made for kids" turns off comments, the notification bell,
  end screens and most recommendations.
- **Show more:** Altered or synthetic content: **No** (an animation with a narrator reading Scripture
  doesn't need the disclosure). Category: Education. Language: the version's language. Comments on.
  Tags: the book and chapter, the main places/objects, the version, Bible study, Bible animation, 3D Bible,
  Sunday school, biblical archaeology (where it fits).

## Chapters

One chapter per tour stop, at the moment its narration starts, titled
`<stop title in that version> (<ref>)`, with `0:00` for the intro card (its ref) and the finale last.

`export.py` writes this list next to the MP4 as `<name>.chapters.txt`, ready to paste: take it from
the export you are uploading, because changing the code shifts the timings. (For an MP4 exported
before that existed, find the speech onsets in its audio, i.e. energy above the music after ≥ 1.5 s of
quiet, and match them to the stops in order.)

## Subtitles

Upload `<name>.srt` (also written by `export.py`) under **Subtitles → Add language → Upload file →
With timing**. It's the exact narration, so it beats YouTube's automatic captions.

## Video elements

- **End screen:** it needs at least one video or playlist element. Use a **Playlist** element (Bible Tours
  in 3D) plus **Subscribe**. Start both after the finale narration ends (about 10 s before the end), so they
  don't cover the closing verse, and keep them clear of the finale card.
- **Cards:** skip them. Links to outside websites need the YouTube Partner Program; the description
  link does that job.

## Visibility

Public.
