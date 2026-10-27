# KNIFE HAND // Speed Typer Survival (Beta)

An intense arcade speed typing game inspired by the legendary knife game (Five Finger Fillet).

---

## Game Concept & Rules

- **5 Lives Max**: You start with all 5 fingers placed flat on the wooden board.
- **Survival Penalty**: Every single keystroke typo costs one life and causes the razor-sharp knife to plunge directly into the next finger.
- **Ascending Difficulty**: After each completed phrase, the difficulty increases:
  - **Level 1 (Novice)**: Smooth, lowercase words to establish your rhythm.
  - **Level 2 (Apprentice)**: Capital letters, standard punctuation, and longer sentences.
  - **Level 3 (Challenger)**: Apostrophes, semicolons, dashes, and complex vocabulary.
  - **Level 4 (Master)**: Quotation marks, numbers, double consonants, and fast finger transitions.
  - **Level 5+ (Bloodbath)**: Extreme tongue-twisters, symbols, and high-cadence procedural sentences!
- **Game Over**: Once all 5 fingers are struck (0 lives left), you lose. Your peak WPM, accuracy %, phrases cleared, and personal best are recorded.
- **One Phrase**: Complete one phrase as quickly and accurately as possible.
- **Infinite**: Practice without lives or game over; mistakes still trigger error feedback.
- **One Minute**: Type as many complete words as possible in 60 seconds. Your word-count personal best is saved locally.

---

## Interface & Visual Rig

- **Hand and Knife Assets**: Uses the provided hand and knife PNGs, with the knife aimed at distinct finger targets.
- **Survival Plunge & Impact Animation**: On Survival errors, the blade plunges into a finger, the screen shakes, and blood splatter particles hit the cutting board.
- **Error Feedback in Every Mode**: Mistakes trigger visual feedback in every mode; only Survival includes the knife strike, injury effects, and life loss.
- **Impact Effects**: Survival strikes mark the struck finger and leave blood droplets on the wooden table.
- **Danger Mode**: When you are down to your last finger (1 life left), a pulsing red vignette and heartbeat audio kick in!
- **Reduced Motion**: Interface animations respect the device's reduced-motion preference.

---

## Zero-Dependency Web Audio Sound FX

All audio is synthesized in real-time with the browser's Web Audio API (no external MP3/WAV downloads or broken URLs):
- Crisp mechanical switch keypress clicks
- Aerodynamic blade swoosh
- Deep bone/wood knife impact thud
- High-pitched metallic blade scrape
- Tense heartbeat pulse on 1 life left
- Harmonic level completion chime
- Dissonant Game Over chord

---

## How to Run

Simply open `index.html` in any modern web browser (Chrome, Edge, Firefox, Brave, Safari):

```bash
# Double-click index.html or open via command line:
start index.html
```

Or run a local static server if preferred:
```bash
python -m http.server 8000
```
Then navigate to `http://localhost:8000`.

---

## Controls
- **Any Key / Click**: Place hand and start typing.
- **Space / Enter**: Start game or restart from Game Over screen.
- **Backspace**: Rewind cursor if needed.
- **Sound Icon**: Toggle audio on / off.
- **Restart Icon**: Reset current run.
- **Mode Key (1-4)**: Select a game mode from the mode menu.

---

## Support & Creator Credits

Knife Hand is an open-source project created and maintained by **Daniele Ciafrei** (`@Antareskrrt`).
- **GitHub**: [https://github.com/Antareskrrt](https://github.com/Antareskrrt)
- **LinkedIn**: [https://www.linkedin.com/in/daniele-ciafrei-87786630a/](https://www.linkedin.com/in/daniele-ciafrei-87786630a/)
- **Discord**: [https://discord.com/users/749546843540684881](https://discord.com/users/749546843540684881)
