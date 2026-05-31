# Piano Coach — Handover Document

**Datum**: 2026-05-27
**Versie bij handover**: v0.83
**Auteur**: Bart Knijnenberg (i.s.m. Claude)
**Doel**: Iedereen die deze app overneemt of voortzet kan binnen 30 minuten oppakken waar gestopt is.

---

## 🎯 TL;DR

Een **self-hosted piano-leerplatform** als één single-file HTML-app (~1MB). Web MIDI API + Web Audio + Web Speech Recognition + Speech Synthesis. 83+ versies, 60+ feature modes, 45 audio theorie-lessen, 36 MIDI-stukken, AI Tutor, Smart Coach, Cloud Sync via Supabase, Inspiration Layer met confetti + pianist personas.

**Geen build step**. Geen frameworks. Vanilla JS. Eén CDN-dependency (`@tonejs/midi`). Werkt offline.

---

## 🌐 Live URLs

- **Production**: https://bartknijn-maker.github.io/piano-coach/
- **GitHub repo**: https://github.com/bartknijn-maker/piano-coach (public)
- **Lokaal dev**: http://localhost:3457 (via `python -m http.server 3457`)

### Test URLs
- `?test=1` — basic self-test banner (79 checks: buttons + globals + functies + APIs)
- `?test=2` — extended test (modal smoke tests + storage roundtrip + theory integrity)

---

## ⚡ Quick Start (5 min)

```bash
# 1. Clone
git clone https://github.com/bartknijn-maker/piano-coach.git
cd piano-coach

# 2. Run lokaal (Python ingebouwd)
python -m http.server 3457

# 3. Open in browser
# http://localhost:3457

# 4. Hard refresh ⟶ Ctrl+Shift+R (om SW-cache te omzeilen)
```

**Wijzigingen maken**:
1. Edit `index.html` (alles zit erin)
2. Test in browser
3. Run `?test=1` om geen handlers te breken
4. Commit + push → GitHub Pages rebuildt in ~30-60 sec

---

## 🛠 Tech Stack & Hard Constraints

### Wat het gebruikt
- **HTML5 single file** — `index.html` is ~1MB met embedded CSS + JS
- **Vanilla JavaScript** (ES2020+) — geen TypeScript, geen modules, geen framework
- **CDN**: `@tonejs/midi@2.0.28` voor MIDI-parsing (enige externe lib)
- **Browser APIs**:
  - Web MIDI API (Chrome/Edge — niet iOS Safari)
  - Web Audio API (alle browsers)
  - Web Speech Recognition (Chrome/Edge voor voice commands + journal)
  - Web Speech Synthesis (alle browsers voor TTS in Gym mode)
  - localStorage (single source of truth voor user data)
  - Service Worker (momenteel **uitgeschakeld** wegens cache-conflicts)
  - Wake Lock API (Gym mode op mobiel)
- **MIDI files**: 36 stukken in `songs/*.mid` van public-domain bronnen (piano-midi.de, bitmidi)

### Wat het NIET gebruikt (bewuste keuze)
- ❌ Build step (geen webpack, vite, esbuild)
- ❌ Framework (React, Vue, Svelte)
- ❌ Backend behalve optionele Supabase voor sync
- ❌ TypeScript (zou een build vereisen)
- ❌ npm dependencies (alleen CDN)

### Waarom single-file?
- Eén bestand = trivial te deployen, hosten, delen
- Iedereen kan in 1 view zien hoe alles werkt
- Geen tooling-rot na 2 jaar inactiviteit
- Werkt offline na eerste load

---

## 🏗 Architecture Overview

### Het bestand is in lagen gestructureerd
1. **`<head>`** (regels 1-30): meta, title, manifest, Midi.js CDN
2. **`<style>`** (regels 30-3300): alle CSS
3. **HTML body** (regels 3300-8000): controls, modals (33+), keyboard, canvas
4. **`<script>` inline** (regels 8000-23500): alle JS

