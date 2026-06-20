# Piano Coach — Eigen Web App

**Concept:** Eén HTML-bestand, draait in Chrome op de Windows PC, leest MIDI van de piano via Web MIDI API. Volledig gepersonaliseerd op Bart's 7 songs + leerstijl. Geen kosten, geen accounts, geen App Store.

**Waarom dit beter is dan PianoBooster/Synthesia:**
- Gebouwd voor jouw exacte 7 songs en jouw oefenroutine
- Eigen progress-tracking (zoals je marketing-stack — data-driven)
- Geen UI-overhead die je niet gebruikt
- Uitbreidbaar — als je een feature mist, voegen we 'm toe

---

## Roadmap

### v0.1 — MIDI verbinding bewijzen ✅ (deze sessie)
- Browser detecteert MIDI-piano
- Visuele piano op scherm, toetsen lichten op als je speelt
- Toont noot-naam + MIDI-nummer + velocity
- **Doel:** bevestigen dat de hele aanpak werkt met jouw specifieke piano

### v0.2 — Songs laden + falling notes
- Inlezen van `.mid` bestanden (via @tonejs/midi CDN)
- Falling-notes visualisatie (Synthesia-stijl)
- Play/pause/tempo-slider
- Visuele feedback: groen = juiste toets, rood = mis

### v0.3 — Wait-mode + secties
- "Wait mode": app wacht tot je de juiste toets indrukt voor hij verder gaat
- Sectie-loop: selecteer maat 8–16, oefen alleen die
- Hand-isolatie: alleen rechterhand of alleen linkerhand laten vallen
- Tempo per sectie opslaan ("intro op 70%, refrein op 100%")

### v0.4 — Persoonlijke library + progress
- Built-in song library: Runaway, River Flows in You, Una Mattina, Nuvole Bianche, Pirates, Experience, Clair de Lune
- Per song: secties, huidige tempo, % accuracy, laatst geoefend
- Dagelijkse "vandaag oefenen" suggestie op basis van waar je staat
- Streak-counter (zoals Duolingo) — jij weet hoe goed dit werkt voor consistentie

### v0.5 ✅ — Beginner-loop voltooid
- Noot-namen op vallende blokken (toggleable)
- Doel-toets glow op piano bij wait mode
- Metronoom (Web Audio click track, BPM uit MIDI)
- Listen mode (synthesized playback van song)
- 🔥 Streak counter (5+ min/dag threshold)
- Tempo-ramp suggestie bij ≥90% accuracy

### v0.6 ✅ — Sectie-systeem
- Meerdere benoemde secties per song
- Auto-split in N gelijke delen
- Per-sectie best accuracy
- Click-to-activate sectie chips
- Loop wrap met section accuracy save

### v0.7 ✅ — Practice Coach
- 🎯 Volgende oefening widget (algoritme kiest meest behoeftige sectie)
- ▶ Verder waar je gebleven was (last session resume)
- 🏆 9 Achievements met toast bij unlock
- 📊 Statistieken paneel met 14-day bar chart

### v0.8 ✅ — Repertoire 11→22 songs
- 11 nieuwe songs (Mozart, Chopin, Bach, Pachelbel, Hisaishi, Tiersen Valse, Linus & Lucy, etc.)
- Auto-load van songs/ folder via fetch
- Counter "X/22" + "Alle 22 songs" achievement

### v0.9 ✅ — Repertoire 22→35 songs
- 13 nieuwe songs (Zelda OoT, WoW, Halo, Interstellar, Gladiator)
- Auto-load van 6, MuseScore-paden voor 7
- Counter "X/35" + "Alle 35 songs" achievement

### v0.10 ✅ — Smart polish
- 🪄 Smart-split (analyseert stiltes + density-veranderingen voor muzikale grenzen)
- 💾 Export/Import progress (JSON backup van localStorage)
- ⚠️ Quality warnings op cards (lage notes/duur, geen hand-split, te lang)
- 🌈 Section mastery colors (rood→oranje→geel→groen op accuracy)
- 📅 30-day practice heatmap (Duolingo/GitHub stijl)

### v0.11 ✅ — Personalisatie + habit
- 📝 Per-song notes/journal (autosave 600ms debounce, persistent per song)
- ⏱️ Pomodoro timer (25 min focus + 5 min pauze, milestone-chimes op 5/10/15/20 min)
- ⭐ Custom difficulty override (shift-click sterren, prompt 1-5 of leeg voor reset)
- 🎓 Onboarding modal (first-visit auto + replay via Stats panel)
- 🏆 Achievement counter "X/9" in label

### v0.12 ✅ — Session analytics + recital tools
- 📋 Session summary modal — na elke run/sectie: accuracy, trend (laatste 6 attempts), 3 worst zones met timestamps, suggestion
- 📈 Per-section attempt history — laatste 10 attempts opgeslagen, sparkline op chip
- 🎭 Performance mode — F-toets toggle: hide alle UI behalve canvas + piano voor recital
- 🎙️ MIDI recorder — Shift+R: record je spel, ▶ Replay met synth playback

### v0.13 ✅ — Recorder als productiviteits-tool
- 💾 Export recording als .mid bestand (eigen SMF/MIDI writer, round-trip-getest)
- 🎯 Save als custom oefening in repertoire (custom songs persist in localStorage)
- 📚 Custom songs verschijnen onder de standaard 35 na page reload
- 🎵 Track naam meta-event + tempo meta-event correct in geëxporteerde MIDI

### v0.14 ✅ — Smart insights + UX polish
- 🧠 Coach insight types: ALMOST (85-89%) · STUCK (3+ plateau) · STALE (7+ days) · QUICK WIN (<30s + low acc) · READY (never practiced)
- 🔍 Song search/filter — typ in zoekvak: title/composer/slug match. "interstellar" / "zelda" / "gladiator" werkt voor franchises
- ⌨️ Shortcuts overlay — druk <kbd>?</kbd> voor sneltoetsen-modal, <kbd>Esc</kbd> sluit alle modals
- 🎙️ Recorder NoteOff capture — accurate note durations (i.p.v. vaste 0.5s)

### v0.15 ✅ — Retrospective + responsive
- 📅 Weekly retrospective modal — totaal-minuten + dagen actief + langste sessie + achievements deze week, met week-over-week % delta (green ▲ / red ▼ / grey flat)
- 📊 7-day bar chart in retrospective
- 📈 Top accuracy-improvements (laatste 14 dagen) — section deltas met color-coded delta
- 🏆 Achievements deze week sectie
- 🎯 Personalized suggestion gebaseerd op patterns
- 📱 Mobile/tablet responsive — @media queries voor ≤1024px (tablet) en ≤640px (phone). Library/stats grid wrappen, modals fit, touch-friendly button-sizes via `@media (pointer: coarse)`

### v0.16 ✅ — Theorie + retentie
- 🎹 Chord recognition — realtime akkoord-detectie tijdens spel. Herkent triads (major, minor, dim, aug, sus2, sus4), 7ths (maj7, min7, dom7, half-dim7, dim7), 6ths, add9, power chord, octaves. **Inversion-aware** (E G B C → C maj7). Toggle via C-key. Display rechts-onder met root + type + noot-namen.
- 🔁 Spaced repetition — secties ≥90% accuracy worden gemarkeerd als "mastered". Coach surfacet ze als 💎 REVIEW na 1d, 3d, 7d, 14d, 30d (Anki-stijl). Review score = 95 (boven ALMOST 90) want retentie > progressie. Auto-graduate na 30 dagen.

### v0.17 ✅ — Musicianship layer
- 👂 Ear training mode — 3 sub-modes (enkele noot / interval / akkoord-triad). App speelt synth, jij speelt na. Octave-equivalent recognition (zelfde pitch class telt mee). Score/streak tracking, replay/skip/reveal opties. Toggle via E-key.
- 🎲 Daily challenge — elke dag deterministic-random sectie uit unmastered pool. Paars chip in topbar. Auto-detect completion bij ≥75% accuracy. 2 nieuwe achievements: "Eerste daily" + "7 daily challenges voltooid"

### v0.18 ✅ — Gamification deep
- 🔥 XP + Level system — XP uit oefenen (1/sec), section attempt 75%+ (50), nieuwe mastery (100), SR review (200), ear training correct (25), daily challenge (100), achievement unlock (500). Quadratic level thresholds: L1=100, L2=300, L3=600, L4=1000... L20=21000. Level-up celebration met 3-tone audio + grote modal
- 🎯 Weekly goals met progress bars — 3 default goals auto-reset op maandag: Dagen actief (5), Oefenminuten (100), 1 sectie naar 90%+. Visual progress bars + ✓ completed state met strike-through

