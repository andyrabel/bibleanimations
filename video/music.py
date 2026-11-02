"""Soft ambient pad for the video soundtrack, synthesised so there's nothing to license.

A slow I-vi-IV-V progression in D with gentle attacks, a sparse bell melody and a
convolution reverb. One loop is rendered (the reverb wraps round, so it tiles seamlessly)
and repeated to the requested length.
"""
import wave

import numpy as np

SR = 44100
CHORD_SEC = 8.0
# MIDI notes: low root, then a close voicing an octave or two up.
CHORDS = [
    [50, 62, 66, 69, 74],  # D
    [47, 59, 62, 66, 71],  # Bm
    [43, 59, 62, 67, 71],  # G
    [45, 57, 61, 64, 69],  # A
    [50, 62, 66, 69, 76],  # D (add 9 on top)
    [47, 59, 62, 66, 69],  # Bm7
    [43, 55, 62, 67, 71],  # G
    [45, 57, 62, 64, 69],  # Asus4
]
BELLS = [74, 76, 78, 81, 83, 86]  # D major pentatonic, above the pad


def hz(m):
    return 440.0 * 2 ** ((m - 69) / 12)


def envelope(n, attack, release):
    t = np.arange(n) / SR
    env = np.minimum(1, t / attack) * np.minimum(1, (n / SR - t) / release)
    return np.clip(env, 0, 1) ** 2


def pad_loop(seed=7):
    rng = np.random.default_rng(seed)
    n_chord = int(CHORD_SEC * SR)
    overlap = int(3.0 * SR)  # chords cross-fade over 3 s
    total = n_chord * len(CHORDS)
    out = np.zeros((total, 2))
    for c, notes in enumerate(CHORDS):
        n = n_chord + overlap
        t = np.arange(n) / SR
        env = envelope(n, 3.0, 3.0)
        for k, m in enumerate(notes):
            f = hz(m)
            gain = 0.16 if k == 0 else 0.07
            for side, detune in ((0, -0.12), (1, 0.12)):
                ph = rng.uniform(0, 2 * np.pi)
                # A sine with a touch of its octave, slowly breathing.
                v = np.sin(2 * np.pi * (f + detune) * t + ph) + 0.18 * np.sin(4 * np.pi * (f + detune) * t + ph)
                v *= 1 + 0.15 * np.sin(2 * np.pi * rng.uniform(0.05, 0.12) * t + ph)
                start = c * n_chord - overlap // 2
                idx = (np.arange(n) + start) % total
                out[idx, side] += v * env * gain
        # A few soft bell notes per chord.
        for _ in range(rng.integers(1, 4)):
            m = rng.choice([b for b in BELLS if (b - notes[0]) % 12 in (0, 2, 4, 7, 9)] or BELLS)
            at = c * n_chord + int(rng.uniform(0.5, CHORD_SEC - 1) * SR)
            nb = int(4.5 * SR)
            tb = np.arange(nb) / SR
            v = np.sin(2 * np.pi * hz(m) * tb) * np.exp(-tb * 1.1) * np.minimum(1, tb / 0.02) * 0.05
            pan = rng.uniform(0.3, 0.7)
            idx = (np.arange(nb) + at) % total
            out[idx, 0] += v * (1 - pan)
            out[idx, 1] += v * pan

    # Reverb (circular convolution with decaying stereo noise) and a soft low-pass,
    # both in the frequency domain so the loop stays seamless.
    ir_n = int(3.5 * SR)
    tir = np.arange(ir_n) / SR
    freqs = np.fft.rfftfreq(total, 1 / SR)
    lowpass = 1 / (1 + (freqs / 2500) ** 2)
    for side in (0, 1):
        ir = rng.standard_normal(ir_n) * np.exp(-tir * 2.2)
        ir[0] = 0
        ir /= np.sqrt(np.sum(ir ** 2))
        irf = np.zeros(total)
        irf[:ir_n] = ir
        spec = np.fft.rfft(out[:, side])
        out[:, side] = np.fft.irfft(spec * (0.55 + 0.6 * np.fft.rfft(irf)) * lowpass, total)
    return out / np.max(np.abs(out)) * 0.8


def write_music(path, seconds):
    loop = pad_loop()
    reps = int(np.ceil(seconds * SR / len(loop)))
    audio = np.tile(loop, (reps, 1))[: int(seconds * SR)]
    pcm = (audio * 32767).astype('<i2')
    with wave.open(str(path), 'wb') as w:
        w.setnchannels(2)
        w.setsampwidth(2)
        w.setframerate(SR)
        w.writeframes(pcm.tobytes())


if __name__ == '__main__':
    import sys
    write_music(sys.argv[1] if len(sys.argv) > 1 else 'music.wav', float(sys.argv[2]) if len(sys.argv) > 2 else 60)