### JS-organisatie (chronologisch per versie)
Elke nieuwe versie voegt onderaan code toe via één van deze patronen:

**Pattern A — Hooking bestaande functies:**
```js
const _origFunctionName = functionName;
functionName = function() {
  _origFunctionName();
  // nieuwe gedrag
};
```

**Pattern B — Nieuwe modal + handler:**
```js
document.getElementById('btn-foo').onclick = () => {
  // setup modal data
  document.getElementById('foo-overlay').style.display = 'flex';
};
```

**Pattern C — Achievement registreren:**
```js
ACHIEVEMENTS.push({
  id: 'unique-id', icon: '🎯', label: 'Description',
  cat: 'Practice|Knowledge|Habits',
  test: s => /* boolean condition over loadStore() */
});
```

### State management
**Geen** state-library. Globals:
- `state` — actieve song, songTime, playing, waitMode, loop, hand-mode
- `loadStore()/saveStore(obj)` — wrapper over `localStorage['piano-store']`

`store` is een JSON object met persistent data. Top-level keys:
```
{
  xp, streak, sessions, recordings, songStats, songPrefs,
  goals, calendarPlan, journal, gymProgress, theoryQuiz,
  inspirationMilestones, activePersona, sightPerNote,
  mistakeHeatmaps, etudes, memorization, twohandResults,
  fingeringMode, pomodoro, timeLog, ...
}
```

### Compact Topbar architecture (v0.74)
69 oorspronkelijke buttons in `<div class="controls row2">` worden gehide met `.feature-grouped` CSS class. Een nieuwe `.compact-topbar` wordt bovenaan ingevoegd door `buildCompactTopbar()` met **7 categorie-dropdowns**:
- 🎹 Practice / 📚 Learn / 🎭 Perform / 📊 Analyze / 🗓 Plan / 🛠 Tools / ⚙ Settings

Elke dropdown-item triggert `document.getElementById(originalBtnId).click()` — originele handlers blijven werken.

**Player-essentials** blijven zichtbaar in de oude topbar:
- btn-play, btn-pause, btn-restart, btn-wait
- btn-loop-*, btn-section-*, btn-tv
- btn-recorder-*

---

## 📁 File Structure

```
Piano/
├── index.html                    # 1 MB — alles
├── songs/
│   ├── *.mid                    # 36 MIDI files
│   └── README.md                # bronvermelding per MIDI
├── HANDOVER.md                  # dit document
├── roadmap.md                   # versie-geschiedenis (gedetailleerd)
├── piano-learning-plan.md       # leerplan voor Bart's 7 stukken
└── .git/
```

---

## 📜 Versie Hoogtepunten (v0.1 → v0.83)

Voor volledige changelog: zie `roadmap.md`.

**Foundation (v0.1-v0.20)**: MIDI-verbinding, falling notes, wait mode, 35-songs library, secties, recorder.

**Theory & Practice (v0.21-v0.34)**: Theory quiz, ear training, sight reading, repertoire mastery, gamification (XP/levels/achievements), themes.

**Gym + Smart Coach (v0.35-v0.50)**: 45 audio theorie-lessen, voice commands, smart coach, deep analytics.

**Cloud + Goals (v0.51-v0.60)**: Supabase sync, share via URL, AI tutor, calendar, repertoire mastery sterren.

**UX Overhaul (v0.74)**: Compact topbar + ⌘K command palette + Welcome Hub + tour.

**Stability (v0.76, v0.78)**: Self-test suite + extended test + auto-recovery.

**Polish (v0.79)**: Toast notifications + keyboard cheat-sheet.

**Emotionele laag (v0.80-v0.83)**: Inspiration (50 quotes, 12 stories, 25 mantras, confetti) + Season Recap + Mock Concert (4 venues) + Pianist Personas (6 legendes).

---

## 🔑 Belangrijke functies & globals

