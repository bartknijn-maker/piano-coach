# Piano Coach v0.88 — "Verliefd worden" (werktitel: Podium)

**Datum:** 2026-08-17
**Status:** Spec klaar, wacht op bouw-GO
**Voortgekomen uit:** PM-sparringsessie 2026-08-16/17 (social → stok achter de deur → verliefd worden)

---

## 1. Doel en North Star

**Productdoel:** Bart wordt verliefd op piano spelen. Niet op de app, op het spelen.

**North star (bestaande lat, ongewijzigd):** drie weken lang, drie sessies van 20 minuten per week, gespeeld op de CLP-725. Pas als die lat gehaald is, verdient de app de stap "ook voor anderen".

**Kernreframe uit de sessie:**
- De app is de coach en de ogen. De **Yamaha CLP-725** is het instrument, de handen en de oren.
- **Mama** (Nederland) is de stok achter de deur, nooit een gebruiker van de app. Haar interface is WhatsApp.
- Druk brengt je op de kruk; wat er in de 20 minuten gebeurt bepaalt of je terugkomt. Beide motoren worden ontworpen: de stok (extrinsiek, tijdelijk) en de vonk (intrinsiek, blijvend).
- Liefde volgt kunde: elke sessie moet minstens één moment bevatten dat als échte muziek klinkt.

## 2. Besluiten

| # | Besluit | Rationale |
|---|---------|-----------|
| B1 | **Actief stuk: Nuvole Bianche** (`songs/nuvole-bianche.mid`) | Repeterende, simpele linkerhand: ideaal voor duet-begeleiding en snelle eigen beheersing. Iconische hook. Klinkt binnen een week als muziek. |
| B2 | **Droomstuk: Clair de Lune** — zichtbaar als horizon, niet in het schema | Maanden verderop qua niveau. Als droomstuk motiveert het; als startstuk bewijst het drie weken lang "ik kan het niet". |
| B3 | **Device week 1: laptop op de lessenaar** (Chrome, Web MIDI native) | Werkt vandaag. "Wat groot" is acceptabel voor de testperiode. |
| B4 | **iPad-route: gratis, geen native app.** Test "Web MIDI Browser" (gratis App Store-app, Web MIDI-polyfill) met de GitHub Pages-URL | Native app kost €99/jr en is onnodig. Safari mist Web MIDI; de polyfill-browser omzeilt dat. Test van 10 minuten. |
| B5 | **Kabel:** USB-B (CLP "USB TO HOST") naar USB-A/USB-C — standaard printerkabel | Paar euro, waarschijnlijk al in huis. |
| B6 | **Meting alleen in oefenfase, nooit in de concertrun** | Liefde en beoordeling gaan slecht samen. De concertrun is meetvrij. |
| B7 | **Mama krijgt nooit de app** | Geen account, geen link, geen installatie. Fragmenten via WhatsApp, spraakberichten terug zijn de beloningsloop. |
| B8 | **Eén stuk tot de lat gehaald is** | 3 van 38 stukken ooit geladen. De 37 andere zijn ruis tot Nuvole Bianche staat. |

## 3. Features

### F1 — Web MIDI-koppeling (fundament, eerst bouwen)
De CLP-725 verbindt via USB TO HOST met de browser (Web MIDI API).

- Noten van de piano komen binnen in de app: pitch, timing, velocity.
- **Auto-mute:** zodra een MIDI-input verbonden is, zwijgt de interne synth volledig. De CLP maakt het geluid.
- **Sessie-autodetectie:** piano verbonden + noten gespeeld = sessie gelogd. Nul handmatige invoer. Dit voedt de trechter-meting (stap 2 van het bestaande plan) met échte data.
- Acceptatie: een toets op de CLP is <50 ms zichtbaar in de app; een sessie verschijnt in de log zonder enige handeling.

### F2 — Duet-begeleiding door de piano zelf
Tijdens hand-isolatie (rechterhand oefenen) stuurt de app de linkerhand als MIDI **naar** de CLP, die hem afspeelt met dezelfde vleugelklank.

- v1: vast tempo, instelbaar (bijv. 60–100% van doeltempo). Geen tempo-following; dat is v0.89+.
- Werkt per sectie; begeleiding start/stopt met de sectie.
- Acceptatie: rechterhand oefenen op sectie 1 van Nuvole Bianche klinkt als het echte stuk, uit de piano-speakers.

### F3 — Concertrun met auto-opname (peak-end)
Vast slot van elke sessie: de laatste ±2 minuten zijn een doorloop van alles wat tot nu toe beheerst is, mét begeleiding, **meetvrij**.

- De run wordt als MIDI opgevangen en in de app naar audio gerenderd (Salamander-samples of vergelijkbaar) — schoon, geen omgevingsgeluid.
- Elke opname wordt bewaard met datum: het **"dan vs. nu"-archief**. Na twee weken hoor je je eigen vooruitgang; dat is de sterkste intrinsieke beloning die we kunnen bouwen.
- Eén tik: deel naar WhatsApp (wa.me-link met begeleidende tekst).
- Acceptatie: sessie eindigt standaard in de concertrun; opname staat direct klaar om te delen.

### F4 — Podium-modus als startscherm
De app opent voortaan in een scherm met precies deze elementen:

1. Het actieve stuk (Nuvole Bianche) + voortgang in secties
2. Countdown mama-week ("fragment nog niet verstuurd · deadline zondag")
3. Drie knoppen: **Speel** · **Concertrun** · **Stuur naar mama**
4. Klein, onderaan: droomstuk Clair de Lune als horizon
5. Bouw-gate kaartje (F6)