### v0.19 ✅ — Technique Fundamentals
- 🎼 Auto-fingering algorithm — heuristisch fingering 1-5 op basis van melodische context: thumb-under bij stijgen, finger-cross bij dalen, hand-reset bij wide jumps (>7 semitones), chord positioning (1-3-5 voor R triad). Toggle "🎼 Vingers" knop. Display als nummer in falling note block. Geverifieerd: C major scale ascending krijgt **1-2-3-4-5-1-2-3** (klassieke piano-fingering!)
- 🎵 Scale practice mode — 10 scales (major, minor, harmonic minor, melodic minor, dorian, mixolydian, pentatonic maj/min, blues, chromatic) × 12 root keys × 1-4 octaven × tempo. Genereert ascending+descending sequence. Modal met preview van noot-namen. C major 2-oct = 29 noten in 22.8s
- 🎨 Theme switcher — 3 themes via topbar circles: dark default / midnight (pure black) / high contrast (zwart bg + neon-groen accent #00ff7f voor accessibility). Persist in localStorage.

### v0.20 ✅ — Knowledge + Habit
- 📐 Chord progression analysis — per-section chord extraction (clusters ≤80ms = chord). Detecteert 8 named progressions: I-V-vi-IV (Axis of Awesome), I-vi-IV-V (doo-wop), ii-V-I (jazz), I-IV-V (rock), vi-IV-I-V (sad), Pachelbel, i-VI-III-VII (minor pop), i-iv-v. Geverifieerd: gebouwd "C-G-Am-F" → herkend als I-V-vi-IV ✓
- 💪 Streak freezes — Earn 1 freeze door alle 3 weekly goals te voltooien. Auto-apply bij gemiste dag (max 3 in storage). Geverifieerd: 7 actieve dagen + 1 gap + 1 freeze = 8-dag streak. Blauwe 🧊 chip in topbar
- 📊 Per-composer mastery — Stats panel sectie: bar chart per componist (Einaudi 2/3, Bach 1/1, Chopin 0/1, etc.). Sorted op mastered desc

### v0.21-v0.33 ✅ — Snelle stack (zie git history / index.html)
**v0.21-v0.28**: custom goals, share URL, tags, level unlocks, ear training melody, retrospective, mobile responsive, chord recognition, spaced repetition, daily challenge, XP+levels, weekly goals, auto-fingering, scale practice, themes, chord progressions, streak freezes, per-composer mastery, TV mode, channel mute, surprise picker, scale records, velocity, mistakes-only, morning routine, chord trainer, duet mode, goal recommender, improv, memory, playlist, voice control, notifications.
**v0.29-v0.30**: theory quiz, key detection, sticky widget, diary export.
**v0.31**: practice plan generator, velocity histogram.
**v0.32**: 7 unfindable songs vervangen door vrije alternatieven (Hisaishi Summer/Laputa/Ballade, Zimmer Crown/Oogway, Yiruma Love Hurts/Reason). 35/35 repertoire vrij downloadbaar.
**v0.33**: 🛤️ 6 curated learning paths (Beginner 14-day, Classical, Movie, Ghibli, Calm Sunday, Speed Run) + 🎼 bar markers op progress bar.

### v0.34 ✅ — Bugfix sweep
- Theme switcher resette niet naar dark — `applyTheme` verwijdert nu ALLE `theme-*` classes via loop ipv hardcoded lijst
- Hand-mode switch in wait mode liet song doorrazen — na switch snapt songTime naar eerstvolgende pending chord van de nieuwe hand
- Auto-split 10×2 gaf 2×10 identieke fragmenten — toegevoegd: 'replace' vs 'subdivide' modes met prompt
- TV mode misalignment: canvas was 3400px terwijl piano op 2080px bleef — fix: expliciete `width: 2080px` op canvas + JS-computed `transform: scaleX(window.innerWidth / 2080)` op `.stage`

### v0.35 ✅ — Noten leren lezen (Sight Reading 1.0)
- 📜 Volledig nieuwe sight reading mode bereikbaar via topbar-knop
- SVG-gerenderde notenbalken (treble + bass + grand staff per difficulty)
- 4 difficulties: Beginner (C-G treble) / Treble (volledig) / Bass / Grand (beide clefs) — incl. accidentals op hogere levels
- Antwoord via MIDI-piano OF via on-screen choice buttons (C/C#/D/...)
- Live score + streak counter
- 2 achievements: `📜 10 noten correct gelezen`, `📚 100 noten correct gelezen`
- XP-reward: +25 per correct antwoord

### v0.36 ✅ — Sight Reading 2.0 (5 improvements)
- 🔊 Audio cue: piano-noot speelt zachtjes af bij elke nieuwe vraag (mute-toggle in modal, gepersisteerd)
- 🎹 Mini-piano reveal: na antwoord toont een 2-octaaf SVG-keyboard de juiste toets gemarkeerd in groen
- 📊 Per-pitch-class heatmap: 12-cell grid met accuracy per pitch (groen/oranje/rood) zodra je ≥3 attempts hebt; toont waar je zwak in bent
- 🎯 Adaptive difficulty: 10× correct op een rij → banner suggereert volgend level met 1-click upgrade
- ⏱ Reaction time tracking: gemiddelde + snelste tijd worden bijgehouden en getoond
- 🎲 Weighted question generation: 40% kans dat de volgende vraag een zwakke pitch class is (acc < 70%, ≥5 attempts) — gerichter trainen op blinde vlekken
- 💾 perNote stats + audio voorkeur worden gepersisteerd in localStorage — voortgang blijft over sessies bewaard

### v0.37 ✅ — Sight Reading 3.0: Sequence Mode
- 🎶 Nieuwe **Reeks-modus** (sequence mode) — speel 3-5 noten achter elkaar in de juiste volgorde
- 🔓 Unlock-gate: beschikbaar zodra je 30 correcte enkele-noten antwoorden hebt (`SEQUENCE_UNLOCK_THRESHOLD`). Knop toont 🔒 tot je deze grens haalt
- 🎼 Multi-note staff renderer: notes worden horizontaal uitgespreid met kleur-coding (blauw = huidig, grijs = wachten, groen = goed, rood = fout). Cirkel-highlight + nummerlabel onder elke noot
- 📊 Sequence progress dots — visuele indicator (○ ● ○ etc.) onder de notenbalk
- 🎯 Lengte-progressie: 5 perfecte reeksen op rij → lengte stijgt naar 4, dan naar 5 noten (`sightSequenceLength`)
- 🎵 Audio preview: hele reeks speelt eerst kort af (350ms per noot) zodat je melodie hoort vóór je speelt
- 🎶 Musicale generatie: 60% stapsgewijze beweging, 30% kleine sprongen, 10% grote sprongen — voelt als echte melodie i.p.v. random
- 💯 Forgiving feedback: bij fout antwoord cursor blijft staan, krijg flash-feedback en mag opnieuw proberen (geen game over)
- 🏆 XP-reward: +80/90/100 XP voor perfecte 3/4/5-noten reeks, +15 XP voor reeks-met-fouten
- 🏅 2 nieuwe achievements: `🎶 Eerste reeks voltooid`, `🎼 10 perfecte reeksen`
- 💾 Sequence-level + lengte gepersisteerd in localStorage (`sightSequenceLevel`, `sightSequenceLength`)

### v0.38 ✅ — Gym Mode: audio muziektheorie
- 🏋 Volledig nieuwe **Gym Mode** voor passieve theorie-leerstof tijdens workouts
- 11 lessen in 7 categorieën: Fundament, Intervallen (×2), Toonladders (×2), Akkoorden (×2), Progressies, Toonsoort (kwintencirkel), Modi, Cadensen — totaal ~45 minuten content
- Step-engine: elke les is een array van `{ say }` (Web Speech NL-TTS), `{ play, simul }` (Web Audio synth), `{ pause }` stappen
- Full-screen gradient dark-purple UI, designed voor armband-telefoon use case
- Player controls: ▶/⏸ groot, ⏮/⏭ per stap, -15s/+15s (3 stappen sprong)
- Voice-picker: detecteert geinstalleerde NL-stemmen, prefereert nl-NL voices
- Rate-control: 0.85× / 1× / 1.15× / 1.3× — voor wandelen of harder trainen
- Wake Lock API: scherm blijft aan zo lang Gym mode speelt
- Auto-next lesson: voltooi een les → volgende start automatisch
- Persisted progress: voltooid-checkmarks per les + laatste positie hervatten
- 2 achievements: `🏋 Eerste theorie-les voltooid`, `🎓 Alle Gym-lessen voltooid`

### v0.39 ✅ — Audio Ear Training
- 👂 Nieuw scherm-onafhankelijke ear training drill mode
- 3 modi: Intervallen (1-12 halve tonen), Akkoord-kwaliteit (maj/min/dim/aug), Mix
- Cyclus per vraag: speel sequentieel → wacht 1.7s → speel simultaan → wacht 5s → reveal antwoord via TTS → 1.5s pauze → volgende
- 🔁 Replay-knop hoort de vraag opnieuw, 👁 Toon antwoord skipt
- Pauzeerbaar via ▶/⏸ start-knop
- Designed voor fiets/wandeling/auto/sportschool — alleen audio nodig, scherm-tap optioneel

### v0.40 ✅ — Smart Coach
- 🧭 Nieuwe **Coach-modal** die je dagelijkse oefen-sessie samenstelt (~25-30 min)
- 6-stap sessie: Warm-up → Sight reading (focus op zwakke pitches) → Theorie-les (volgend ongelezen) → Audio ear training → Eén stuk uit repertoire → Cool-down met improv
- Adaptief: 
  - Zwakke pitch-classes (acc <70%, ≥5 attempts) → focus daarop in stap 2
  - Sequence-mode unlocked? → direct die mode voorstellen
  - Volgend ongelezen Gym-les → automatisch geselecteerd
- Status-strip onderaan: sight reading totaal-correct, zwakke pitches, theorie-progressie, sequence-status
- Elke stap heeft een **Start**-knop die direct naar de juiste mode springt + auto-configureert (bv. opent gym-modal en start de specifieke les)
- 🔄 Andere sessie genereert opnieuw
- Achievement: `🧭 7 dagen Coach-sessies voltooid`

### v0.41 ✅ — Voice Commands (handsfree)
- 🎙 Volledig handsfree bediening van Gym Mode + Ear Audio Training via Web Speech Recognition API (Chrome/Edge)
- Floating indicator rechtsonder met pulserend mic-icoon + laatst gehoorde tekst
- Auto-restart bij silence-timeout (browser stopt rec na ~10s stilte — wij herstarten)
- **Universele commando's**: "pauzeer/stop", "speel/ga door", "volgende", "vorige", "herhaal/opnieuw", "sneller", "trager", "sluit"
- **Ear training antwoorden via stem**: "kleine terts", "grote septiem", "kwint", "majeur", "mineur", etc — alle 12 intervallen + 4 akkoord-kwaliteiten
- **Reveal**: "antwoord" / "wat is het" → toont direct het antwoord
- Indicator toont real-time: ▶ icoon, "Luistert...", laatst herkende zin in `"quotes"`
- 11 actions mapped vanuit ~40 NL/EN keyword-patronen

### v0.42 ✅ — Practice Journal / Stats Dashboard
- 📊 Volledige progress dashboard via topbar-knop
- **6 stat cards**: XP/Level, Streak (🔥dagen), Sight reading totaal, Sequences (#completed + perfect), Theorie (%lessen voltooid), Sessies + minuten
- **14-dag activiteit timeline**: bar chart van minuten per dag, hover toont datum + minuten, "vandaag" en "-14d" labels
- **Mastery Map**: 4 progress bars met tier-badges (🥈 silver / 🥇 gold):
  - 📜 Sight reading basis (drempel: 100 / 500 noten)
  - 🎶 Sequence reading (drempel: 25 / 50 perfect)
  - 🎓 Theorie kennis (drempel: 50% / 100% lessen)
  - 🔥 Consistency (drempel: 7 / 30 dag streak)
- **Per-pitch-class grid**: 12 cellen met % accuracy, kleur-gecodeerd (groen ≥85%, rood <70%)
- **Repertoire lijst**: top 15 songs met laatst-geoefend datum + accuracy %
- **📥 Export JSON**: download volledige store als `piano-journal-{datum}.json` voor backup

### v0.43 ✅ — Backing Track / Chord Loop Improv
- 🎸 Chord-progressie player om over te improviseren
- **7 progressies**: I-V-vi-IV (pop), vi-IV-I-V (sad), ii-V-I (jazz), 12-bar blues, i-VI-III-VII (minor), I-vi-IV-V (doo-wop), Pachelbel
- **3 stijlen**: Blokakkoorden, Arpeggio (8e noten), Alberti-bas
- **Toonsoort-keuze**: alle 12 toonsoorten (C, C#, D, ..., B)
- **Tempo**: 60 / 80 / 100 / 120 / 140 BPM
- **Optionele metronome-tik**: accent op beat 1
- **Scale-hint**: app projecteert paarse stippen op de scale-noten van de live piano-display zodat je weet welke noten "werken" over de progressie
- **Scale-info banner**: toont expliciet welke scale werkt + alle noot-namen (bv. "C Majeur — C · D · E · F · G · A · B")
- **Live display**: groot huidig akkoord (bv. "Am7"), klein "Volgende: Dm7" eronder
- Achievement: `🎸 Eerste backing track sessie`

### v0.44 ✅ — Knowledge Review + Spaced Repetition
- 🧠 Volledig nieuw spaced-repetition systeem dat ervoor zorgt dat wat je in Gym leert ook blijft hangen
- **48 vragen** verdeeld over alle 11 Gym-lessen (4-6 per les), multiple-choice (4 opties)
- **SM-2 lite algoritme**: na correct antwoord groeit de review-interval 1d → 3d → 7d → 14d → 30d → 60d → 120d. Fout antwoord → back to 1 dag.
- **🎯 Post-lesson quiz** (auto-trigger): zodra je een Gym-les voltooit, verschijnt direct een quiz van 3 random vragen uit die les. +20 XP per correct antwoord. Auto-next-lesson pauzeert zodat je de quiz kunt doen.
- **🧠 Review-knop in topbar**: dagelijkse review-stack. App pakt automatisch alle vragen die "due" zijn (op basis van vergeet-curve), max 10 per sessie. Als niets due is → laagste-mastery vragen.
- **Live due-badge**: rood badge op Review-knop toont aantal openstaande reviews. Auto-refresh elke minuut.
- **Mastery-tiers per vraag**: 🌱 Nieuw / 📚 Lerend (streak ≥1) / 🥈 Gevorderd (≥3) / 🥇 Mastered (≥5). Summary onder de review-modal toont je verdeling.
- **Integratie met Smart Coach**: als er ≥1 vraag due is, voegt Coach automatisch een "🧠 Knowledge Review" stap toe aan je dagsessie (positie 4, na de theorie-les)
- 2 nieuwe achievements: `🧠 10 review-vragen correct`, `🎓 25 vragen op mastery-niveau`
- Persistente state: `store.theoryQuiz.perQuestion[lessonId:idx] = { streak, dueDate, lastSeen, totalCorrect, totalAttempts }`
- Werkt naadloos samen met Gym (v0.38) en Coach (v0.40) — leersysteem is nu compleet: hoor → onthoud → check → review → mastery

### v0.45 ✅ — Cloud Sync via Supabase
- ☁ Volledige multi-device sync via Supabase REST (geen SDK, geen build step)
- **Setup wizard** in de modal: stapsgewijze instructies voor Supabase account + tabel creatie + RLS policies
- **SQL-snippet met 📋 Kopieer-knop**: 5-regelige SQL voor `piano_journal` tabel + 3 policies, klaar voor paste in Supabase SQL editor
- **Manual sync controls**: ⬆ Push (lokaal → cloud), ⬇ Pull (cloud → lokaal met confirmation), 🔄 Auto-sync toggle (elke 5 min push)
- **Live status indicator** op topbar-knop: groene punt = verbonden, geel pulserend = syncing, grijs = niet geconfigureerd, rood = error
- **Device-ID** per installatie (gegenereerd bij eerste connect) zodat je weet welke kant van een sync je apparaat is
- **Sync log** in de modal: laatste 5 acties met timestamp
- **Veiligheid**: anon key + open RLS policies (Bart zijn eigen project, hij bepaalt access). Pull vereist confirmation (overschrijft lokaal).
- Lokale config in `localStorage` (`piano-sync-config`) — los van de store zelf zodat je sync kunt configureren zonder je journal te raken

### v0.46 ✅ — Recording + Self-Review + Mistake Heatmap
- 🎙 **Automatische opname** bij elke ▶ play. Vangt alle key-presses (midi + velocity + tijdstip) tot pause. Geen aparte knop nodig.
- 🔍 **Self-Review modal** opent na elke sessie of via topbar-knop
- **5 hoofdstats**: Accuracy %, Timing (gemiddelde afwijking ±ms), Aantal gemist, Aantal extra noten, Sessie-score (0-100)
- **Color-coded ratings**: groen >85% acc / <80ms timing, oranje 65-85% / 80-150ms, rood <65% / >150ms
- 🔥 **Mistake Heatmap** per maat — geaggregeerd over **alle opnames** van dit stuk:
  - 5 levels: l1 (groen, schoon) → l5 (donkerrood, hotspot)
  - **Klik op een maat** → loop direct daarop in de player. 🔁 "Loop slechtste maat" knop pakt automatisch de zwakste.
- ⏱ **Timing-distributie histogram**: 15 buckets van -150ms tot +150ms, groene bar in het midden voor on-beat
- 📊 **Sessie-geschiedenis** per stuk: laatste 10 opnames met datum, accuracy, timing, score
- 📥 **Export per opname** als JSON (voor backup of analyse)
- Per stuk: laatste 20 opnames bewaard, oudere worden gerouleerd uit `store.recordings[songName]`
- Heatmap-aggregatie in `store.mistakeHeatmaps[songName]` — groeit naarmate je meer speelt
- 2 achievements: `🎙 Eerste opname geanalyseerd`, `🏆 Een sessie met 90%+ accuracy`

### v0.47 ✅ — Theory Expansion (9 lessen) + Componisten
**Gym Mode lessen 12-20** (totaal nu 20 lessen, ~85 min content):
- 12. Akkoord-inversies (grondpositie, 1e en 2e inversie + voice-leading toepassing)
- 13. Sus akkoorden (sus2, sus4, oplossingsgedrag)
- 14. Uitgebreide akkoorden (9, 11, 13 + voicing-strategie)
- 15. Modal interchange (geleende akkoorden uit parallel mineur)
- 16. Secundaire dominanten (V/X notatie, voorbeelden in C-majeur)
- 17. Voice leading basics (gemeenschappelijke noten, parallelle kwinten vermijden)
- 18. Ritme & maatsoort (4/4, 3/4, 6/8, swing-feel uitleg)
- 19. Dynamiek & expressie (pp t/m ff, staccato/legato, tempo-markeringen)
- 20. 12-bar blues vorm (volledige structuur + blues scale)

**Quiz bank uitgebreid**: 30+ nieuwe vragen voor de 9 nieuwe lessen (totaal nu 78 vragen in spaced repetition)

**👤 Componisten modal** (nieuwe topbar-knop):
- 10 componisten in repertoire: Einaudi, Yiruma, Hisaishi, Zimmer, Bach, Chopin, Debussy, Beethoven, Satie, Tiersen
- Per componist: jaren, nationaliteit, era-tag, lijst van stukken in je repertoire
- Klik → detail-view met 3-paragraph bio, karakteristieke technieken, fun fact
- Tracked welke je hebt gelezen → achievement `📚 Alle componisten gelezen`

### v0.48 ✅ — Repertoire Mastery System
- ⭐ Nieuwe **Repertoire Mastery** modal — overzicht van alle stukken met 0-5 sterren rating
- **Mastery formule**:
  - 1★ — gespeeld
  - 2★ — beste accuracy ≥50%
  - 3★ — ≥70% acc + ≥3 sessies
  - 4★ — ≥85% acc + tempo ≥80% + ≥5 sessies
  - 5★ — ≥90% acc + tempo 100% + consistency ≥80% + ≥7 sessies
- **Tempo-progressie suggestie**: bij avg accuracy ≥85% op huidige tempo verschijnt "↑ TEMPO" badge → klik om tempo +10% te zetten
- **Revisit-flagging**: stukken die ≥10 dagen niet gespeeld zijn krijgen oranje "REVISIT" badge + linker-border
- **5 sorteer-opties**: laagste/hoogste mastery, laatst/langst niet gespeeld, alfabetisch
- **Filter**: "alleen revisit-nodig"
- **Summary**: totaal stukken, totaal sterren / max, 5★ count, revisit count
- **Smart Coach integratie**: als stale stukken bestaan, vervangt Coach automatisch de generieke "song" stap door specifieke revisit-aanbeveling ("🔄 Revisit: Una Mattina (12d niet gespeeld) — je had hier 4⭐")
- Achievement: `⭐ Eerste 5-sterren stuk`

### v0.49 ✅ — PWA Install + Touch Piano
- 📲 **PWA install banner** verschijnt automatisch zodra browser het ondersteunt (Chrome/Edge mobiel/desktop). Eenmaal per week, snooze 7 dgn na "Later".
- **Service Worker** (al v1 aanwezig): caching werkt nu voor offline gebruik. Manifest met theme color #4ade80 en piano emoji icon, "standalone" display mode.
- 📱 **On-screen Touch Piano** full-screen modal:
  - 2 octaaf SVG-achtige piano gerenderd met absolute positioning
  - **Velocity uit vertical touch position** — lager op de toets = hardere aanslag (40-127 range)
  - **Multi-touch support** — speel akkoorden met meerdere vingers
  - Octaaf-knoppen ±Oct om te verschuiven (range C1-C8)
  - **Geïntegreerd met onKeyDown/onKeyUp**: alle bestaande modes (wait mode, sight reading, ear training, etc.) werken nu zonder MIDI piano — alleen touchscreen
  - Velocity-toggle voor gelijke aanslag
  - Note-display in topbar toont laatst gespeelde noot
- Use case: Bart kan nu volledig oefenen op zijn telefoon/tablet in een hotel, op de bank, etc.

### v0.50 ✅ — Practice Habits: Pomodoro + Warm-up + Daily Journal
**🍅 Pomodoro Timer**:
- Configureerbaar focus (15-50 min) + pauze (3-15 min)
- **Floating widget** rechtsonder met huidige tijd + ⏸/↺/× controls
- **Browser notifications** bij phase-wissel ("Pauze tijd!" / "Terug naar piano")
- 3-tonig auditief signaal bij wissels (synth-piepjes)
- Per-dag cycli-teller (resets bij dagwisseling)
- Achievement: `🍅 Eerste Pomodoro voltooid`

**🔥 Warm-up Enforcer** (opt-in via Pomodoro settings):
- Bij eerste play() van de dag: blokkeert direct beginnen, opent warm-up modal
- 3 oefeningen × 60 sec: vijfvingeroefening RH/LH apart → parallel → C-majeur 2 octaven
- Live countdown timer, auto-advance per oefening
- "Sla over" knop voor luie dagen (niet aanbevolen)
- Achievement: `🔥 7× warm-up gedaan`

**📓 Daily Practice Journal**:
- Modal met 4 velden: "Wat ging goed?", "Wat was lastig?", "Eén ding voor morgen", stemming (1-5 emoji)
- **Auto-prompt na sessie**: na pause vraagt de app éénmaal per dag "Even 30 sec reflecteren?"
- History view: laatste 7 entries inline zichtbaar met datum + stemming
- 📥 **Export als Markdown**: `practice-journal-{datum}.md` voor backup of doorgeven aan coach
- +20 XP per reflectie
- 2 achievements: `📓 Eerste reflectie geschreven`, `🌟 7 dagen reflecties op rij`

### v0.51 ✅ — Velocity Coach
- 🎚 Nieuwe **Velocity Coach modal** met diepe dynamiek-analyse van je laatste opname
- **5 stat-cards**: gemiddelde velocity (jouw spel + origineel), range, variatie (stddev), LH avg, RH avg
- **2 histogrammen**: pp/p/mp/mf/f/ff distributie — jouw spel naast origineel, side-by-side vergelijking
- **Hand-balans bar**: visualiseert RH vs LH dominantie, label "RH dominant (melodie)" / "LH dominant (bas)" / "Gebalanceerd"
- **Slimme suggesties** op basis van gedetecteerde patronen:
  - "Je dynamiek is vlak (range 25) — origineel heeft range 60, train explicieter pp tot ff"
  - "Linkerhand is 15 harder dan rechterhand — wil je het omgekeerd voor melodie-balans"
  - "Aanslag is heel uniform (stddev 6), klinkt machinaal — probeer accenten op sterke beats"
  - "Speelt gemiddeld 25 harder dan origineel — pas algeheel niveau aan"
  - "Gebruikt nooit extreme dynamiek (pp/ff) — origineel wel, durf de uitersten"
- 🎚 **Real-time floating velocity-meter** (toggle): toont elke noot live met label (pp/p/mp/mf/f/ff), grote progress bar, en de laatste 5 velocities
- **Hand-detectie**: noten < midi 60 = LH, ≥ 60 = RH (heuristiek voor solo piano)
- `velocityStats` wordt nu automatisch berekend en bewaard in elke `recordings[song][i]` entry naast accuracy/timing
- 2 achievements: `🎚 Velocity range ≥80 in 1 sessie`, `⚖ Goede RH-dominantie (RH 10+ boven LH)`

### v0.52 ✅ — Two-Hand Independence Drills
- ✌ Nieuwe **Two-Hand Drills modal** met 5 oefeningen voor LH ↔ RH coördinatie:
  1. **Parallel** (Beginner): beide handen gelijktijdig dezelfde figuur — foundation
  2. **Spiegel** (Beginner+): RH omhoog terwijl LH omlaag — symmetrie-training
  3. **Echo** (Intermediate): LH speelt RH 2 beats vertraagd — twee-sporen geheugen
  4. **Verschillend ritme** (Intermediate+): LH 4 kwartnoten vs RH 8 achtsten
  5. **Polyrythme 3:2** (Advanced): RH 3 noten in tijd dat LH er 2 speelt — klassieke onafhankelijkheids-test
- **Visualizer**: 2 horizontale tracks (RH paars, LH blauw), elke noot is een cel met note-name. Gele playhead loopt synchroon met tempo.
- **Live highlighting**: noten worden geel (active window ±150ms), groen (jij speelde 'm correct), rood (mistake)
- **Settings**: tempo 50-100 BPM, 2/4/8 loops, optionele metronome (accent op beat 1)
- **Auto-record + analyse**: per drill tracken we per-hand accuracy %, gem timing ±ms, en hand-divergentie (verschil tussen RH en LH timing)
- **Resultaten**: na laatste loop wordt automatisch een result-card getoond met scores per hand en divergentie-feedback (✅ < 50ms, 👍 < 100ms, ⚠ train onafhankelijkheid)
- Persisted in `store.twohandResults` (laatste 100 sessies)
- 2 achievements: `✌ Eerste two-hand drill voltooid`, `🧠 Polyrythme 3:2 met ≥80% RH+LH`

### v0.53 ✅ — Theory Foundations Complete (10 lessen)
- 🎓 De **complete basis-theorie** voor piano is nu gedekt — 30 Gym-lessen totaal (~130 min content)
- 10 nieuwe lessen die kritieke gaten dichten:
  - 21. **Notatie 1**: notenbalk + sleutels (treble/bass), positie van elke noot, ezelsbruggetjes (FACE, Every Good Boy)
  - 22. **Notatie 2**: notenwaarden (heel/half/kwart/8e/16e), rusten, voortekens (#/♭/natuur), toonsoort-voortekening
  - 23. **Functionele harmonie T-S-D**: tonic/subdominant/dominant rollen — waarom progressies werken
  - 24. **Diatonische akkoorden**: alle 7 akkoorden in majeur (M-m-m-M-M-m-dim patroon) en mineur
  - 25. **Ornamenten**: trillers, mordents (recht + omgekeerd), voorslagen, draaiingen
  - 26. **Frasering & motieven**: antecedent-consequent (vraag-antwoord), 4-maats frasen, hoe muziek ademt
  - 27. **Vingerzettingen + pedaal**: vinger 1-5 nummering, duim-onder techniek, alle 3 pedalen uitgelegd
  - 28. **Vormleer**: binair, ternair, AABA, sonate-vorm, rondo, liedvorm
  - 29. **Modulatie**: naar dominant, relatieve majeur/mineur, verre modulaties, pivot-akkoorden
  - 30. **Syncopatie + hemiola + triolen**: ritmische verfijning
- **40+ nieuwe quiz-vragen** voor spaced repetition (totaal nu 118 vragen)
- Achievement: `🎓 Volledige theorie-basis voltooid (30 lessen)`
- **De curriculum dekt nu**: notatie lezen, alle intervallen + toonladders + akkoorden + modi + cadensen, functionele harmonie, vormleer, ritme, dynamiek, vingerzetting/pedaal, ornamenten, frasering, modulatie, blues, jazz turnarounds, voice leading, modal interchange, secundaire dominanten

### v0.54 ✅ — Visualization Engine + Pro Curriculum (15 advanced lessen)
**Visualization Engine** voor Gym-lessen:
- 5 visual types die tijdens lessen tonen wat je hoort:
  - 📜 **Notenbalk** (treble/bass): SVG-notenbalk met noten op exacte posities + ledger lines + voortekens + noot-namen
  - 🎹 **Keyboard**: SVG-keyboard met gehighlighte toetsen + noot-labels (voor scales, akkoorden, modi)
  - 🌀 **Kwintencirkel**: 12-segment circle met highlight op huidige toonsoort
  - 🎼 **Progression**: Roman numeral + chord-name cards met pijlen ertussen (voor harmonische beweging)
  - 🥁 **Rhythm-grid**: kleurgecodeerde beat-cellen (sterk/zwak/syncope) voor maatsoorten en ritmes
- Visuals "stick" tijdens de spraakuitleg zodat je tijd hebt te kijken
- Bestaande lessen (foundations, intervals, scales, triads, circle-fifths, progressions, cadences, rhythm, syncopation, notation, functional-harmony, diatonic-chords) zijn nu **gepatched met visuals** op kritieke uitleg-momenten

**Curriculum herstructurering** — 4 levels:
- 🌱 **Beginner** (9 lessen): foundations, notatie, intervallen, scales, ritme/dynamics
- 🎓 **Intermediate** (13 lessen): triads, sevenths, progressions, cadences, kwintencirkel, inversies, functioneel, diatonisch, blues, vormen, frasering, vingerzetting
- 🔥 **Advanced** (12 lessen): extended chords, modal interchange, secundaire dominanten, voice leading, modi, modulatie, ornamenten, syncopatie + nieuwe stijlen (stride/walking, boogie, comping, variation forms)
- 🏆 **Pro** (11 lessen): jazz harmonie + klassieke avant-garde + counterpoint + akoestiek

**15 nieuwe lessen (lessen 31-45)** met visuals:

🎷 **Jazz harmonie (5)**:
- 31. Tritone substitution (V7 ↔ ♭II7 — chromatische bas-lijn)
- 32. Altered dominants (♭9, ♯9 Hendrix-akkoord, ♭5, ♯5 + altered scale)
- 33. ii-V-I jazz voicings (shell + rootless A/B voicings)
- 34. Modal jazz: So What / Maiden Voyage style improvisatie
- 35. Bebop scales + melodisch mineur (passing tones, altered scale shortcut)

🎻 **Klassieke advanced harmonie (3)**:
- 36. Neapolitan ♭II akkoord (Moonlight Sonata, Chopin)
- 37. Augmented sixth chords (Italian, French, German varianten)
- 38. Chromatische mediants (Wagner, Star Wars)

🎹 **Pianostijlen (3)**:
- 39. Stride bass + Walking bass (LH-patronen voor jazz)
- 40. Boogie-woogie (8-noten LH patroon over 12-bar blues)
- 41. Jazz comping (ritmisch reactief begeleiden, dialoog met solist)

🎼 **Compositie (2)**:
- 42. Counterpoint basics (4 motion types, parallelle kwinten vermijden)
- 43. Variatievormen (Goldberg, Diabelli, Twinkle Twinkle-demonstratie)

🔬 **Akoestiek/wetenschap (2)**:
- 44. Overtone serie (waarom akkoorden klinken, majeur drieklank in de natuur)
- 45. Equal temperament vs just intonation (Bach\'s WTC context)

**45+ nieuwe quiz-vragen** voor spaced repetition (totaal nu 163 vragen)

**UI updates**:
- Level-filter bar bovenaan Gym lijst (Alle / Beginner / Intermediate / Advanced / Pro)
- Lessen gegroepeerd per level met progress-counter per level
- 📊 emoji op lessen die visuals bevatten

**3 nieuwe achievements**: `🎷 Jazz harmonie track voltooid`, `🎻 Klassieke advanced voltooid`, `🏆 Pro-level theorie compleet (45 lessen)`

### v0.55 ✅ — Improv Coach (geleid improvisatie-onderwijs)
- 🎷 5-niveau curriculum dat backing track + live note-analysis koppelt:
  - **Lvl 1 — Scale only**: speel alleen scale-noten, geen "verkeerde" noten
  - **Lvl 2 — Chord tones on beat 1**: eerste noot van elke maat moet een chord tone zijn, scale ertussen
  - **Lvl 3 — Blue notes + chromatic**: detecteert of buiten-scale-noten geldige blue notes of chromatic passing tones zijn
  - **Lvl 4 — Motif development**: herkent of je een 3-noten motief herhaalt of varieert (zelfde contour)
  - **Lvl 5 — Free**: alles mag, app evalueert per noot
- **Live feedback per noot**: groen/oranje/rood label zoals "✅ Chord tone op beat 1!", "⚠ Scale noot op beat 1 — beter chord tone", "🎵 Blue note — nice spice!"
- **Adaptieve tips** onder feedback ("Probeer C, E of G op de eerste beat van Cmaj7")
- Backing track speelt op ingestelde toonsoort + tempo + progressie (4 progressies beschikbaar)
- Achievement: `🎷 Bereikt Improv niveau 5 (Free)`

### v0.56 ✅ — Prima Vista + Memorization Workflow
**📜 Prima Vista (Sight Reading 4.0)** — echte sight reading van ongeziene muziek:
- 4 difficulty levels:
  - Beginner: 2 maten, RH only, geen voortekens, 8s preview
  - Intermediate: 4 maten, RH only, voortekens, 6s preview
  - Advanced: 4 maten, beide handen, 5s preview
  - Pro: 4 maten, beide handen, 3s preview
- **Random extract** uit een geladen MIDI dat je nog nooit op die plek hebt gespeeld
- **5-8 sec preview** countdown, dan moet je spelen
- **Accuracy-score** per extract + lopende session-stats (gem accuracy, streak)
- 🔊 "Hoor het origineel" knop voor na de attempt om te vergelijken
- Achievement: `📜 10 prima-vista extracts gespeeld`

**🧠 Memorization Workflow** — stuk uit het hoofd leren via chunking:
- Configureerbare chunk-grootte (2/4/8 maten)
- Per chunk doorloop je 4 fases:
  1. 👀 **Bekijk** — bestudeer de notenbalk
  2. 🎹 **Speel mét noten zichtbaar** — voer 3× uit
  3. 👁 **Laatste blik** — kijk nog eens
  4. 🧠 **Speel uit hoofd** — notenbalk verdwijnt
- Progress-bar toont chunks-voortgang per stuk
- Persistent: `store.memorization[songName]` houdt bij hoeveel chunks gememoriseerd zijn
- 2 achievements: `🧠 Eerste chunk gememoriseerd`, `💯 Heel stuk uit hoofd gememoriseerd`

### v0.57 ✅ — Stage Mode + Blind Playing (performance prep)
**🎭 Stage Mode** — performance-simulatie:
- **Verberg falling notes** + topbar + stats panel → alleen audio + (lichtjes zichtbaar) keyboard
- **3-sec countdown** met grote countdown-overlay (intro-spanning)
- **Optionele audience ambient** — lichte ruis via Web Audio noise buffer
- **REC-indicator rechtsboven** met pulsende rode stip
- **Continuïteit-prompt**: "speel door, geen pauze" — Escape om af te breken
- **Post-performance review**: accuracy %, rating (🏆 Concertklaar / 🎵 Solid / 💪 Aan het komen / 🎯 Meer oefening) + link naar volledige Self-Review
- 2 achievements: `🎭 Eerste stage performance`, `🏆 Stage performance ≥90%`

**👁 Blind Playing** — speel zonder kijken:
- 3 types: losse noten, akkoorden (drieklanken), intervallen vanaf referentie-noot
- 3 ranges: middel-octaaf / 2 octaven / volledig keyboard
- **TTS uitspraak**: app zegt "Speel C5", "Speel A mineur", "Speel C plus reine kwint"
- **Display + spraak** — display zichtbaar, maar bedoeling is dat je het op gevoel doet (= touch typing voor piano)
- Live judging: vergelijkt MIDI-input met verwachte noot/akkoord/interval, 5-sec window
- Auto-next bij correct, anders na timeout
- Achievement: `👁 10 blind playing antwoorden correct`

**Drie nieuwe topbar knoppen** (`🎷 Improv`, `📖 Prima Vista`, `🎭 Stage`) — samen completeren ze de praktijk-vaardigheden:

| Vaardigheid | Mode | Wanneer gebruiken |
|-------------|------|-------------------|
| Improvisatie | 🎷 Improv Coach | Dagelijks 5-10 min over backing track |
| Sight reading | 📜 Prima Vista | 2-3× per week, 5 extracts |
| Memorization | 🧠 Memorize | Per stuk: 1 chunk per dag, ~10 min |
| Performance | 🎭 Stage Mode | 1× per week per stuk dat 4⭐+ is |
| Kinesthesie | 👁 Blind Playing | 5 min als warm-up of cool-down |

### v0.58 ✅ — Etudes Library + Speed Building
- 💪 **10 ingebouwde etudes** met auto tempo-progressie:
  1. Hanon No. 1 (5-vinger basis, 60→120 BPM)
  2. C-majeur scale 2 octaven (60→140)
  3. C-majeur arpeggio 2 octaven (60→120)
  4. Chromatische toonladder (60→130)
  5. Triller F-G (3-4 vingers, 80→180)
  6. Octaven C-E-G-C (50→100)
  7. Broken chords I-IV-V (60→120)
  8. 3-tegen-2 polyritme (50→100)
  9. Tertsen parallel (50→100)
  10. Pentatonische runs (70→150)
- Per etude: categorie-tag (vinger-onafhankelijkheid / scales / arpeggio's / ornamenten / octaven / polyritme / jazz prep), beschrijving, start- en target-tempo
- **Auto tempo-progressie**: haal ≥90% accuracy 2 loops op rij → tempo stijgt 10 BPM automatisch
- **Tempo-bar visualisatie**: rode → oranje → groene gradient, toont voortgang naar target
- **Mastery-indicator**: groene rand om gemasterde etudes (target-tempo gehaald)
- **Best-tempo per etude** in localStorage, etude start de volgende keer op `best - 10` BPM
- Metronome intro (4 clicks) voor elke loop, dan speelt app het patroon mee op lage volume
- 2 achievements: `💪 Eerste etude voltooid`, `🏆 3 etudes op target-tempo`

### v0.59 ✅ — Ear-to-Piano Transcription
- 🎯 Nieuwe modal voor direct **hoor → speel** training
- **3 modi**:
  - 🎵 Melodie (1-5 noten sequentieel)
  - 🎶 Akkoord (drieklank / sept-akkoord)
  - 📏 Interval (2 noten met semitone-afstand)
- **3 ranges**: 1/2/3 octaven, optioneel met voortekens (zwarte toetsen)
- **Audio playback**: app speelt het fragment, jij speelt na
- **Live judging**:
  - Melodie: exact volgorde-match
  - Akkoord: pitch-class set match (octaaf-onafhankelijk)
  - Interval: root + target match
- **Reveal-bubbles**: na judge worden alle expected noten getoond, groen voor correct, rood voor fout
- 🔁 "Hoor opnieuw" + 👁 "Geef op (toon antwoord)" knoppen
- Score-tracking + best-difficulty record
- 2 achievements: `🎯 50 ear-to-piano correct`, `👂 5-noten melodie correct getranscribeerd`

### v0.60 ✅ — Goal-Based Curriculum
- 🎯 Nieuwe modal waar je een **leerdoel kunt definiëren** en krijgt automatisch een week-voor-week plan
- **4 doel-types** met expliciete criteria:
  - 📚 Leer het stuk (tempo 70% + accuracy 80%)
  - 🎓 Master het stuk (tempo 100% + accuracy 90%)
  - 🧠 Uit hoofd (memorization workflow + tempo 90%)
  - 🎭 Performance-klaar (Stage Mode 90%+ + tempo 100%)
- **Termijn-keuze**: 4/8/12/16 weken
- **Auto-gegenereerd plan** per goal-type: progressieve milestones gebaseerd op het type doel
  - Bv. "Master het stuk" plan: week 1 audit → week 2 zwakke maten loop → week 30% tempo 85% → week 50% timing focus → week 70% tempo 95% → week 85% full tempo → week 100% master-bevestiging
- **Detail-view**: alle weken zichtbaar met status (✅ done / 🎯 current / ⏳ future) en concrete instructies
- **Auto-status**: berekent week-status op basis van `createdAt` vs huidige datum
- **Smart Coach integratie**: huidig-week taak wordt automatisch in je dagsessie ingevoegd ("🎯 Goal: Una Mattina — Week 5" met deze week's instructies)
- Goals worden opgeslagen in `store.goals[]` met volledige plan-array
- Verwijder-knop met confirmation in detail-view
- 2 achievements: `🎯 Eerste goal aangemaakt`, `🏆 Eerste goal voltooid`

### v0.61 ✅ — Practice Analytics Deep + Time Tracker
**📈 Time Tracker** (lightweight, auto):
- MutationObserver op alle 12 hoofd-modal overlays detecteert open/close
- Per activiteit logt `{ activity, start, duration, hour }` naar `store.timeLog`
- play()/pause() hooks tracken repertoire-tijd
- Min-duur filter (5 sec) tegen ruis
- Auto-cleanup naar laatste 2000 entries
- `beforeunload` sluit lopende activity

**📊 Analytics Modal** met 5 secties:

1. **💡 Auto-gegenereerde insights** (top, max 8):
   - 🌟 "Je beste uur is 19:00 — gemiddelde accuracy 87%. Plan moeilijk werk in de avond."
   - 📉 "Je laagste accuracy is 64% rond 08:00 — overweeg lichte taken (theorie/review) ipv repertoire op die tijd."
   - 🔥 "Sterk! Je oefent 47% meer dan vorige week."
   - 📈 "Je accuracy is met 8 punten gestegen deze week."
   - 🎹 "92% van je tijd zit in repertoire — voeg theorie of sight reading toe voor brede groei."
   - 💡 "Je doet weinig aan: ear-training, improv. Open Coach voor uitgebalanceerde sessie."
   - 🔥 "8 dagen streak! Niet onderbreken."
   - 🔥 "In Una Mattina blijft maat 16 struikelen — loop deze 10× op 70%."
2. **4 KPI cards**: Deze week tijd (met trend ↑↓ %), Avg accuracy, Gem. sessie-lengte, Total XP + level
3. **🕐 Time-of-day chart**: 24 bars (één per uur), hoogte = gem accuracy, groene "best hour" highlight, hover voor details
4. **⏱ Activity breakdown**: horizontal bar chart per modus over laatste 30 dagen, sorted by tijd, met % en minuten
5. **🗓 30-dag heatmap calendar**: 5×6 grid, kleur-coding op minuten/dag (l1=licht / l2=goed / l3=sterk / l4=intens), today gehighlight
6. **📊 Week vs week comparison**: tabel met deze week / vorige week / Δ delta voor minuten, sessies, accuracy

**Smart Coach integratie**: Coach toont nu een **timing-aware insight** bovenaan je sessie:
- "🌟 Je oefent in je beste uur" (als <1u van beste uur)
- "💡 Je beste uur is X:00 — nu is anders, kies lichtere oefeningen" (als ≥5u van beste uur)

**📥 Export rapport** als JSON voor backup of doorgeven aan coach

Achievement: `📈 7 dagen tracked activity`

### v0.62 ✅ — Follow Mode (live tempo detection)
- 🎯 Topbar-toggle die jouw tempo detecteert via inter-onset intervals (IOI) van je noten en `state.songSpeed` continu aanpast
- **Tempo-detectie algoritme**:
  - Rolling window van laatste 8 note-onsets
  - Median IOI berekening (robuust tegen outliers)
  - Smart octaving: < 300ms wordt verdubbeld (8ths → quarters), > 1500ms gehalveerd
  - Coefficient of variation (CV) → stability score 0-1
- **Smoothing**: blend 70% oude speed + 30% nieuwe → geen jitter
- **Floating widget** rechtsboven (groene accent):
  - Grote BPM-display van gedetecteerd tempo
  - Stability-bar (rood → geel → groen)
  - Dynamische hint: "🎯 Stabiel tempo — playback synchroniseert" / "⚠ Wisselend tempo — speel gelijkmatiger"
- Tempo wordt alleen geapplied bij stability > 50% (anti-jitter)
- Bij uitschakelen: songSpeed wordt teruggezet naar 1.0
- Use case: speel Chopin Prelude in E minor met expressieve rubato — app volgt jouw frasering automatisch

### v0.63 ✅ — Polyphonic Listening
- 🎼 Modal die per-track muting toestaat voor stukken met meerdere stemmen
- **Auto-detect tracks** uit `state.song.notes`: track-veld OF heuristiek op midi-range (RH ≥60 / LH <60)
- **Smart labels**: "Track 0 (RH-range, C4-G5)" / "Track 1 (LH-range, C2-B3)"
- **Mute-checkbox per track** — gemute = jij speelt, ongemute = app speelt mee via synth
- **Settings**:
  - Tempo 50% / 70% / 85% / 100%
  - ✓ Loop continu — herstart automatisch
  - ✓ Highlight gemute noten op piano — paarse gloed (geel `inset box-shadow`) op toetsen die in de gemute track voorkomen
- **Live stats**: aantal noten gespeeld + accuracy %
- **Use case**: Bach Prelude in C — mute LH, leer RH met levende begeleiding. Of bij Bach Invention: mute één stem, oefen de andere zonder de andere te hoeven onthouden.

### v0.64 ✅ — Compositie Challenge
- ✍ App geeft je een chord-progressie + opdracht. Jij speelt een melodie. App analyseert en scoort.
- **3 niveaus**:
  - **Beginner**: 8 maten I-V-vi-IV loop
  - **Intermediate**: 16 maten met motieven (introduceer in maat 1-4, herhaal in 9-12)
  - **Advanced**: 32 maten met secundaire dominanten (V/ii, V/V, V/vi) en spanningsboog
- **Live performance**: 4-beat count-in → speelt chord-progressie op herhaling met metronome → toont huidig akkoord groot + chord-tones spelling + maat-teller
- **Auto-analyse** na laatste maat scoort 5 dimensies:
  - 📚 **In scale** (% noten binnen toonsoort)
  - 🎯 **Chord tones op beat 1** (% downbeats die landden op chord tone)
  - 🎵 **Motief-herhaling** (3-noten interval-patronen die meermaals voorkomen)
  - ⏸ **Frasering** (aantal pauzes tussen frasen)
  - 🏃 **Density** (noten per seconde — sweet spot 2-4)
- **Overall score** (0-100): scale 30% + chord 35% + motief 20% + frasering 15%
- **Adaptieve tips** in feedback:
  - "📚 30% van je noten was buiten de scale — focus eerst op binnen toonsoort blijven"
  - "🎯 Je raakte 25% van downbeats — train met Improv Coach Lvl 2"
  - "🎵 Geen herhaalde motieven — verzin 3-noten figuur en herhaal met variatie"
  - "🏃 Heel druk (6.2 noten/sec) — een goede melodie heeft ademruimte"
- **🔊 Replay je compositie** terug om te horen wat je speelde
- XP-reward: +80 bij ≥70, +40 bij ≥50
- 2 achievements: `✍ Eerste compositie voltooid`, `🎵 Compositie score ≥80`

### v0.66 ✅ — Pattern Discovery
- 🔍 Detecteert herhaalde motieven binnen één stuk én tussen verschillende stukken
- **Motif-extractor**:
  - 3-5 noten reeksen
  - Encoded als **interval-strings** ("+4+3" voor C-E-G) — transpositie-onafhankelijk
  - Filter: alleen melodische noten (≥midi 55), geen pure repeats, geen sprongen >12 halve tonen
  - Min 2 occurrences, top 30 patterns
- **2 tabs**:
  - 🔁 **Binnen één stuk** — toont meest voorkomende motieven met intervallen + tijdstempels + start-noten
  - 🔀 **Tussen stukken** — kies bron-stuk, krijg lijst van andere stukken die dezelfde motieven gebruiken
- **Auto-scan op load**: setInterval polled state.song; nieuw stuk → motieven worden in `store.songPatterns[song]` gecached zonder dat user iets hoeft te doen
- **📥 Scan huidig stuk** knop voor force-rescan
- **🗑 Cache leegmaken** voor reset
- Educatief: ontdek dat Bach's Prelude in C en Yiruma's River Flows in You dezelfde dalende terts-motief gebruiken
- Praktisch: als je motief X in stuk A kent, herken je 'm sneller in stuk B
- 2 achievements: `🔍 10 stukken pattern-gescand`, `🔀 5+ cross-piece matches`

### v0.67 ✅ — Practice Calendar
- 📅 7-dagen kalender-view met week-navigatie (←/→ knoppen)
- **Per dag-card**:
  - Datum + dag-naam (Ma-Zo)
  - Lijst van geplande items (stuk + minuten)
  - Today gemarkeerd met paarse rand
  - Past-dagen lichter (opacity)
  - "Has-history" groene tint bij ingevulde dagen
  - Totaal minuten onderaan
  - Klik op item → toggle "done" (✓)
  - × om item te verwijderen
- **💡 Smart Suggestions** (auto-gegenereerd, klikbare chips):
  - Stukken niet gespeeld in ≥10d + ≥2⭐ → "Revisit (12d) — 3⭐"
  - Stukken in actieve goals → "🎯 Goal: master"
  - Lage mastery stukken → "Bouw mastery (1⭐)"
  - Generieke acties: 📜 Sight reading / 💪 Etudes / 🏋 Theorie / 🎷 Improv
  - Klik op chip → voegt direct toe aan vandaag
- **🪄 Auto-plan deze week**: vult automatisch alle resterende dagen met 3 gevarieerde items rotating door suggestions
- **🗑 Wis deze week**: confirmed clear van alle items
- **Persistent**: `store.calendarPlan[YYYY-MM-DD] = [{song, minutes, done, addedAt}]`
- **Smart Coach integratie**: als er vandaag open calendar-items zijn, verschijnt bovenaan je Coach-sessie:
  - "📅 Calendar vandaag: 3 item(s) open — Bach Prelude · Improv · Etudes"
  - Klik Start → opent direct de Calendar modal
- 2 achievements: `📅 Eerste week volledig gepland`, `✅ 5 dagen op rij alle items voltooid`

### v0.69 ✅ — Share with Coach (URL-hash based)
- 🤝 Genereer een URL met geselecteerde delen van je voortgang, stuur naar een coach/leraar
- **Geen backend nodig**: data wordt base64-encoded in URL hash (`#share=BASE64STUFF`)
- **8 toggle-bare secties** om te delen:
  - 🎯 Goals (week-voor-week plannen)
  - 📓 Journal (laatste 30 dagen)
  - 🎙 Recording stats (laatste 30 dagen, geanonymiseerd — geen raw note-data)
  - ⭐ Repertoire mastery (sterren, sessies, tempo per stuk)
  - 🔥 Mistake heatmaps (top problem-maten per stuk)
  - 🎹 Sight-reading per-pitch class stats
  - 🧠 Theorie-progressie + quiz mastery
  - ✍ Persoonlijke notitie (vrije tekst)
- **URL-grootte indicator**: waarschuwt als URL > 8KB (mogelijk te lang voor email)
- 📋 **Kopieer URL** / 🧪 **Test in nieuw tabblad** / 📄 **Download als Markdown**
- **Coach View modal** (auto-trigger): wanneer iemand een URL met `#share=` opent:
  - App detecteert hash + decodeert base64 + JSON parse
  - Toont alle gedeelde data in read-only formaat met tables + journal entries + mastery
  - 📥 Export als Markdown voor coach's eigen notitie-systeem
  - "Sluit" → hash wordt cleared, terug naar eigen app
- Achievement: `🤝 Eerste share-URL gegenereerd`

### v0.70 ✅ — Deep Insights (AI-style rule engine)
- 🧠 Rule-based engine die over **alle data** in je store loopt en natuurlijk-taal insights genereert
- **5 analyse-periodes**: 7 / 30 / 90 / 365 dagen of hele history
- **6 secties per rapport**:

**📊 Executive Summary** — 1 alinea met totaal-minuten, dagen, sessies, avg accuracy, lessen, goals

**📈 Trend Analysis** (4 cards): vergelijkt 1e helft vs 2e helft van periode
- Accuracy delta (↑/↓/→)
- Timing afwijking (lager = beter)
- Praktijk-tijd verandering
- Consistency (% actieve dagen)

**🔮 Predictions** — lineaire extrapolatie op basis van huidige trend:
- "Op huidig tempo bereik je 90% op Chopin Prelude in ~12 dagen (~8 sessies). Goal-deadline: 21 dagen."
- "Una Mattina stagneert op 76% — doorbreek via Mistake Heatmap + 5× loop zwakste maat."
- "Volgend level (12) over ~14 dagen bij huidig tempo."

**🎯 Top 5 aanbevelingen** — adaptief op basis van data:
- "Sight reading drill op F# — je accuracy is 58%"
- "Refresh Bach Prelude — was 4⭐ maar 22 dagen niet gespeeld"
- "Plan kerntaken om 19:00 — je bent dan het scherpst"
- "Voeg Gym theorie toe — 4/45 lessen gedaan"
- "Loop maat 16 van Una Mattina — 14× gemist"

**🧩 Cross-mode correlations** — slimme combinaties:
- Theorie+review dagen vs zonder → accuracy verschil
- Goede velocity-range (≥50) vs vlakke dynamiek → accuracy
- Lange sessies (>25 min) vs korte → welke werkt beter voor jou

**⚠ Watch-outs**:
- 3+ dagen geen activiteit → streak in gevaar
- Accuracy regressie (gedaald >5pt) → tempo te snel verhoogd
- 0 journal entries in 14 dagen → reflectie ontbreekt
- Vlakke dynamiek (range < 25) → klinkt machinaal
- Memorization stilstand (chunks niet aangeraakt 14+ dgn)

**🔄 Re-analyseren** knop + **📥 Export rapport** als Markdown

Achievement: `🧠 Eerste Deep Insights rapport bekeken`

### v0.71 ✅ — AI Tutor Chat
- 💬 Chat-interface met rule-based intent classifier + 14 intents
- **Intents**: theory / today-practice / mistake-analysis / weak-points / prediction / best-time / new-piece / streak / status / goals / theory-progress / stats / wellbeing / help
- **Data-aware antwoorden**: gebruikt mistake-heatmaps, perNote stats, recordings, goals, calendar, gymProgress, journal, time-of-day analyse
- **8 chip-shortcuts**: "Wat oefenen vandaag?" / "Waarom struikel ik?" / "Mijn zwakke punten" / "Wat is verminderd akkoord?" / "Hoe lang tot master?" / "Beste tijd?" / "Nieuw stuk?" / "Streak status"
- **Action-buttons in antwoorden**: "Open Coach" / "Open Self-Review" / "Open Sight Reading" — bouwt brug naar relevante modes
- **Theory antwoorden** voor: verminderd, grote/kleine terts, reine kwint, tritonus, dominant 7, cadens (4 types), modi (7), secundaire dominant, tritone sub
- 🗑 Wis chat optie
- Achievement: `💬 10 vragen aan AI Tutor gesteld`

### v0.72 ✅ — Reharmonization Drills
- 🔄 App geeft chord-progressie + 1 akkoord gemarkeerd als "reharm target" (oranje, met "?")
- **3 niveaus**:
  - 🌱 **Beginner** — modal interchange (geleende akkoorden uit parallel mineur): iv, ♭VI, ♭VII
  - 🎓 **Intermediate** — voegt secundaire dominanten toe: V7/ii, V7/V, V7/vi, V7/IV
  - 🏆 **Advanced** — tritone subs (♭II7) + chromatic mediants (III, ♭VI)
- **4 progressie templates**: I-V-vi-IV, ii-V-I, vi-IV-I-V, I-vi-IV-V
- **5 toonsoorten**: C/D/F/G/A
- 🎵 App speelt de progressie af **zonder** het target akkoord (silent), dan moet jij invullen
- **Live judging**: speel 3+ noten tegelijk op je piano → app matcht tegen geldige substituties
- **Scoring per type**: ✅ correcte sub identified + uitleg ("Tritone sub — chromatische dalende bas")
- **Hint-mode toggle**: toont mogelijke alternatieven vooraf
- 👁 **Reveal antwoorden** knop voor opgeven
- Achievements: `🔄 Eerste reharm correct`, `🎷 25 reharms correct`

### v0.73 ✅ — Listen-Along Mode
- 🎧 Luister naar **echte uitvoeringen** parallel aan je MIDI-oefenen
- **2 bronnen**:
  - 📺 **YouTube** — embed via `listType=search`, geen API-key nodig. Auto-search op stuk-naam + "piano"
  - 🎵 **Spotify** — paste een open.spotify.com URL → auto-converteer naar embed
- **Repertoire-dropdown**: kies stuk uit je library, app laadt automatisch suggested uitvoering
- 🔍 **Handmatige zoekterm**: bv "Chopin prelude horowitz" voor specifieke uitvoeringen
- 💾 **Onthoud deze versie**: per stuk kun je je favoriete uitvoering vastpinnen (`store.listenAlongPrefs`)
- **Auto-load bij stuk-wissel**: zodra je een MIDI laadt, opent Listen-Along met de opgeslagen of suggested versie
- **Use case**: luister 2× volledig naar Argerich's Chopin vóór je oefent → je oren imiteren wat ze horen → Self-Review na om verschillen te zien
- Achievement: `🎧 Eerste Listen-Along sessie`

### v0.74 ✅ — UX Overhaul: Compact Topbar + Command Palette + Welcome Hub + Tour
Na 73 versies waren er 69 topbar-knoppen — chaotisch. v0.74 lost dit volledig op:

**🎨 Compact Topbar** (vervangt 60+ knoppen):
- **🧭 Start sessie** als prominente primary CTA (gradient, schaduw)
- **7 categorieën als dropdowns**: Practice / Learn / Perform / Analyze / Plan / Tools / Settings
- Elke categorie heeft eigen icon + kleur + beschrijving + features met hint-tekst
- Klik buiten dropdown sluit alles automatisch
- Original topbar feature-buttons krijgen `.feature-grouped` class → hidden via CSS
- Player-essentials (▶/⏸, wait, loop, secties, TV) blijven zichtbaar in originele topbar

**⌘K Command Palette** (power-user shortcut):
- Druk **Ctrl+K** of **⌘K** vanaf overal → zoek-modal opent
- Fuzzy search door alle 60+ features (label + categorie + hint)
- Score-based ranking (substring > letter-by-letter)
- ↑↓ navigeren, ↵ openen, Esc sluiten
- Per command toont: icon + label + categorie + hint
- Tracking: `store.cmdPaletteUses++` per gebruik
- Achievement bij 20× gebruik

**👋 Welcome Hub** (first-run experience):
- Verschijnt 800ms na page-load voor first-time users (`!store.welcomeHubDismissed && !store.tourCompleted`)
- 🎹 Big logo + titel + subtitle
- **🧭 Start vandaag's sessie** primary action (gradient banner)
- **6 quick-tiles** (Theorie / Sight / Repertoire / Tutor / Analytics / Quick Search)
- **Status grid** voor returning users: Level / Streak / Theorie % / Stukken / XP
- **🎓 Geef me een tour** opent onboarding-tour
- "Naar de app →" / "Niet meer tonen" opties
- "?" knop in compact topbar her-opent Welcome Hub on demand

**🎓 Onboarding Tour** (5 stappen):
- Spotlight-overlay (gradient mask) op target-element
- Tooltip met titel + uitleg + Vorige/Volgende/Sluit knoppen
- Stappen: Start-sessie knop → Categorieën → Quick Search → Player controls → Klaar
- Smooth transitions, auto-positie naast highlight

**📱 Mobile-responsive**:
- Compact topbar wrapt op smalle schermen
- Dropdowns nemen volledige breedte
- Search-knop verbergt keyboard hint
- Welcome Hub heeft kleinere padding op mobile

**Impact**: van 60+ zichtbare knoppen naar **9 elementen** (1 CTA + 7 dropdowns + search + help). Discovery via Command Palette, organisatie via categorieën, onboarding voor nieuwe gebruikers.

Achievement: `⌨ 20× Command Palette gebruikt`

### v0.75 ✅ — Smart Fingering Display (progressive disclosure)
Vingerzetting-info zonder visuele overload. Bouwt voort op bestaand v0.19 auto-fingering algoritme maar voegt **4 disclosure-modes** toe:

**🚫 Off** (default): geen vinger-info — pure piano-ervaring

**🤚 Hand-positie** *(aanbevolen)*: floating widget rechtsonder met 2 regels:
- RH: 1=C · 5=G
- LH: 5=C · 1=G

Update real-time elke 100ms. Detecteert min/max midi van komende 4 sec aan noten per hand. Pianisten denken in **posities**, niet per noot — dit matcht je mentale model. Minimaal storend.

**🎯 Volgende noot**: badge op de keyboard-keys zelf voor de eerstvolgende te spelen noot/akkoord.
- Geel badge (RH) of blauw (LH) boven de juiste key
- Klein pulsende cirkel met finger-nummer (22px)
- Verandert real-time naarmate je speelt
- Geen falling-note clutter

**📜 Subtiel — alle noten**: bestaande v0.19 gedrag — kleine vinger-nummers op alle vallende noten. Voor grondig stuk leren.

**👁 Section preview** (bonus):
- Knop in fingering-modal: "Toon fingering voor actieve sectie"
- Opent statisch overlay: SVG-notenbalk met alle finger-nummers als gele cirkels onder elke noot
- RH + LH apart getoond (treble + bass sleutel)
- Werkt op actieve loop/sectie of eerste 8 maten
- Studieer vóór je gaat spelen → makkelijker dan tijdens

**State-persistence**: gekozen modus opgeslagen in `store.fingeringMode`, herladen bij elke sessie.

**Toegankelijk via**: `🖐 Fingering Helper` in **📚 Learn** categorie of via ⌘K → typ "finger".

**Slim**: alle modes gebruiken hetzelfde berekende fingering — algoritme draait 1× bij song-load.

Achievement: `🖐 Vingerzetting-modes verkend (3+ modes geprobeerd)`

### v0.77-0.83 ✅ — Voice Journal · UX overhaul · Stability/test-suite · Inspiration Layer · Season Recap · Mock Concert · Pianist Personas
(Zie git-history + HANDOVER.md voor details. Compacte topbar met 7 categorie-dropdowns + ⌘K command palette, self-test suite via ?test=1/?test=2, 50 quotes + confetti + atmosphere, Wrapped-stijl recap, 4 concert-venues, 6 pianist-personas.)

### v0.84 ✅ — Adult Learner Layer (40+ coaching-framework, alle 13 auditpunten)
Doorvoering van een audit tegen een 40+ coaching-rubric. Per punt:
- **#1 Ritme-mastery los van tempo** — `computeSongMastery` krijgt `rhythmStars` (♪♪♪) die alleen nauwkeurigheid + timing beloont, géén tempo-gate. Zichtbaar naast de polish-sterren in Repertoire.
- **#2 Hand-synchronisatie-diagnose** — Self-Review meet per maat het LH↔RH timing-verschil, flagt maten >60ms uit elkaar (de #1 volwassen-bottleneck).
- **#3 Piece-linked theorie** — `🎼 Dit stuk` paneel: structuur + gekoppelde concepten + directe link naar de juiste Gym-les, per stuk.
- **#4 Timing- vs noot-fouten apart** — diagnose splitst "RITME-probleem" vs "NOTEN-probleem" vs "gemengd" met passend advies.
- **#5 Moeilijkheid gedecomponeerd** — per stuk: hand-onafhankelijkheid (zwaarst gewogen) > tempo > stretch > akkoorden, + aanbevolen leervolgorde (RH-melodie/simpele LH eerst).
- **#6 Coach eindigt op beheerst stuk** — laatste sessie-stap = victory lap op een 3★+ stuk, niet op een struikelpunt.
- **#7 Warm-up met beheerst stuk** — knop in warm-up modal: speel iets dat in je vingers zit i.p.v. Hanon.
- **#8 Normalisatie hand-onafhankelijkheid** — expliciete framing in Self-Review: "dit is voor volwassenen by design lastiger, niet omdat je iets fout doet."
- **#9 Auto micro-segment** — fout-clusters worden gedetecteerd → "Oefen maat X-Y geïsoleerd" met één-klik loop (2-4 maten).
- **#10 Recap zonder generieke benchmarks** — "top 5% van leerlingen" / "conservatorium" herschreven naar eigen-baseline.
- **#11 Volwassen-modus** — toggle: vervangt confetti-aanmoediging door concrete voortgangsdata.
- **#12 Structurele primer** — bij laden van een stuk verschijnt de structuur als toast ("AABA, A keert 3× terug — leer A eerst").
- **#13 Express-sessie (10 min)** — knop in Coach: warm-up beheerst stuk → 1 micro-segment → afsluiten op succes.

### v0.85+ — Toekomstige ideeën
- 🎼 Sheet music alternative view (VexFlow integratie)
- 🆚 Audio recording met diff naar expected (via MediaRecorder)
- 🌍 Multi-user / cloud sync via Supabase
- 🎹 Velocity-curve calibratie per piano
- 📤 Share recording via URL (Base64-encoded MIDI in querystring)
- 🏷️ Tags/categories voor songs (franchise, mood, era)
- 🤝 Practice buddy: deel je progress met een vriend(in) via QR/URL
- 📺 TV/cast mode: show alleen falling notes op groot scherm
- 🔊 Audio per-channel mixing (orkest-MIDIs scheiden in piano vs strings)
- 👂 Ear training melody mode (4-noten reeks)
- 🎯 Custom goal builder — eigen goals naast defaults
- 🏆 XP leaderboard via shared URL
- 💪 Streak freezes (1× per week pauze zonder streak verlies)
- 📊 Per-composer mastery stats (Mozart: 1/1, Einaudi: 1/3, etc.)
- 🎁 Unlocks per level (Lv5 = nieuwe theme, Lv10 = exclusieve achievement)
- 🎼 Scale practice tracking — sla je snelste tempo per scale op
- 🎹 Manual fingering override — klik op falling note om vinger aan te passen
- 📐 Chord progression analysis bij geladen song (toont I-V-vi-IV etc.)

---

## Bestanden

- `index.html` — de app
- `songs/` — MIDI-bestanden van de 7 songs (we downloaden ze één voor één)
- `progress.json` — wordt automatisch gegenereerd door localStorage export
- `roadmap.md` — dit bestand
- `piano-learning-plan.md` — de inhoudelijke leerroute (apart van de tool)

---

## Beslissing nu

We bouwen v0.1 in deze sessie. Jij sluit piano aan op PC, opent het HTML-bestand in Chrome, drukt een toets in. Werkt het → we gaan door naar v0.2. Werkt het niet → we debuggen (Web MIDI heeft soms een driver-quirk op Windows).