### Player core
- `play()`, `pause()`, `restart()` — primaire player controls (regel 3798-3810)
- `loadSong(song)` — laadt MIDI in `state.song`
- `state` — actieve player state (`state.songTime`, `state.playing`, etc.)
- `state.hitMap[note.id]` = `'hit'|'miss'` voor accuracy tracking

### Audio
- `ensureAudio()` → AudioContext singleton
- `scheduleSynthNote(ctx, midi, when, duration, gain)` — schedule een noot
- `playClickNow(freq)` — synth click

### Storage
- `loadStore()` → object
- `saveStore(store)` → void
- `addXP(amount, source)` — XP toevoegen + check level-up

### Coach (v0.40+)
- `generateCoachSession()` — bouwt aanbevolen sessie obv data
- `renderSmartCoach()` — renders Coach modal (v0.74 rename — was `renderCoach`)
- `renderCoach()` — **oude weekly coach panel** (v0.21, andere feature!)

### Achievements
- `ACHIEVEMENTS` — array van `{id, icon, label, cat, test}` objects
- `checkAchievements()` — runs alle tests, persist in `store.unlockedAchievements`

### Diagnostics (v0.76, v0.78)
- `window.runSelfTest()` — 79 sync checks
- `window.runExtendedTest()` — async, met modal smoke tests
- `window.hardResetApp()` — backup localStorage, clear caches+SW, reload
- `window.installAutoRecovery()` — wrap alle btn-* in try/catch

### UX (v0.79)
- `window.toast(title, body, level)` — 4 levels: `success|error|warn|info`
- `window.showToast(title, body, opts)` — backward-compat redirect naar `toast`

### Inspiration (v0.80)
- `PIANO_QUOTES` (50 items), `PRACTICE_MANTRAS` (25), `COMPOSER_STORIES` (12)
- `window.celebrateMilestone({icon, title, narrative})` — confetti + modal
- `window.toggleAtmosphere(enable)` — audio-reactive background

### Personas (v0.83)
- `PIANIST_PERSONAS` (6 items: Gould, Horowitz, Argerich, Lang Lang, Evans, Satie)
- `window.activatePersona(id)` — set actieve persona + floating banner

### Compact Topbar (v0.74)
- `FEATURE_CATEGORIES` — 7 categorieën met features
- `buildCompactTopbar()` — bouwt UI
- `hideOriginalFeatureButtons()` — adds `.feature-grouped` class
- `openCommandPalette()` — Cmd+K

---

## 🧬 Code conventies

### 1. Override pattern voor function extension
```js
const _origFunc = func;
func = function(...args) {
  _origFunc(...args);
  // new behavior
};
```
**Niet** een tweede `function func() {}` declaration — dat shadowt + breekt oude code (we hebben dit 3× moeten fixen, zie "Lessons Learned").

### 2. Unique naming voor nieuwe versies
Als je een functie maakt die per ongeluk al bestaat, **rename met versie-suffix**:
- `renderCoach` (v0.21) vs `renderSmartCoach` (v0.40+)
- `handleVoiceCommand` (v0.21) vs `handleVoiceCommandGym` (v0.41)
- `loadGoals` (v0.20 weekly) vs `loadGoalsV60` (v0.60 curriculum)

### 3. Defensive programming voor mixed data shapes
```js
const items = Array.isArray(goals) ? goals : (goals?.items || []);
for (const goal of items) {
  if (!goal || typeof goal.icon === 'undefined') continue;
  try { /* ... */ } catch (e) { console.warn('skip:', e.message); }
}
```

### 4. CSS class voor hiding ipv inline style
Hide buttons via `.feature-grouped { display: none !important; }`, niet inline `style="display:none"`.

### 5. Modal pattern
```html
<div class="modal-overlay" id="foo-overlay" style="display:none;">
  <div class="modal">
    <h2>Title</h2>
    <div class="modal-sub">Description</div>
    <!-- content -->
    <div class="modal-actions">
      <button id="foo-close">Sluit</button>
    </div>
  </div>
</div>
```

