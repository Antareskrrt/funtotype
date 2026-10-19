// KNIFE HAND // Dynamic Multi-Tiered Phrase Library & Anti-Repetition Engine

class PhraseDeckManager {
    constructor() {
        this.tiers = {
            // Level 1: Novice - Smooth, rhythmic, common lowercase words, warm-up pacing (32 phrases)
            1: [
                "keep your hand steady on the board",
                "quick brown fox jumps over the lazy dog",
                "fast fingers stay safe from the sharp edge",
                "do not hit the wood between the gaps",
                "feel the typing rhythm and breathe",
                "sharp eyes and a calm mind win the day",
                "type fast to survive every single round",
                "never look directly at the falling blade",
                "cold steel waits for your first mistake",
                "trust your fingers and hit the home row",
                "keep a light touch on every single key",
                "smooth is fast and fast is smooth",
                "stay calm when the tempo begins to rise",
                "every keystroke brings you closer to safety",
                "five fingers open wide on the wooden table",
                "clear your mind and watch the words fly",
                "the knife is swift but your hands are quicker",
                "find your groove and let the keys click",
                "speed comes from precision not rushing",
                "keep your palms relaxed and your wrists level",
                "watch each letter glow as you strike",
                "one clean motion from start to finish",
                "the wooden table echoes with every hit",
                "do not pause when the blade starts moving",
                "steady pace will carry you through",
                "listen to the mechanical switches snap",
                "relax your shoulders and focus ahead",
                "rhythm is the shield against the blade",
                "swift hands dance across the dark board",
                "no panic just pure mechanical focus",
                "glide smoothly across the keyboard space",
                "tap with confidence and never look back"
            ],

            // Level 2: Apprentice - Intermediate capitalization, periods, commas, longer words (32 phrases)
            2: [
                "A sharp knife requires respect and rapid reflexes.",
                "Keep your palm pressed flat against the cold table.",
                "Precision always beats speed when blades are falling.",
                "One wrong keystroke and you will feel the cold steel.",
                "Steady breathing leads to flawless mechanical typing.",
                "The fastest hands never hesitate between the keys.",
                "Watch the knife balance on the edge of your fingertips.",
                "Every champion was once a beginner who refused to stop.",
                "Adrenaline sharpens the mind, but calm hands guide the fingers.",
                "When the tempo accelerates, trust your muscle memory.",
                "A clean keystroke is silent, swift, and completely accurate.",
                "There is no substitute for steady nerves and sharp eyes.",
                "The table is hard oak, and the blade is forged steel.",
                "Focus on the letters directly ahead, never on past mistakes.",
                "Speed typers know that rhythm creates an unbroken flow.",
                "Keep your eyes locked on the screen while your hands fly.",
                "Each phrase completed is another second stolen from danger.",
                "The air grows thin as the descending knife gains momentum.",
                "Balance your speed with control, and you will stay intact.",
                "Clean finger placement prevents chaotic typing errors.",
                "A true master of the keyboard never strikes a false key.",
                "Confidence turns frantic typing into an art form.",
                "Let your fingers drift lightly over the tactile switches.",
                "The knife hovers above, waiting for a single misstep.",
                "Keep your heartbeat measured while the letters scroll past.",
                "Typing under pressure separates the novices from the pros.",
                "Every letter typed with care protects another finger.",
                "Breathe in deeply, center your thoughts, and keep moving.",
                "Fast typing is like music; keep the tempo alive.",
                "The blade only strikes when hesitation takes control.",
                "Silence the doubt in your mind and strike the correct key.",
                "A smooth rhythm will outlast frantic rushing every time."
            ],

            // Level 3: Challenger - Advanced vocabulary, apostrophes, questions, semicolons, em-dashes (32 phrases)
            3: [
                "Don't blink; every fraction of a second matters under pressure.",
                "Can your fingers outrun the rhythm of a descending blade?",
                "It's not about luck—it's about absolute discipline and focus.",
                "The adrenaline surges, but your hands must remain like ice.",
                "Five wooden spaces between five vulnerable fingers; choose wisely.",
                "Speed typers know: hesitation is just another word for failure.",
                "If you can't control your rhythm, the blade will control your fate.",
                "Why rush blindly when precision guarantees survival every single round?",
                "They say practice makes perfect, but under the knife, practice means survival.",
                "Watch how effortlessly the cursor moves—don't disrupt the momentum!",
                "It isn't the speed that cuts; it's the sudden loss of composure.",
                "You've cleared the warm-up; now face the true velocity test.",
                "Keep your wrists elevated; dragging your palms slows down reaction time.",
                "A single typo isn't just an error—it's a blood sacrifice to the board.",
                "Do you feel the phantom whisper of steel whistling through the air?",
                "Typing at eighty words per minute feels casual; doing it here feels lethal.",
                "Mastery isn't born from safety; it's forged in high-stakes execution.",
                "There's no room for second-guessing when each keystroke counts as armor.",
                "Listen closely: that metallic clink is the blade preparing its descent.",
                "Can you maintain ninety-nine percent accuracy while your heart races?",
                "The spacebar is wide, but don't get sloppy on the punctuation marks.",
                "Stay sharp; complex sentences demand total lexical awareness.",
                "Every author knows the agony of a typo—here, it carries a scar.",
                "Don't glance down at your hands; your fingers already know the way.",
                "When the rhythm syncs with your heartbeat, the keyboard vanishes.",
                "Is it courage or madness that keeps your hand pinned to this table?",
                "Take a breath; semicolon, apostrophe, and dash are waiting to trip you.",
                "Speed is a consequence of accuracy, never the other way around.",
                "The crowd holds its breath—one slip and the wood takes another strike!",
                "You've survived this far; don't let a misplaced comma end the run.",
                "Can you feel the razor edge hovering just millimeters above your knuckles?",
                "True composure isn't absence of fear; it's typing flawlessly despite it."
            ],

            // Level 4: Master - Quotation marks, numbers, tricky clusters, complex cadence (32 phrases)
            4: [
                "\"To master the blade, one must first master the keyboard—100% precision.\"",
                "The clock ticks at 120 BPM; 5 fingers spread out, 0 room for mistakes.",
                "Swift strokes: 'q', 'x', 'z', and 'p' test your weakest finger reaches!",
                "Rule #1: If you panic, you bleed; Rule #2: Never forget the first rule.",
                "Calculate the risk: 5 lives, 60 seconds, 350 characters of pure tension.",
                "\"The blade does not negotiate with typos,\" whispered the veteran speedster.",
                "In 1984, mechanical keyboards click-clacked; today, they strike like lightning!",
                "Protocol 09: Ensure your left pinky hits 'Shift' without clipping 'Caps Lock'.",
                "Can you hit 140 WPM while navigating quotation marks and hyphens seamlessly?",
                "\"Speed without accuracy is just rapid self-destruction,\" warned Master Chen.",
                "Target acquired: 98.5% accuracy threshold required to survive Stage 4.",
                "The sequence requires: 3 fast words, 2 capitalized nouns, and 1 exact semicolon.",
                "Dextrous fingers: 'quizzical', 'rhythm', 'sphinx', and 'juxtapose' await your input!",
                "By round 4, only 12% of typers maintain all 5 fingers intact—are you one of them?",
                "\"Keep your edge sharp and your latency zero,\" reads the hacker's oath.",
                "Coordinate: [X=250, Y=180]; calibrate keystroke impact velocity to 100% efficiency.",
                "Typing test results: 110 WPM, 0 errors logged, 5 fingers fully accounted for.",
                "\"Fear is the mind-killer; hesitation is the finger-chopper!\" — Dune Typist Edition",
                "Execute sequence #42: punctuation mastery, number row reach, and rhythmic flow.",
                "Between 1970 and 2026, keyboard layouts evolved, but human reflexes remain tested.",
                "\"When the blade strikes within 0.05 seconds, your fingers must already be gone!\"",
                "High-cadence warning: alternating left-right hand digraphs like 'th', 'er', and 'in'.",
                "Equation for victory: (Velocity * Precision) - Hesitation = Survival.",
                "The blade's edge measures 0.2mm; the margin between keys is just as unforgiving!",
                "Verify inputs: user_id #74954, accuracy_score: 99.2%, danger_level: MAXIMUM.",
                "\"Do not fear the sharp blade; fear the undisciplined finger,\" states Rule 7.",
                "Sprint across tricky reaches: 'minimum', 'polyphony', 'subsequent', and 'oxygen'!",
                "Level 4 challenge: 15 distinct punctuation marks embedded in 45 rapid words.",
                "System status: 5 actuators online, 0 faults detected, blade descending at 2.5 m/s.",
                "\"Every keystroke is a covenant between your intellect and your survival.\"",
                "Record logged at 18:45: 128 words per minute with 99.4% flawless character retention.",
                "\"Keep your hands cool, your blade high, and your keystrokes relentless!\""
            ],

            // Level 5: Bloodbath - Programming syntax, tongue twisters, symbols & mixed case (32 phrases)
            5: [
                "const survive = (fingers > 0) ? 'VICTORY!' : 'AMPUTATED_AT_LEVEL_5';",
                "Six slick slim slippery stainless-steel blades slicing swiftly downward!",
                "ERROR_404: Finger not found; Retry-Count: [0/5] - Proceed with extreme caution!",
                "\"He who lives by the keystroke dies by the typo!\" — Old Hacker Proverb (v2.0)",
                "Regex/Blade test: ^[A-Za-z0-9_]{5,}#danger; Keep up or lose your thumb!",
                "function escapeBlade(reflexes) { return (reflexes > 999) ? true : bleed(); }",
                "A peck of pickled peppers can't protect peter's pinky from perilous plunge!",
                "while (lives > 0) { typeRapidly(); avoidBlade(); if (error) { lives--; } }",
                "Pad kid poured curd pulled cod—swiftly repeat three times without a single error!",
                "SELECT * FROM fingers WHERE status = 'INTACT' ORDER BY survival_rate DESC;",
                "Which witch wished which wicked wrist-watch while waiting with white knives?",
                "const THREAT_LEVEL = 0xFF; // WARNING: Knife velocity exceeds human limits!",
                "Rubber baby buggy bumpers bouncing between sharp stainless-steel surgical blades!",
                "try { typeFlawlessly(); } catch (TypoError err) { amputate(currentFinger); }",
                "Twelve twin-twirled twirling twilight daggers dipping dangerously near nails!",
                "git commit -m \"Survived Level 5 without losing a single finger! #legendary\"",
                "Betty Botter bought some butter, but she said the butter's bitter—strike fast!",
                "npm install --save-dev @survival/knife-evasion-tactics --strict-accuracy",
                "Crisp crust crackled quietly beneath the keen cutting edge of cold steel!",
                "if (accuracy < 100) { throw new Error('BLOODBATH_INITIATED: -1_FINGER'); }",
                "How much wood would a woodcutter chop if a woodcutter had five sharp knives?",
                "export default async function surviveGame() { await avoidStab(PINKY_FINGER); }",
                "Flash dog fish frog fish frog fish dog—tongue twisted and fingers blazing!",
                "System.out.println(\"DANGER: [Level 5] - Bloodbath mode active: Don't trip!\");",
                "She sells sea shells by the seashore while six sharp sabers slice stones!",
                "document.getElementById('knife').plunge({ target: 'finger', velocity: 'MAX' });",
                "Red lorry, yellow lorry, red lorry, yellow lorry—speed up or pay the price!",
                "JSON.parse('{\"survival\": true, \"fingers_remaining\": 5, \"panic\": false}');",
                "Unique New York, unique New York, you know you need unique New York typing!",
                "chmod 777 /dev/table/hand; cat /dev/blade > /dev/null || rm -rf /fingers/*",
                "knife.on('impact', (finger) => { bloodSplatter(35); playScream(finger); });",
                "const apexTypist = users.filter(u => u.wpm >= 150 && u.fingersLeft === 5);"
            ]
        };

        // Shuffled decks for each level to prevent repetition
        this.decks = {};
        this.lastReturned = {};
        this.initDecks();
    }