De volledige werkplaats (alle modes, alle stukken, instellingen) zit achter één bewuste extra klik. De 342 knoppen en 53 modals verdwijnen niet, ze verdwijnen uit het zicht.

### F5 — Mama-week (stok achter de deur)
- **Ritme:** elke week één concertrun-fragment naar mama, dag maakt niet uit (bellen is op wisselende dagen). Deadline: zondag 23:59.
- **Aankondiging (eenmalig, handmatig):** voorgevuld WhatsApp-bericht waarin Bart het project aankondigt en de verwachting zet dat zij mag navragen. De app communiceert nooit zelf met mama.
- **Horizon-deadline:** het hele stuk live spelen bij het eerstvolgende bezoek (NL of Valencia), datum invullen zodra bekend. De app genereert een concertprogramma-kaartje bij het aankondigen.
- **Druk-kanalen:** `.ics`-export met 3 oefenmomenten per week + de optreden-datum, mét alarmen (de telefoonagenda doet het notificatiewerk). In-app countdown. Nudge-regels: stilte als het goed gaat, signaal alleen bij achterstand, escalerende cadans in de laatste week voor het optreden.

### F6 — Bouw-gate (zacht)
Kaartje op het podium-scherm: **"2 van 3 sessies deze week · bouwen ontgrendeld bij 3"**.

- v1 is zacht: geen harde blokkade, wel een zichtbare afspraak met jezelf. Bouwen aan de app is de sterkste concurrent van spelen op de piano (85 versies vs. 8,8 app-minuten); dit kaartje koppelt de bestaande gewoonte (bouwen) als beloning aan de gewenste gewoonte (spelen).

## 4. Sessieritueel (geen code, wel het product)

1. Vast anker: einde van de middag, ramen open boven Ruzafa.
2. Laptop/iPad op de lessenaar, kabel erin (of blijft erin).
3. **60 seconden het origineel luisteren** (in-app knop, YouTube/lokaal audiofragment) — het oor krijgt het doel vóór de vingers het proberen.
4. Oefenfase: sectie van de week, hand-isolatie met duet-begeleiding (F2). Micro-winst: "deze acht maten af", niet "20 minuten vol".
5. **Concertrun** (F3): eindig op muziek, nooit op worstelen.
6. Minimumsessie op een rotdag: 5 minuten (alleen de concertrun). Regel: **nooit twee sessies op rij missen.**

## 5. Sectie-indeling Nuvole Bianche: hook-first

Niet beginnen bij maat 1. Sectievolgorde op herkenbaarheid:
1. De iconische hook (het deel dat iedereen herkent)
2. Intro
3. Opbouw/variaties
4. Slot

De hook is het eerste wat naar mama gaat.

## 6. Meting

- Trechter (bestaand plan, stap 2): geopend → stuk geladen → play → 60s → sectie-poging. Nu gevoed door echte MIDI-data i.p.v. schermtikken.
- Sessielog: datum, duur, secties, of de concertrun gedaan is.
- **v0.88 blijft localStorage-only.** Het Supabase-heartbeat-idee (cross-device meting + basis voor e-mail-nudges via de ochtendbriefing) is expliciet **v0.89+**, en alleen als de lat van 3 weken in zicht komt.

## 7. Niet doen in v0.88 (de valkuil van 85 versies)

- ❌ Geen nieuwe modes
- ❌ Geen speeltuin/freeplay (v0.89, als beloning na de lat)
- ❌ Geen arrangement-ladder (v0.89+)
- ❌ Geen tempo-following begeleiding
- ❌ Geen backend, geen accounts, geen push-notificaties
- ❌ Geen tweede stuk activeren
- ❌ Geen gamification/XP
- ❌ Geen design-refactor buiten het podium-scherm (het 6-fasen designvoorstel van 2026-08-16 blijft apart wachten op GO)

## 8. Risico's en open punten

| Risico | Mitigatie |
|--------|-----------|
| Web MIDI Browser-polyfill werkt niet lekker met de CLP op iPad | Laptop is het werkende plan A; iPad is comfort, geen voorwaarde |
| MIDI-naar-audio-render klinkt matig voor WhatsApp-fragmenten | Fallback: telefoonmic-opname van de CLP-speakers; minder schoon, wel echt |
| Scope creep tijdens het bouwen | Deze spec is het contract; alles buiten F1–F6 gaat naar BACKLOG |
| De echte test is gedrag, niet features | Kill-criterium hieronder |

**Kill-criterium:** als er na 3 weken met v0.88 live minder dan 5 echte sessies gelogd zijn, stoppen we met features bouwen en gaan we terug naar de ritueel/situatie-analyse. Geen v0.89 als antwoord op een gedragsprobleem.

**Open punten:**
- [ ] Datum eerstvolgende bezoek NL (of mama naar Valencia) → horizon-deadline
- [ ] iPad-test: Web MIDI Browser + GitHub Pages-URL + CLP (10 min)
- [ ] USB-kabel aanwezig? (USB-B naar A/C)

## 9. Bouwvolgorde

1. F1 MIDI-koppeling (fundament, alles hangt eraan)
2. F4 Podium-modus (zodat elke test-sessie meteen in de goede flow zit)
3. F2 Duet-begeleiding
4. F3 Concertrun + opname + deel-knop
5. F5 Mama-week (countdown, .ics, wa.me)
6. F6 Bouw-gate kaartje

Geschatte omvang: 3–4 bouwsessies. Maar de allereerste actie is geen code: **kabel in de piano, Chrome open, en vanavond gewoon een kwartier spelen.**
