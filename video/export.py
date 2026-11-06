"""Export a tour (Nehemiah's Wall by default) to an MP4 with narration and background music.

    python3 video/export.py                       # KJV, 1080p30, Ryan (en-GB) narrating
    python3 video/export.py --seconds 40          # quick preview of the first 40 s
    python3 video/export.py --tour tabernacle     # another tour that has a record mode

Steps: serve the repo, open <tour>/?record in headless Chromium, read the narration
script from the page, synthesise each clip with edge-tts (cached in video/out/tts), hand the
clip lengths back so each stop holds long enough, then step the tour one frame at a time,
screenshotting into ffmpeg. Finally the narration is laid over the music at the cue times
the page reported, with the music ducked under the voice.
"""
import argparse
import asyncio
import functools
import hashlib
import http.server
import json
import math
import os
import re
import subprocess
import sys
import threading
import time
import wave
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path

import edge_tts
import imageio_ffmpeg
from playwright.sync_api import sync_playwright

from music import write_music

ROOT = Path(__file__).resolve().parent.parent
FFMPEG = imageio_ffmpeg.get_ffmpeg_exe()
# Under WSL, Mesa's d3d12 driver reaches the real GPU; everything else falls back to software.
GPU_ARGS = ['--use-gl=angle', '--use-angle=gl', '--enable-gpu', '--ignore-gpu-blocklist']


def serve():
    handler = functools.partial(QuietHandler, directory=str(ROOT))
    httpd = http.server.ThreadingHTTPServer(('127.0.0.1', 0), handler)
    threading.Thread(target=httpd.serve_forever, daemon=True).start()
    return httpd.server_address[1]


class QuietHandler(http.server.SimpleHTTPRequestHandler):
    def log_message(self, *args):
        pass


def wav_seconds(path):
    with wave.open(str(path)) as w:
        return w.getnframes() / w.getframerate()


def synthesise(script, voice, rate, cache):
    """Returns {cue id: wav path}, synthesising only clips not already cached."""
    cache.mkdir(parents=True, exist_ok=True)
    clips = {}

    async def one(item):
        key = hashlib.sha1(f'{voice}|{rate}|{item["text"]}'.encode()).hexdigest()[:16]
        wav = cache / f'{key}.wav'
        if not wav.exists():
            mp3 = cache / f'{key}.mp3'
            await edge_tts.Communicate(item['text'], voice, rate=rate).save(str(mp3))
            subprocess.run([FFMPEG, '-v', 'error', '-y', '-i', mp3, '-ar', '44100', '-ac', '2', wav], check=True)
            mp3.unlink()
        clips[item['id']] = wav

    async def run():
        sem = asyncio.Semaphore(4)

        async def guarded(item):
            async with sem:
                await one(item)

        await asyncio.gather(*(guarded(i) for i in script))

    # Playwright's sync API owns this thread's event loop, so run edge-tts on another.
    with ThreadPoolExecutor(1) as pool:
        pool.submit(asyncio.run, run()).result()
    return clips


def record(url, out, fps, size, max_seconds, gl, setup):
    """Renders the tour to `out` (video only). Returns the cue list [{id, t}] and duration."""
    w, h = size
    args = GPU_ARGS if gl == 'gpu' else []
    env = {**os.environ, 'GALLIUM_DRIVER': 'd3d12'} if gl == 'gpu' else None
    enc = subprocess.Popen(
        [FFMPEG, '-v', 'error', '-y', '-f', 'image2pipe', '-framerate', str(fps), '-c:v', 'mjpeg', '-i', '-',
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p', str(out)],
        stdin=subprocess.PIPE)
    cues, t, frames = [], 0.0, 0
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True, args=args, env=env)
        page = browser.new_page(viewport={'width': w, 'height': h}, device_scale_factor=1)
        page.on('pageerror', lambda e: print('page error:', e, file=sys.stderr))
        page.goto(url)
        page.wait_for_function('window.__record', timeout=120000)
        page.evaluate('document.fonts.ready')
        renderer = page.evaluate("""(() => {
            const gl = document.createElement('canvas').getContext('webgl2');
            return gl.getParameter(gl.getExtension('WEBGL_debug_renderer_info').UNMASKED_RENDERER_WEBGL);
        })()""")
        print('renderer:', renderer)
        if any(s in renderer for s in ('SwiftShader', 'llvmpipe')):
            print('  (software rendering: expect about 1 s per frame)')

        page.evaluate('d => __record.start(d)', setup(page.evaluate('__record.script()')))
        started = time.time()
        dt = 1 / fps
        while True:
            res = page.evaluate('dt => __record.step(dt)', dt)
            enc.stdin.write(page.screenshot(type='jpeg', quality=94))
            frames += 1
            t = res['t']
            for c in res['cues']:
                print(f'  {t:7.1f}s  {c["id"]}')
            cues += res['cues']
            if frames % (fps * 10) == 0:
                rate = frames / (time.time() - started)
                print(f'  {t:7.1f}s video  ({rate:.1f} frames/s)')
            if res['done'] or (max_seconds and t >= max_seconds):
                break
        browser.close()
    enc.stdin.close()
    enc.wait()
    return cues, frames / fps