### 6. Geen alert(), wel toast()
```js
window.toast('Titel', 'Body tekst', 'success'); // ipv alert(...)
```

### 7. Try/catch alle DOM en storage operaties
localStorage kan throwen (Safari private mode, quota), DOM-elementen kunnen missen.

---

## 🧪 Testing approach

### Sanity testing
Run **vóór** je iets push:
```
http://localhost:3457?test=1   # basic, ~1 sec
http://localhost:3457?test=2   # extended, ~3 sec
```

### Self-test inhoud (79 checks)
- 60 buttons hebben `typeof onclick === 'function'`
- 6 globals zijn arrays/objects
- 8 critical functions bestaan
- 4 browser APIs zijn beschikbaar
- Geen runtime error chip aanwezig

### Extended test inhoud
- Open/close cycle voor 33 modals (`50ms` delays)
- localStorage roundtrip
- THEORY_LESSONS integrity (≥45, unieke IDs, valid shape)
- Compact topbar coverage (7 categorieën)
- FEATURE_CATEGORIES button-IDs allemaal aanwezig

### Auto-recovery in productie
`installAutoRecovery()` wraps elke `btn-*` onclick in try/catch. Errors verschijnen als toast ipv white-screen.

### Visual debugging
- **Global error handler**: persisteert error in `localStorage['pc-last-error']` + toont rode chip rechtsboven met regel-nummer
- **Hard Reset knop** in Welcome Hub: backup localStorage + clear caches + unregister SW + reload

### Productie-testing via Claude in Chrome
Voor live debugging:
```js
const r = window.runSelfTest();
// r.failed === [] betekent alles werkt
```

---

## 🚀 Deployment

### Workflow
```bash
git add index.html
git commit -m "v0.XX: descriptie"
git push
# Wait ~30-60s voor GitHub Pages rebuild
```

### Build check
```powershell
# Wait for build
$build = gh api "repos/bartknijn-maker/piano-coach/pages/builds/latest" | ConvertFrom-Json
"Status: $($build.status) — $($build.commit.Substring(0,8))"
```

### Service Worker
**Disabled** sinds v0.75 (`if (false && 'serviceWorker' in navigator)`). De auto-unregister code wist bestaande SWs bij elke pageload. Dit voorkomt cache-conflicts tijdens snelle iteratie.

**Re-enablen** als de app stabiel is:
1. Vervang `if (false && ...)` met `if (...)` (regel ~8094)
2. Bump CACHE versie (`piano-coach-v76`)
3. Behoudt network-first voor HTML, cache-first voor MIDIs

---

## 💾 Storage / Data Model

### localStorage key: `piano-store`
JSON object met persistent data. Belangrijkste velden:

```js
{
  // XP & gamification
  xp: 2840, level: 6,
  unlockedAchievements: ['streak-7', 'first-session', ...],
  inspirationMilestones: [{id, icon, title, cat, date}],

  // Activity
  streak: { current: 7, longest: 14 },
  sessions: [{ date, minutes, song }],
  timeLog: [{ activity, start, duration, hour }], // v0.61

  // Per-song stats
  recordings: { 'Una Mattina': [{ timestamp, accuracy, score, velocityStats }] },
  songStats: { 'Una Mattina': { lastPlayed, accuracy } },
  songPrefs: { 'Una Mattina': { tempo: 80 } },
  mistakeHeatmaps: { 'Una Mattina': { 14: { missed: 5, late: 3 } } },

  // Theory progress
  gymProgress: { completed: { 'foundations-1': true }, lastLesson, lastStep, rate },
  theoryQuiz: { perQuestion: { 'foundations-1:0': { streak, dueDate } }, totalCorrect },

  // Sight reading
  sightHistory: { totalCorrect, sequencesCompleted, sequencesPerfect },
  sightPerNote: { 5: { correct: 8, total: 10 } }, // pitch-class accuracy
  sightSequenceLevel: 2, sightSequenceLength: 4,

  // Goals & planning
  goals: [{ id, song, target, weeks, createdAt, plan: [...] }], // v0.60
  calendarPlan: { '2026-05-27': [{ song, minutes, done }] }, // v0.67

  // Reflections
  journal: [{ date, good, hard, tomorrow, mood, voiceJournal }],

  // Settings
  fingeringMode: 'position',
  activePersona: 'gould',
  pomodoro: { focusMin: 25, breakMin: 5, cyclesToday: 2 },
  atmosphereEnabled: true,

  // Sync (Supabase config — only if user setup)
  // Note: piano-sync-config is in a SEPARATE localStorage key
}
```

