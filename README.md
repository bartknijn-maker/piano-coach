# 🎹 Piano Coach

A self-hosted, single-file piano learning web app. MIDI keyboard input, 36+ songs, 75+ learning modes, AI tutor, and complete music theory curriculum (45 audio lessons).

**Live app**: [open here](./index.html)

## What's inside

- **🎹 Player**: MIDI keyboard input (Web MIDI API), wait mode, hand isolation, sections, auto-split, TV mode
- **📜 Sight Reading**: 4 difficulty levels + sequence mode
- **🏋 Gym Mode**: 45 audio theory lessons (NL TTS, ~130 min content) covering everything from intervals to jazz harmony to counterpoint
- **🎷 Improv Coach**: 5-level guided improvisation training
- **🎭 Stage Mode**: Performance simulation with audience ambient + countdown
- **🔍 Self-Review**: Auto-recorded sessions with mistake heatmap per measure
- **🎚 Velocity Coach**: Dynamics analysis + real-time meter
- **✌ Two-Hand Drills**: Polyrhythm + independence training
- **💪 Etudes Library**: Hanon/scales/arpeggios with auto tempo progression
- **🧭 Smart Coach**: Daily personalized 25-30 min session
- **📈 Practice Analytics**: Time-of-day analysis, productivity patterns, auto-insights
- **🧠 Deep Insights**: Rule-based long-term analysis with predictions
- **💬 AI Tutor**: Chat interface with data-aware answers
- **🎯 Goal-Based Curriculum**: Week-by-week learning plans
- **📅 Practice Calendar**: Smart scheduling with mastery decay
- **🤝 Share with Coach**: URL-based collaboration (no backend)
- **☁ Cloud Sync**: Optional Supabase multi-device sync
- **🖐 Smart Fingering**: 4 progressive disclosure modes
- **🎧 Listen-Along**: YouTube/Spotify embed alongside MIDI
- **🔄 Reharmonization Drills**: Modal interchange / secondary dominants / tritone subs
- ...and 60+ more features

## How to use

### Online (GitHub Pages)
Open the deployed URL on any device with a MIDI keyboard (or use the on-screen touch piano).

### Locally
1. Clone this repo
2. Open `index.html` in Chrome/Edge (need Web MIDI API support)
3. Or run a local server: `python -m http.server 3457`

## Architecture

- **Single HTML file** (~1MB) — no build step, no framework
- **One CDN dependency**: `@tonejs/midi` for MIDI parsing
- **localStorage** for all persistence
- **Optional Supabase sync** for multi-device (free tier)
- **Service Worker** for offline PWA install

## Browser support

Best on Chrome/Edge desktop (Web MIDI API). Works on mobile via touch piano. Safari has limited Web MIDI but other features work.

## License

Personal project. MIDI files in `songs/` are from public sources (piano-midi.de, bitmidi.com) — see `songs/README.md` for sources per file.