def mix(video, clips, cues, music, music_volume, duration, out):
    cues = [c for c in cues if c['id'] in clips and c['t'] < duration]
    inputs = ['-i', str(video), '-stream_loop', '-1', '-i', str(music)]
    graph = []
    for k, c in enumerate(cues):
        inputs += ['-i', str(clips[c['id']])]
        ms = int(c['t'] * 1000)
        graph.append(f'[{k + 2}:a]adelay={ms}|{ms}[n{k}]')
    fade_out = max(0, duration - 3)
    if cues:
        graph.append(''.join(f'[n{k}]' for k in range(len(cues))) + f'amix=inputs={len(cues)}:normalize=0,'
                     f'apad=whole_dur={duration},loudnorm=I=-16:TP=-1.5,asplit[voice][key]')
        graph.append(f'[1:a]atrim=0:{duration},volume={music_volume}[mus]')
        graph.append('[mus][key]sidechaincompress=threshold=0.015:ratio=5:attack=150:release=1500[ducked]')
        graph.append('[ducked][voice]amix=inputs=2:normalize=0[a0]')
    else:
        graph.append(f'[1:a]atrim=0:{duration},volume={music_volume}[a0]')
    graph.append(f'[a0]afade=t=in:d=2,afade=t=out:st={fade_out}:d=3[a]')
    graph.append(f'[0:v]fade=t=in:d=1.5,fade=t=out:st={fade_out}:d=3[v]')
    subprocess.run(
        [FFMPEG, '-v', 'error', '-y', *inputs, '-filter_complex', ';'.join(graph), '-map', '[v]', '-map', '[a]',
         '-c:v', 'libx264', '-preset', 'medium', '-crf', '18', '-pix_fmt', 'yuv420p',
         '-c:a', 'aac', '-b:a', '192k', '-t', str(duration), '-movflags', '+faststart', str(out)],
        check=True)


def stamp(t):
    t = int(t)
    return f'{t // 3600}:{t // 60 % 60:02d}:{t % 60:02d}' if t >= 3600 else f'{t // 60}:{t % 60:02d}'


def write_chapters(script, cues, duration, out):
    """YouTube chapters, one per cue: `m:ss Title (ref)`, starting at 0:00, each ≥ 10 s."""
    lines = {s['id']: s for s in script}
    chapters = []
    for c in cues:
        line = lines.get(c['id'])
        if not line or c['t'] >= duration:
            continue
        # The cue is when the voice starts; the chapter starts a moment before, on arrival.
        t = 0 if not chapters else int(c['t'] - 1)
        label = f"{line['title']} ({line['ref']})" if line.get('ref') else line['title']
        if chapters and t - chapters[-1][0] < 10:
            print(f'  chapter "{label}" is under 10 s after the last; YouTube may drop the chapters')
        chapters.append((t, label))
    out.write_text(''.join(f'{stamp(t)} {label}\n' for t, label in chapters))


def srt_time(t):
    ms = round(t * 1000)
    return f'{ms // 3600000:02d}:{ms // 60000 % 60:02d}:{ms // 1000 % 60:02d},{ms % 1000:03d}'


def balanced(words, n):
    """Splits words into n runs of about equal length."""
    target, runs, cur = len(' '.join(words)) / n, [], []
    for k, w in enumerate(words):
        cur.append(w)
        left = len(words) - k - 1
        if len(runs) < n - 1 and left and len(' '.join(cur)) >= target * 0.92:
            runs.append(' '.join(cur))
            cur = []
    return runs + [' '.join(cur)]


def caption_chunks(text, limit=80):
    """Splits a line into captions of about two 42-character lines: sentences (and clauses after
    ; or :) are packed together while they fit; a longer one is cut into even pieces."""
    sentences = re.findall(r'.+?(?:[.?!;:](?=\s)|$)', text.strip())
    chunks, cur = [], ''
    for s in (x.strip() for x in sentences):
        if len(s) > limit:
            if cur:
                chunks.append(cur)
                cur = ''
            chunks += balanced(s.split(), math.ceil(len(s) / limit))
        elif cur and len(cur) + 1 + len(s) > limit:
            chunks.append(cur)
            cur = s
        else:
            cur = f'{cur} {s}' if cur else s
    return chunks + ([cur] if cur else [])


