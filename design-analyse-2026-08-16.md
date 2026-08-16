# Piano Coach — Design-analyse + stappenplan

> **Status per 16 augustus 2026: alle zes fases zijn uitgevoerd in v0.87** (7 commits, zie `git log`).
> Resultaat gemeten: chrome boven het speelveld 330px → 103px (desktop) en 995px → 51px (mobiel),
> instrument krijgt 73% van het telefoonscherm, 0 knoppen onder 32px (44px op touch),
> 0 tekst onder 11px, 0 van 74 tekstelementen onder 4,5:1 contrast, 0 console-errors.
> Klavier op het scherm is nu overal speelbaar. Voor/na-beelden: `design-review-2026-08-16/na-*.png`.
> Twee regressies onderweg gevonden en gefixt: circulaire tokens (witte pagina) en thema's die
> niet meer wisselden. Details staan per fase in de commit-berichten.

**Datum:** 16 augustus 2026 · **Versie bekeken:** v0.86 · **Rol:** senior product designer
**Methode:** headless Chromium op `http://localhost:3457` met de echte backup (`piano-coach-backup-2026-08-16.json`) in localStorage, op 1440×900 en 390×844. Plus statische analyse van de 3.640 CSS-regels en de DOM.
**Screenshots:** [`design-review-2026-08-16/`](design-review-2026-08-16/)

---

## 1. Diagnose in één zin

Het product is functioneel rijk en visueel arm: er zijn 75+ modes, 342 knoppen en 53 modals, maar er is geen ontworpen hiërarchie die zegt *waar je kijkt, wat je nu doet en waarom dit mooi is*. Het instrument, het enige dat er echt toe doet, staat onderaan de pagina achter acht banden interface.

Dat sluit aan op het activatieprobleem uit de productanalyse: 85 versies gebouwd, 8,8 minuten ooit gespeeld. Dat is geen featureprobleem. Het is een ontwerp- en drempelprobleem.

### Harde cijfers uit de code

| Meting | Waarde | Waarom dit pijn doet |
|---|---|---|
| Knoppen in de DOM | 342 (34 tegelijk zichtbaar) | Geen enkele actie kan zich onderscheiden |
| Modal-overlays | 53 | Elke feature is een eigen eiland, geen doorlopende flow |
| Unieke hex-kleuren in CSS | 84 (tegenover 16 CSS-variabelen) | Geen tokensysteem, dus geen consistentie mogelijk |
| Font-sizes ≤ 13px | 434 declaraties | 90% van alle tekst is te klein voor comfortabel lezen |
| Border-radius-waarden | 9 verschillende (2 t/m 999px) | Vormtaal is toevallig, niet ontworpen |
| Z-index-waarden | 22, oplopend tot 99999 | Stapelvolgorde is per feature bedacht |
| Media queries | 4 stuks voor 27.097 regels HTML | Mobiel is een nagedachte |
| Chrome boven het klavier | ~330px desktop, ~800px mobiel | Je ziet je piano pas na scrollen |
| Contrast `--muted` op `--panel` | 4,12:1 | Zakt onder WCAG AA (4,5:1) voor bodytekst |
| Contrast toets-labels op witte toets | 3,25:1 | Onleesbaar op de plek waar je moet kijken |
| Contrast knop-rand op knop-vlak | 1,21:1 | Knoppen hebben feitelijk geen zichtbare rand |

---

## 2. Negen bevindingen

### B1 · Drie navigatielagen bovenop elkaar — KRITIEK

De pagina opent met acht horizontale banden voordat er muziek in beeld komt:

1. `#v86-bar` (Dashboard / Trechter + hervat-tekst)
2. `.compact-topbar` (Start sessie + 7 categorie-dropdowns + zoek + help)
3. `.topbar` (MIDI-status, pomodoro, 3 theme-bolletjes, XP-balk)
4. `.controls` (afspelen)
5. `.controls.row2` (13 overgebleven oefen-knoppen)
6. `.sections-bar`
7. `.progress-wrap`
8. `.stats` (5 kaarten die bij het openen allemaal 0 tonen)

De v0.83-refactor voegde een categoriemenu toe maar verwijderde de oude rijen niet: `hideOriginalFeatureButtons()` verstopt de features en laat 16 "player-essential" knoppen staan. Het resultaat is niet één navigatie, het zijn er drie die om dezelfde ruimte vechten.

### B2 · Geen hiërarchie in acties, twee accentkleuren die strijden — KRITIEK