    initDecks() {
        for (const level in this.tiers) {
            this.refillDeck(level);
        }
    }

    // Fisher-Yates shuffle array generator
    refillDeck(level) {
        const poolLength = this.tiers[level].length;
        const indices = Array.from({ length: poolLength }, (_, i) => i);

        // Shuffle
        for (let i = indices.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [indices[i], indices[j]] = [indices[j], indices[i]];
        }

        // Avoid immediate repeat if last phrase matches first in new deck
        if (this.lastReturned[level] !== undefined && indices.length > 1 && indices[indices.length - 1] === this.lastReturned[level]) {
            [indices[0], indices[indices.length - 1]] = [indices[indices.length - 1], indices[0]];
        }

        this.decks[level] = indices;
    }

    getPhrase(level) {
        // If within pre-authored tiers 1-5
        if (this.tiers[level]) {
            if (!this.decks[level] || this.decks[level].length === 0) {
                this.refillDeck(level);
            }

            const chosenIndex = this.decks[level].pop();
            this.lastReturned[level] = chosenIndex;
            return this.tiers[level][chosenIndex];
        }

        // Level 6+: Dynamic Multi-Pattern Procedural Generator
        return this.generateProceduralPhrase(level);
    }

    generateProceduralPhrase(level) {
        const generators = [
            // Pattern 1: Tactical Protocol / Hacker Terminal
            () => {
                const prefixes = ["TACTICAL BREACH", "OVERDRIVE PROTOCOL", "OMEGA SEQUENCE", "CYBER MATRIX", "STEEL VECTOR"];
                const verbs = ["INITIALIZE", "OVERRIDE", "SYNCHRONIZE", "EXECUTE", "TERMINATE"];
                const subjects = ["KERNEL_PULSE", "BLADE_DYNAMICS", "NEURAL_BUFFER", "SYNAPSE_GRID", "REFLEX_CORE"];
                const syms = ["#", "$", "&", "@", "::", "->", "=>"];
                const code = Math.floor(Math.random() * 9000 + 1000);
                const p = prefixes[Math.floor(Math.random() * prefixes.length)];
                const v = verbs[Math.floor(Math.random() * verbs.length)];
                const s = subjects[Math.floor(Math.random() * subjects.length)];
                const sym = syms[Math.floor(Math.random() * syms.length)];
                return `[${p} #${code}]: ${v} ${s} ${sym} Keep fingers clear of sector_${level}!`;
            },

            // Pattern 2: Intense Tongue Twister / Cadence Challenge
            () => {
                const pairs = [
                    ["crisp clean crusts", "crunching constantly close"],
                    ["brisk brave blades", "blistering bold buffers"],
                    ["swift silver sabers", "slicing silent shadows"],
                    ["fierce fast fingers", "flying flawlessly forward"],
                    ["sharp steel scissors", "snapping savagely south"]
                ];
                const pair = pairs[Math.floor(Math.random() * pairs.length)];
                return `NIGHTMARE TIER ${level}: ${pair[0]} & ${pair[1]} — do not falter!`;
            },

            // Pattern 3: Cyberpunk Blade Runner Code
            () => {
                const modules = ["BladePhysics", "FingersArray", "ReactionEngine", "NeuralLatency", "AdrenalineGauge"];
                const mod = modules[Math.floor(Math.random() * modules.length)];
                const ms = Math.floor(Math.random() * 80 + 20);
                const id = Math.random().toString(36).substring(2, 7).toUpperCase();
                return `await ${mod}.evade({ timeout: ${ms}ms, survivalToken: '${id}', livesLeft: ${Math.max(1, 6 - (level % 5))} });`;
            },

            // Pattern 4: Extreme High-Cadence Vocabulary
            () => {
                const words = [
                    "juxtaposition", "labyrinthine", "synchronicity", "perpendicular",
                    "algorithmically", "disproportionate", "counterproductive", "unquestionable",
                    "metamorphosis", "electromagnetic", "unforgivingly", "catastrophic",
                    "inextricable", "transcendental", "hyperbolically", "biodegradable"
                ];
                const w1 = words[Math.floor(Math.random() * words.length)];
                const w2 = words[Math.floor(Math.random() * words.length)];
                const w3 = words[Math.floor(Math.random() * words.length)];
                return `SURVIVAL TEST (Lvl ${level}): ${w1.toUpperCase()} -> '${w2}' & [${w3.toLowerCase()}].`;
            }
        ];

        const chosenGenerator = generators[Math.floor(Math.random() * generators.length)];
        return chosenGenerator();
    }
}

// Global instance & function export
window.phraseDeckManager = new PhraseDeckManager();
function getPhraseForLevel(level) {
    return window.phraseDeckManager.getPhrase(level);
}
window.getPhraseForLevel = getPhraseForLevel;