### Separate localStorage keys
- `piano-store` — main app data
- `piano-sync-config` — Supabase URL/key/userID
- `pwa-install-dismissed` — timestamp van dismissed install prompt
- `pc-last-error` — debug info (cleared op succesvolle load)

---

## ⚠ Bekende issues / Technical debt

### Hoog prioriteit
- **1 MB single file** wordt traag te navigeren. Refactor naar modules zou helpen, maar verbreekt het "no build step" voordeel.
- **Multiple `onKeyDown` overrides** (8+) zijn gestapeld via chain. Werkt nu, maar één foute override breekt alle features eronder.
- **Service Worker disabled** — als je echt offline wilt werken, re-enablen met juiste cache-strategy.

### Medium
- **`renderGoals()` is shared** door v0.20 weekly + (impliciet) v0.60 curriculum. Wij hebben defensive code, maar de naming-overlap is verwarrend.
- **`recState` was hernoemd naar `analysisRec`** in lijn 13787+ (Python script). Niet alle plaatsen ge-grepped, mogelijk inconsistenties.
- **Geen TypeScript** = run-time errors die TS zou vangen ontstaan in productie (we hebben self-test om dat te vangen).

### Laag
- Sommige modals zijn lange JS-strings ipv templates → moeilijk te editen.
- Geen i18n — alles is Nederlands. Engelse versie zou repliceren of variabilizen vereisen.
- 36 MIDI's zijn een mengeling van kwaliteit. Een paar zijn "Pachelbel-style 1-track" terwijl andere multi-track zijn.

---

## 🗺 Roadmap (volgende fases)

Zie `roadmap.md` voor volledige geschiedenis. Mogelijke volgende fases:

### Spoor A — Stickiness (al begonnen in v0.81)
- ✅ v0.81 Season Recap
- v0.82-: Push notifications, practice partner, social proof

### Spoor B — Performance (al begonnen in v0.82)
- ✅ v0.82 Mock Concert Mode
- Volgende: Video recording, setlist builder, IG/YT export

### Spoor C — Content
- 20 nieuwe iconische stukken (Imagine, Tetris, Entertainer, Pink Panther)
- 15 nieuwe Gym Pro+ lessen
- Genre playlists

### Spoor D — Iets gek (al begonnen in v0.83)
- ✅ v0.83 Pianist Personas
- Volgende: Time travel mode, AR overlay via webcam

### Spoor E — AI deeper
- AI Tutor 2.0 — meer intents, context-aware
- AI Practice Plan Generator
- AI Performance Critic

### Foundation/Polish
- Theme switcher uitbreiden (sepia, high-contrast)
- Mobile-first redesign player controls
- Multi-language UI (EN/DE)
- Performance budget (laadtijd < 2s)

---

## 🎓 Lessons Learned (debugging history)

### 1. **Duplicate `function name()` declarations breken stilletjes**
Drie keer geleerd: `function X() {}` declaraties in dezelfde scope shadowt — laatste wint. Oude code die de eerste verwacht crasht silently. Oplossing: rename de nieuwere versie met versie-suffix.