Er zijn 34 knoppen tegelijk zichtbaar en ze wegen visueel allemaal even zwaar: dezelfde hoogte, dezelfde grijstint, dezelfde 12px tekst met een emoji ervoor. De enige uitzonderingen zijn `Start sessie` (paars `#6366f1`, uit de nieuwe laag) en `Speel` (groen `#4ade80`, uit de oude laag). Twee primaire kleuren betekent geen primaire kleur.

De emoji doen daar bovenop dienst als iconenset. Ze hebben geen gedeelde vormtaal, geen gelijke optische grootte en geen kleursysteem, dus ze maken de rij drukker in plaats van scanbaarder.

### B3 · Het instrument is niet de held — HOOG

De falling-notes-canvas is 2080×400px zwart vlak zonder enige structuur: geen baanlijnen per toets, geen maatstrepen, geen octaafmarkering, geen highlight van de witte-toets-kolommen. De blokken zweven in het niets en de relatie tussen een blok en de toets eronder moet je zelf reconstrueren over 88 toetsen breed.

Het klavier zelf is een rij platte rechthoeken (`#f5f5f5` en `#1a1a1a`, 1px zwarte rand) met op elke toets een label. Bij 88 toetsen is dat 88 stukjes 9px tekst met contrast 3,25:1: ruis op de plek waar je oog moet landen.

### B4 · Typografie, tapdoelen en contrast halen de norm niet — HOOG

Bijna alles is 9 tot 13px, ook in modals die je minutenlang leest. Knoppen hebben `padding: 5px 11px`, wat 24 tot 28px hoge knoppen oplevert: 19 van de 34 zichtbare knoppen op desktop en 20 op mobiel blijven onder de 32px. De richtlijn voor touch is 44px.

Contrast: `--muted #7a8290` haalt 4,12:1 op `--panel` en 3,58:1 op `--panel-2`, allebei onder AA voor tekst van deze grootte. De knop-rand `#2d3a4f` op `#232d3d` haalt 1,21:1, dus de rand doet visueel niets.

### B5 · Geen designsysteem onder de UI — MIDDEL, maar het blokkeert al het andere

84 losse hex-kleuren tegenover 16 variabelen. Negen radius-waarden. Spacing in willekeurige px-waarden per component. Z-index tot 99999. Er is dus geen laag waarop je één keer iets verandert en het overal klopt. Elke nieuwe feature herhaalt daarom noodgedwongen de bestaande onregelmatigheden.

### B6 · Mobiel is een geschaalde desktop — HOOG

Op 390px is het document 1.461px hoog voordat je de piano bereikt op ~1.180px. De statistiekenkaarten breken naar een raster met een gat, het klavier scrollt horizontaal zonder enige aanwijzing dat er meer is, en `.controls.row2` wordt vier regels knoppen. Er zijn vier media queries in het hele bestand.

De Touch-piano bestaat sinds v0.49 en is precies de mobiele oplossing, maar hij zit weggestopt in een dropdown in plaats van dat hij de mobiele modus ís.

### B7 · Er is bijna geen feedback-laag — HOOG

De enige transitions in het bestand zijn `background 60-80ms` op knoppen en toetsen. Een juiste noot geeft dus een kleurvlakje en verder niets. Een foute noot idem. Er is geen viering bij een schone maat, geen zichtbare opbouw tijdens een run, geen ritme in de beloning.

Tegelijk verschijnen bij het openen ongevraagd twee informatiekaarten rechtsonder die over elkaar heen stapelen, plus een welkomstmodal. De app praat veel op momenten dat je niets doet, en zwijgt op het moment dat je speelt.

### B8 · De sessie is een lijst, geen flow — HOOG

De Smart Coach-modal is inhoudelijk het beste onderdeel van de app: zeven stappen, elk met tijd en uitleg. Maar het zijn zeven identieke `Start`-knoppen. Er is geen "start de hele sessie", geen voortgang door de zeven stappen, en na stap 1 keer je niet terug. Wat als een begeleide sessie is bedacht, gedraagt zich als een menukaart.

### B9 · De belangrijkste foutmelding is het kleinste element — HOOG

Zonder MIDI werkt de kern van de app niet. Die staat er als grijze pil van 11px: `MIDI geweigerd: Permission to use Web MIDI API was not granted.` Geen uitleg, geen knop, geen route naar de Touch-piano die dit oplost. Dit is de eerste ervaring van elke nieuwe browser en elk nieuw apparaat.

---

## 3. De richting

Vijf principes waar elke beslissing hierna aan getoetst wordt.