def wrap2(chunk, width=42):
    if len(chunk) <= width:
        return chunk
    words = chunk.split()
    best = min(range(1, len(words)), key=lambda k: abs(len(' '.join(words[:k])) - len(' '.join(words[k:]))))
    return ' '.join(words[:best]) + '\n' + ' '.join(words[best:])


def write_captions(script, cues, lengths, duration, out):
    """SRT of the narration: each clip split into short captions, timed by their share of its characters."""
    lines = {s['id']: s['text'] for s in script}
    entries = []
    for c in cues:
        if c['id'] not in lines or c['id'] not in lengths or c['t'] >= duration:
            continue
        chunks = caption_chunks(lines[c['id']])
        total, t = sum(len(x) for x in chunks), c['t']
        for x in chunks:
            d = lengths[c['id']] * len(x) / total
            entries.append((t, min(t + d, duration), wrap2(x)))
            t += d
    out.write_text(''.join(f'{k}\n{srt_time(a)} --> {srt_time(b)}\n{x}\n\n'
                           for k, (a, b, x) in enumerate(entries, 1)))


def main():
    ap = argparse.ArgumentParser(description=__doc__, formatter_class=argparse.RawDescriptionHelpFormatter)
    ap.add_argument('--tour', default='nehemiahs-wall',
                    help='tour folder with a record mode (nehemiahs-wall, tabernacle, pauls-first-journey)')
    ap.add_argument('--version', default='kjv', help='Bible version key (nasb, niv, esv, kjv)')
    ap.add_argument('--voice', default='en-GB-RyanNeural', help='edge-tts voice (edge-tts --list-voices)')
    ap.add_argument('--rate', default='-10%', help='speaking rate, e.g. -10%%')
    ap.add_argument('--no-narration', action='store_true')
    ap.add_argument('--music', help='audio file to use instead of the generated pad, or "none"')
    ap.add_argument('--music-volume', type=float, default=0.22)
    ap.add_argument('--fps', type=int, default=30)
    ap.add_argument('--size', default='1920x1080')
    ap.add_argument('--seconds', type=float, help='stop after this much video (for previews)')
    ap.add_argument('--gl', choices=['gpu', 'software'], default='gpu')
    ap.add_argument('--out', type=Path)
    a = ap.parse_args()

    outdir = ROOT / 'video' / 'out'
    outdir.mkdir(parents=True, exist_ok=True)
    if not (ROOT / a.tour / 'index.html').exists():
        ap.error(f'no tour folder {a.tour!r}')
    out = a.out or outdir / f'{a.tour}-{a.version}.mp4'
    # Intermediates are named after the output, so two exports can run side by side.
    stem = out.with_suffix('')
    silent = Path(f'{stem}.frames.mp4')
    size = tuple(int(v) for v in a.size.split('x'))
    port = serve()
    url = f'http://127.0.0.1:{port}/{a.tour}/?record&version={a.version}'

    clips, lengths, script = {}, {}, []

    def setup(lines):
        script.extend(lines)
        Path(f'{stem}.script.json').write_text(json.dumps(script, indent=2, ensure_ascii=False))
        if a.no_narration:
            return {}
        print(f'narration: {len(script)} clips, voice {a.voice}')
        clips.update(synthesise(script, a.voice, a.rate, outdir / 'tts'))
        lengths.update({k: wav_seconds(v) for k, v in clips.items()})
        return lengths

    print('recording', url)
    cues, duration = record(url, silent, a.fps, size, a.seconds, a.gl, setup)
    print(f'recorded {duration:.1f}s')
    Path(f'{stem}.cues.json').write_text(json.dumps(cues, indent=2))
    write_chapters(script, cues, duration, Path(f'{stem}.chapters.txt'))
    if lengths:
        write_captions(script, cues, lengths, duration, Path(f'{stem}.srt'))

    if a.music == 'none':
        music = Path(f'{stem}.silence.wav')
        subprocess.run([FFMPEG, '-v', 'error', '-y', '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo',
                        '-t', '1', music], check=True)
    elif a.music:
        music = Path(a.music)
    else:
        music = Path(f'{stem}.music.wav')
        write_music(music, duration + 1)
    mix(silent, clips, cues, music, a.music_volume, duration, out)
    print('wrote', out)
    for x in ('chapters.txt', 'srt'):
        if Path(f'{stem}.{x}').exists():
            print('wrote', Path(f'{stem}.{x}'))


if __name__ == '__main__':
    main()