### 2. **Temporal Dead Zone (TDZ) op `const` arrays**
Een initial `renderCoach()` call op regel 13026 raakte de v0.40+ versie (regel 14045+) die `THEORY_LESSONS` (regel 13166) accessed → TDZ ReferenceError. **Alle handlers na die regel** werden niet attached. Symptom: helft van de buttons "doet niks". Oplossing: `setTimeout(renderCoach, 100)` of (beter) functie hernoemen zodat 't oude renderCoach blijft.

### 3. **`null.something` faalt silent in onclick chains**
`for (const goal of goals.items)` waarbij `goals` array werd → TypeError → script execution stopt. Defensive: `Array.isArray(x) ? x : (x?.items || [])`.

### 4. **Service Worker cache != browser cache**
"Cache van laatste uur leegmaken" raakt **niet** de SW. Users zien oude versies. Oplossing: SW disabled tijdens iteratie, network-first voor HTML als geheractiveerd.

### 5. **Apostrof in single-quoted JS-string breekt parsing**
`'Een fout als je 'm niet leuk vindt'` → `Unexpected identifier 'm'`. Gebruik backticks of escape.

### 6. **PowerShell git push toont stderr als "error"**
`git push` schrijft naar stderr (uit gewoonte). PowerShell ziet dat als error → script-failure. Pipe naar `2>&1` + `Select-Object` om last lines te zien.

### 7. **Claude in Chrome resultaten test live, niet hypothesis**
De allerbeste manier om "werkt het?" te beantwoorden is via `mcp__Claude_in_Chrome__javascript_tool` op de live URL. Don't reason about it — execute & check.

---

## 🤝 Continuity

### Als je vragen hebt
- Repo issues: https://github.com/bartknijn-maker/piano-coach/issues
- Bart Knijnenberg — bart.knijnenberg@gmail.com

### Voor je eerste edit
1. Read `index.html` regel 1-100 (head/CSS basis)
2. Read `index.html` regel 3300-3550 (HTML controls)
3. Grep voor de feature die je wilt extenden
4. Voeg toe **onderaan** het bestand (na de laatste closing `</script>` brace)
5. Hou de override pattern aan
6. Run `?test=1` voor je commit
7. Commit met `vX.YZ: kort omschrijven`

### Belangrijke don'ts
- ❌ **NOOIT** een tweede `function X() {}` declaration als X al bestaat
- ❌ **NOOIT** `const X` rebind als X al bestaat met `const` (TDZ)
- ❌ **NOOIT** SW activeren zonder testing op zowel laptop als mobiel
- ❌ **NOOIT** `localStorage.setItem` zonder try/catch (quota errors)
- ❌ **NOOIT** assumeren dat een button-handler gerund heeft — check via Console eerst

### Belangrijke do's
- ✅ **ALTIJD** `?test=1` voor je commit
- ✅ **ALTIJD** toast() ipv alert()
- ✅ **ALTIJD** override pattern voor function extension
- ✅ **ALTIJD** push direct na werkende commit (geen lange branches)
- ✅ **ALTIJD** version bump in title + `<h1>` tag bij significante changes

---

## 📞 Acknowledgements

- Bart Knijnenberg — visie, alle feedback, alle inhoudelijke beslissingen
- Claude (Anthropic) — implementatie partner
- piano-midi.de (Bernd Krueger) — gouden standaard MIDI bron
- bitmidi.com — secundaire MIDI bron
- coreyhaines31, AgriciDaniel — open-source skills die inspiratie gaven

---

**Status bij handover**: alle 79 self-tests passed, live URL stabiel, geen open errors.
**Laatste commit**: `c2d6cfc — v0.81-83: Season Recap + Mock Concert Mode + Pianist Personas`
**Next session**: kies een spoor uit roadmap of breng nieuwe ideeën.

🎹 Veel succes — en blijf spelen.