1. **Het klavier is de held.** Alles wat niet helpt om nú te spelen, gaat weg, klapt in of verhuist naar een paneel.
2. **Eén primaire actie per scherm.** Eén accentkleur voor "doe dit", alles daarnaast is secundair of rustig.
3. **Modes zijn bestemmingen, geen knoppen.** Je komt er via de sessie of via zoeken, niet via een muur van 34 knoppen.
4. **Feedback op het moment dat je speelt.** De app is stil als je leest, en expressief als je een toets raakt.
5. **Eén systeem, geen laagjes.** Tokens voor kleur, type, ruimte, radius, elevatie. Nieuwe features erven het systeem in plaats van het opnieuw uit te vinden.

**Van acht banden naar drie:**

| Nu (8 banden, ~330px) | Straks (3 banden, ~120px) |
|---|---|
| v86-bar, compact-topbar, topbar, controls, controls.row2, sections-bar, progress, stats | **Kop** (stuk + status + zoeken + menu) · **Speelveld** (piano-roll + klavier, vult het scherm) · **Dock** (afspelen, tempo, hand, loop, live-stats) |

---

## 4. Stappenplan

Zes fases, elk apart afrondbaar en los te releasen. Volgorde is niet vrij: fase 0 maakt fase 1 t/m 5 goedkoop.

### Fase 0 · Fundament (±4 uur)

**Doel:** één set tokens waar de rest op bouwt.

- Vervang de 84 losse hex-waarden door een tokenlaag: `--surface-0/1/2`, `--text-1/2/3`, `--line`, `--accent`, `--ok`, `--warn`, `--bad`, `--hand-r`, `--hand-l`.
- Typeschaal met vier stappen in plaats van elf: 12 (label) / 14 (body) / 18 (subkop) / 28 (kop). Minimum voor bodytekst wordt 14px.
- Ruimteschaal 4/8/12/16/24/32. Radiusschaal 6/10/999. Elevatie in drie stappen, z-index-ladder 100/200/300 in plaats van 22 losse waarden.
- Contrast repareren: `--text-3` naar minimaal 4,5:1 op elk oppervlak, toetslabels naar 4,5:1, knop-randen zichtbaar maken (minimaal 3:1 tegen het vlak).
- Knopmaten: 36px hoog op desktop, 44px zodra `pointer: coarse`.

**Klaar als:** één zoekactie op `#` in de CSS levert alleen nog tokendefinities op, en de contrastcheck op de vijf gemeten paren staat overal boven 4,5:1.

### Fase 1 · Eén navigatielaag (±1 dag)

**Doel:** van drie navigaties naar één, en van acht banden naar drie.

- Verwijder `#v86-bar` en `.topbar` als aparte banden. Wat er staat gaat naar de kop (stuk + tempo + MIDI-status) of naar het profielmenu (XP, streak, thema).
- Verwijder `.controls.row2` volledig. De 13 resterende knoppen verhuizen naar het dock (afspelen, wait, hand, loop) of naar de contextuele sectiebalk (bewaar, split).
- De 7 categorie-dropdowns blijven, maar worden één menuknop plus de bestaande ⌘K-zoeker. Zet de zoeker prominent: dat is voor 75+ modes de enige schaalbare ingang.
- Statistiekbalk gaat weg als vaste band. Tijd, hits, gemist, accuracy horen in het dock, klein en tabular, en alleen tijdens het spelen.
- Themawissel en pomodoro verhuizen naar Instellingen.

**Klaar als:** op 1440×900 begint het speelveld boven 140px, en op 390px boven 180px.

### Fase 2 · Het instrument als held (±1,5 dag)

**Doel:** de piano-roll wordt het mooiste onderdeel van de app in plaats van een zwart vlak.

- Baanstructuur op de canvas: subtiele verticale kolommen per toets, donkerder voor zwarte toetsen, zodat een blok altijd visueel op zijn toets rust.
- Maatstrepen en tellen: lichte horizontale lijn per maat, iets sterker per 4 maten, met maatnummer in de marge. Dit maakt loops en secties leesbaar zonder extra UI.
- Noteblokken: afgeronde hoeken, verticaal verloop, lichte binnenschaduw, en een korte "staart" die aangeeft hoe lang je de toets vasthoudt. Rechterhand en linkerhand krijgen een eigen kleurfamilie in plaats van blauw versus oranje op volle verzadiging.
- Naderingsindicatie: blokken die de hitlijn naderen worden helderder. De hitlijn zelf krijgt een zachte gloed die meeademt op de beat.
- Klavier: witte toetsen met warm verloop en een schaduwkant, zwarte toetsen met glans, ingedrukte toets zakt 2px met een schaduw. Toetslabels alleen op C's en alleen tijdens leermodi, niet op alle 88.
- Verticale ruimte: het speelveld wordt `min-height: 60vh` in plaats van vaste 400px.

**Klaar als:** iemand die de app niet kent kan aanwijzen welke toets bij welk blok hoort, zonder uitleg.

### Fase 3 · De feedback-laag (±1 dag)

**Doel:** het moment van spelen wordt beloond.

- Raak: korte ring-puls op de toets plus een oplichtende veeg op de hitlijn, 180ms, met `prefers-reduced-motion` respect.
- Mis: geen rood knipperen van het hele blok maar een zachte schud van 2px op de toets, zodat fouten niet straffen.
- Combo: bij 8, 16, 32 goede noten op rij een oplopend lint langs de hitlijn plus een oplopende toon.
- Maat schoon gespeeld: de maatstreep licht kort op. Sectie schoon: één korte confetti-puls, niet meer.
- Toasts krijgen een wachtrij met maximaal één tegelijk, en ze zwijgen tijdens het spelen.
- Welkomstmodal verdwijnt bij terugkerend gebruik. Wie al data heeft, ziet meteen de app plus één regel "Verder met Prelude in E minor".

**Klaar als:** een sessie van 60 seconden minstens drie momenten heeft waarop de app zichtbaar reageert op wat jij deed.

### Fase 4 · De sessie wordt een flow (±1 dag)

**Doel:** de Coach-sessie loopt door in plaats van dat hij zeven keer stopt.

- Eén primaire knop "Start sessie (28 min)". De zeven stappen worden een voortgangsrail bovenaan het scherm.
- Na elke stap komt de rail terug met "Klaar. Volgende: Noten lezen, 5 min" plus overslaan.
- De rail blijft zichtbaar in elke mode, zodat je nooit verdwaalt in een modal.
- Afsluiter: één samenvattingsscherm met wat je deed, wat je won, en één regel voor morgen. Dat is ook het natuurlijke moment voor de journal-prompt.

**Klaar als:** je van start tot afsluiter komt zonder één keer een modal te hoeven sluiten om verder te kunnen.

### Fase 5 · Touch-first en toegankelijkheid (±1 dag)

**Doel:** de telefoon is een volwaardig apparaat, niet een geknepen desktop.

- Onder 768px: de Touch-piano is de standaard, niet een verstopte modus. Speelveld en klavier vullen het scherm, dock wordt een vaste balk onderaan met vier grote knoppen.
- Klavier op mobiel: 1,5 octaaf zichtbaar met schuif-affordance (vervagende rand plus mini-overzicht), in plaats van stille horizontale overflow.
- MIDI-foutstaat wordt een echte kaart: wat er mis is, wat je kunt doen, en een knop "Speel op het scherm".
- Alle interactieve elementen krijgen een zichtbare focusring, alle modals een focus-trap en Esc, en de iconen-emoji krijgen `aria-hidden` met een tekstlabel ernaast.

**Klaar als:** je op de telefoon binnen 10 seconden na openen een noot kunt spelen zonder scrollen.

---

## 5. Meetlat

Design is hier geen smaakoefening: het doel is dat je de app vaker en langer gebruikt. Meet daarom vier dingen, allemaal al lokaal beschikbaar via de bestaande `timeLog`:

| Meting | Nu | Doel na fase 5 |
|---|---|---|
| Tijd tot eerste noot na openen | onbekend, minimaal enkele scrolls | onder 10 seconden |
| Hoogte van de interface boven het speelveld (desktop) | ~330px | onder 140px |
| Sessies die verder komen dan stap 1 van de Coach | onbekend | meer dan de helft |
| Speeltijd per week | 8,8 minuten totaal ooit | 30 minuten per week |

---

## 6. Wat ik expliciet niet zou doen

- **Geen nieuwe modes tot fase 5 klaar is.** Er zijn 75+ modes en 8,8 minuten speeltijd. Feature 76 lost dat niet op.
- **Geen extra thema's.** Eerst één thema dat klopt, dan pas varianten.
- **Geen framework-migratie.** Het bestand van één HTML is een kracht, niet het probleem. Alle zes de fases zijn haalbaar binnen `index.html`.
- **Geen gamification erbij.** XP, levels, streaks, freezes, achievements, daily challenges en goals bestaan al. Ze zijn nu alleen niet zichtbaar op het moment dat ze zouden moeten motiveren.

---

**Bijlage:** screenshots in [`design-review-2026-08-16/`](design-review-2026-08-16/) — `desktop-1440.png`, `mobiel-390.png`, `dropdown-menu.png`, `coach-modal.png`, `welcome-hub.png`.
