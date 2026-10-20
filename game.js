// KNIFE HAND // Speed Typer Survival - Core Engine

class KnifeHandGame {
    constructor() {
        // DOM Elements
        this.gameContainer    = document.getElementById('gameContainer');
        this.tableStage       = document.getElementById('tableStage');
        this.handScene        = document.getElementById('handScene');
        this.handImage        = document.getElementById('handImage');
        this.knifeRig         = document.getElementById('knifeRig');
        this.knifeInner       = document.getElementById('knifeInner');
        this.bladeBloodTip    = document.getElementById('bladeBloodTip');
        this.phraseDisplay    = document.getElementById('phraseDisplay');
        this.hiddenInput      = document.getElementById('hiddenInput');
        this.textDisplayCard  = document.getElementById('textDisplayCard');
        this.startModal       = document.getElementById('startModal');
        this.gameOverModal    = document.getElementById('gameOverModal');
        this.startGameBtn     = document.getElementById('startGameBtn');
        this.startGameBtnText = document.getElementById('startGameBtnText');
        this.backFromModeMenuBtn = document.getElementById('backFromModeMenuBtn');
        this.playAgainBtn     = document.getElementById('playAgainBtn');
        this.playAgainBtnText = document.getElementById('playAgainBtnText');
        this.switchModeBtn    = document.getElementById('switchModeBtn');
        this.muteBtn          = document.getElementById('muteBtn');
        this.restartBtn       = document.getElementById('restartBtn');
        this.modeMenuBtn      = document.getElementById('modeMenuBtn');
        this.themeToggleBtn   = document.getElementById('themeToggleBtn');
        this.floatingTextLayer= document.getElementById('floatingTextLayer');
        this.particleCanvas   = document.getElementById('particleCanvas');
        this.tierBadge        = document.getElementById('tierBadge');
        this.charCountLabel   = document.getElementById('charCountLabel');
        this.progressBarFill  = document.getElementById('progressBarFill');
        this.typingFooterHint = document.getElementById('typingFooterHint');
        this.hintBadge        = document.getElementById('hintBadge');
        this.hintText         = document.getElementById('hintText');

        // HUD Elements
        this.hudLevel          = document.getElementById('hudLevel');
        this.hudWpm            = document.getElementById('hudWpm');
        this.hudAccuracy       = document.getElementById('hudAccuracy');
        this.hudCompleted      = document.getElementById('hudCompleted');
        this.livesCountText    = document.getElementById('livesCountText');
        this.hudLivesContainer = document.getElementById('hudLivesContainer');
        this.hudLivesLabel     = document.getElementById('hudLivesLabel');
        this.lifePips          = document.querySelectorAll('.life-pip');

        // Results Elements
        this.resLevel    = document.getElementById('resLevel');
        this.resWpm      = document.getElementById('resWpm');
        this.resAccuracy = document.getElementById('resAccuracy');
        this.resPhrases  = document.getElementById('resPhrases');
        this.bestWpmVal  = document.getElementById('bestWpmVal');
        this.bestScoreUnit = document.getElementById('bestScoreUnit');
        this.resultsTitle    = document.getElementById('resultsTitle');
        this.resultsSubtitle = document.getElementById('resultsSubtitle');
        this.resultsEmblem   = document.getElementById('resultsEmblem');
        this.resultsModalCard= document.getElementById('resultsModalCard');
        this.resLabel1   = document.getElementById('resLabel1');
        this.resLabel2   = document.getElementById('resLabel2');
        this.resLabel3   = document.getElementById('resLabel3');
        this.resLabel4   = document.getElementById('resLabel4');

        // Canvas 2D Context for Blood Particles
        this.ctx       = this.particleCanvas.getContext('2d');
        this.particles = [];
        this.stains    = [];

        // ==========================================
        // GAME MODE STATE
        // 'survival' | 'sprint' | 'infinite' | 'timer'
        // ==========================================
        this.currentMode = 'survival';

        // Game Configuration & State
        this.MAX_LIVES = 5;
        this.lives     = 5;
        this.level     = 1;
        this.phrasesCompleted = 0;
        this.timerWordsCompleted = 0;
        this.isPlaying  = false;
        this.isGameOver = false;

        // Sequence of fingers to strike on consecutive mistakes
        this.fingerOrder = ['pinky', 'ring', 'middle', 'index', 'thumb'];

        // Typing State
        this.currentPhrase  = '';
        this.charIndex      = 0;
        this.totalKeystrokes= 0;
        this.totalErrors    = 0;
        this.startTime      = null;
        this.peakWpm        = 0;
        this.wpmTimer       = null;
        this.heartbeatTimer = null;
        this.modeMenuFromResults = false;
        this.modeMenuPreviousMode = this.currentMode;
        this.modeMenuOpenedAt = null;
        this.modeMenuHadHeartbeat = false;

        // High Score
        this.highScoreWpm = parseInt(localStorage.getItem('knifehand_highscore_wpm') || '0', 10);
        this.highScoreWords = parseInt(localStorage.getItem('knifehand_timer_highscore_words') || '0', 10);
        this.bestWpmVal.textContent = this.highScoreWpm;

        // Knife Position Rig
        this.knifeAimX = 0;
        this.knifeAimY = 0;

        this.init();
    }

    init() {
        this.resizeCanvas();
        window.addEventListener('resize', () => {
            this.resizeCanvas();
            this.updateKnifeTargetPosition();
        });
        this.setupEventListeners();
        this.updateThemeToggle();
        requestAnimationFrame(() => this.particleLoop());

        // Auto-start in Survival mode — no opening card
        this.currentMode = 'survival';
        this.startModal.classList.add('hidden');
        // Do not focus the input during page load: mobile browsers only open
        // their virtual keyboard from a user interaction.
        this.startGame({ focus: false });
    }

    resizeCanvas() {
        const rect = this.tableStage.getBoundingClientRect();
        this.particleCanvas.width  = rect.width;
        this.particleCanvas.height = rect.height;
    }

    // ============================================================
    //  MODE SELECTION
    // ============================================================

    selectMode(mode) {
        this.currentMode = mode;
        this.gameContainer.dataset.mode = mode;

        // Update card highlighting
        document.querySelectorAll('.mode-card').forEach(card => {
            const isActive = card.dataset.mode === mode;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-pressed', isActive.toString());
        });

        // Update start button label
        const labels = {
            survival: 'START SURVIVAL',
            sprint:   'START ONE PHRASE',
            infinite: 'START INFINITE',
            timer:    'START 1-MINUTE CHALLENGE'
        };
        if (this.startGameBtnText) {
            this.startGameBtnText.textContent = labels[mode] || 'START';
        }
    }

    openModeMenu() {
        // Pause the game and show the mode selector
        this.modeMenuFromResults = false;
        this.modeMenuPreviousMode = this.currentMode;
        this.modeMenuOpenedAt = Date.now();
        this.modeMenuHadHeartbeat = Boolean(this.heartbeatTimer);
        this.isPlaying = false;
        if (this.wpmTimer) clearInterval(this.wpmTimer);
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        this.tableStage.classList.remove('danger-vignette');

        // Sync selected card to current mode
        this.selectMode(this.currentMode);
        this.startModal.classList.remove('hidden');
        this.gameOverModal.classList.add('hidden');
    }

    // ============================================================
    //  EVENT LISTENERS
    // ============================================================

    setupEventListeners() {
        // Mode card clicks
        document.querySelectorAll('.mode-card').forEach(card => {
            card.addEventListener('click', () => this.selectMode(card.dataset.mode));
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    e.stopPropagation();
                    this.selectMode(card.dataset.mode);
                }
            });
            card.addEventListener('dblclick', () => {
                this.selectMode(card.dataset.mode);
                this.startGame();
            });
        });

        // Buttons
        this.startGameBtn.addEventListener('click', () => this.startGame());
        this.backFromModeMenuBtn.addEventListener('click', () => this.backFromModeMenu());
        this.playAgainBtn.addEventListener('click', () => this.restartGame());
        if (this.switchModeBtn) {
            this.switchModeBtn.addEventListener('click', () => this.returnToModeMenu());
        }
        this.restartBtn.addEventListener('click', () => this.restartGame());
        this.muteBtn.addEventListener('click', () => this.toggleMute());
        if (this.modeMenuBtn) {
            this.modeMenuBtn.addEventListener('click', () => this.openModeMenu());
        }
        if (this.themeToggleBtn) {
            this.themeToggleBtn.addEventListener('click', () => this.toggleTheme());
        }

        // Global keyboard navigation
        window.addEventListener('keydown', (e) => {
            // Escape opens mode menu during play
            if (e.key === 'Escape' && this.isPlaying) {
                this.openModeMenu();
                return;
            }

            if (!this.isPlaying) {
                // Mode selector shortcut keys on the mode screen
                if (!this.startModal.classList.contains('hidden')) {
                    if (e.key === '1') { this.selectMode('survival'); return; }
                    if (e.key === '2') { this.selectMode('sprint');   return; }
                    if (e.key === '3') { this.selectMode('infinite'); return; }
                    if (e.key === '4') { this.selectMode('timer');    return; }
                }

                // M key on results screen goes to mode menu
                if (!this.gameOverModal.classList.contains('hidden') && e.key === 'm') {
                    this.returnToModeMenu();
                    return;
                }

                if (e.key === ' ' || e.key === 'Enter') {
                    e.preventDefault();
                    if (!this.startModal.classList.contains('hidden')) {
                        this.startGame();
                    } else if (!this.gameOverModal.classList.contains('hidden')) {
                        this.restartGame();
                    }
                }
                return;
            }

            // Printable keys entered in the capture field are handled by its
            // input event. Handling keydown here as well would count them twice.
            if (e.target === this.hiddenInput) {
                // An empty capture input may not emit `input` for Backspace.
                if (e.key === 'Backspace') {
                    e.preventDefault();
                    this.handleKeyPress(e);
                }
                return;
            }

            // In-game typing handler
            this.handleKeyPress(e);
        });

        // Mobile keyboards and input methods do not consistently emit keydown.
        // Read the text the browser actually inserted instead.
        this.hiddenInput.addEventListener('input', (e) => {
            const insertedText = this.hiddenInput.value;
            this.hiddenInput.value = '';

            if (e.inputType && e.inputType.startsWith('delete')) {
                this.handleKeyPress({ key: 'Backspace', preventDefault() {} });
                return;
            }

            for (const key of insertedText) {
                this.handleKeyPress({ key, preventDefault() {} });
                if (!this.isPlaying || this.isGameOver) break;
            }
        });

        // Click on typing box or stage keeps input focused
        this.tableStage.addEventListener('click', () => this.focusInput());
        this.textDisplayCard.addEventListener('click', () => this.focusInput());
    }

    returnToModeMenu() {
        this.modeMenuFromResults = true;
        this.modeMenuPreviousMode = this.currentMode;
        this.gameOverModal.classList.add('hidden');
        this.isGameOver = false;
        this.selectMode(this.currentMode);
        this.startModal.classList.remove('hidden');
    }

    backFromModeMenu() {
        this.startModal.classList.add('hidden');
        this.selectMode(this.modeMenuPreviousMode);

        if (this.modeMenuFromResults) {
            this.modeMenuFromResults = false;
            this.isGameOver = true;
            this.gameOverModal.classList.remove('hidden');
            return;
        }

        if (this.startTime && this.modeMenuOpenedAt) {
            this.startTime += Date.now() - this.modeMenuOpenedAt;
        }
        this.isPlaying = true;
        this.wpmTimer = setInterval(() => this.updateMetrics(), this.currentMode === 'timer' ? 100 : 400);

        if (this.modeMenuHadHeartbeat) {
            this.tableStage.classList.add('danger-vignette');
            this.heartbeatTimer = setInterval(() => {
                if (this.lives === 1 && this.isPlaying) window.soundFX.playHeartbeat();
            }, 1200);
        }

        this.focusInput();
    }

    focusInput() {
        if (this.hiddenInput) {
            this.hiddenInput.value = '';
            this.hiddenInput.focus({ preventScroll: true });
        }
    }

    updateThemeToggle() {
        if (!this.themeToggleBtn) return;

        const isLightTheme = document.documentElement.dataset.theme === 'light';
        const label = `Switch to ${isLightTheme ? 'dark' : 'light'} mode`;
        this.themeToggleBtn.setAttribute('aria-pressed', isLightTheme.toString());
        this.themeToggleBtn.setAttribute('aria-label', label);
        this.themeToggleBtn.title = label;
    }

    toggleTheme() {
        const isLightTheme = document.documentElement.dataset.theme !== 'light';
        const theme = isLightTheme ? 'light' : 'dark';
        document.documentElement.dataset.theme = theme;
        localStorage.setItem('knifehand_theme', theme);
        this.updateThemeToggle();
    }

    toggleMute() {
        const isMuted = window.soundFX.toggleMute();
        if (isMuted) {
            this.muteBtn.classList.add('is-muted');
            this.muteBtn.title = 'Unmute Sound';
        } else {
            this.muteBtn.classList.remove('is-muted');
            this.muteBtn.title = 'Mute Sound';
        }
    }

    // ============================================================
    //  GAME FLOW
    // ============================================================

    startGame({ focus = true } = {}) {
        window.soundFX.ensureContext();
        this.startModal.classList.add('hidden');
        this.gameOverModal.classList.add('hidden');
        this.isPlaying  = true;
        this.isGameOver = false;
        this.lives      = this.MAX_LIVES;
        this.level      = 1;
        this.phrasesCompleted  = 0;
        this.timerWordsCompleted = 0;
        this.totalKeystrokes   = 0;
        this.totalErrors       = 0;
        this.startTime         = null;
        this.peakWpm           = 0;
        this.particles         = [];
        this.stains            = [];

        // Apply mode class to tableStage
        this.tableStage.classList.remove('mode-survival', 'mode-sprint', 'mode-infinite', 'mode-timer');
        this.tableStage.classList.add(`mode-${this.currentMode}`);

        // Clear danger vignette
        this.tableStage.classList.remove('danger-vignette');
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

        // Reset wounds and life pips
        this.resetFingerVisuals();

        // Update HUD appearance per mode
        this.applyModeHUD();
        this.updateHUD();

        // Load first phrase
        this.loadNewPhrase();
        if (focus) this.focusInput();

        // Start WPM ticker
        if (this.wpmTimer) clearInterval(this.wpmTimer);
        this.wpmTimer = setInterval(() => this.updateMetrics(), this.currentMode === 'timer' ? 100 : 400);
    }

    restartGame() {
        this.startGame();
    }

    // Apply per-mode HUD visibility / labels
    applyModeHUD() {
        const subtitle = document.querySelector('.brand-text .subtitle');
        const watermarkTitle = document.querySelector('#zenWatermark .zen-title');
        const watermarkSubtitle = document.querySelector('#zenWatermark .zen-subtitle');

        if (this.currentMode === 'survival') {
            // Show lives
            if (this.hudLivesContainer) this.hudLivesContainer.style.display = '';
            if (this.hudLivesLabel)     this.hudLivesLabel.textContent = 'LIVES';
            if (this.livesCountText)    this.livesCountText.style.display = '';
            // Show level stat
            const box1 = document.getElementById('hudStatBox1');
            if (box1) box1.style.display = '';
            const label1 = document.getElementById('hudStatLabel1');
            if (label1) label1.textContent = 'LEVEL';
            // Show cleared stat
            const box4 = document.getElementById('hudStatBox4');
            if (box4) box4.style.display = '';
            // Footer hint
            if (this.hintBadge) this.hintBadge.textContent = 'ALERT';
            if (this.hintText)  this.hintText.textContent  = '1 Error = 1 Stab. 5 Errors = Game Over.';
            if (subtitle) subtitle.textContent = 'SPEED SURVIVAL';

        } else if (this.currentMode === 'sprint') {
            if (watermarkTitle) watermarkTitle.textContent = 'ONE PHRASE';
            if (watermarkSubtitle) watermarkSubtitle.textContent = 'TYPE THE PHRASE AS QUICKLY AS YOU CAN';
            // Keep lives hidden – no penalty shown
            if (this.hudLivesContainer) this.hudLivesContainer.style.display = 'none';
            // Repurpose first stat
            const label1 = document.getElementById('hudStatLabel1');
            if (label1) label1.textContent = 'TIME';
            // Cleared  becomes "PHRASE"
            const label4 = document.getElementById('hudStatLabel4');
            if (label4) label4.textContent = 'PHRASE';
            const box4 = document.getElementById('hudStatBox4');
            if (box4) box4.style.display = '';
            // Footer hint
            if (this.hintBadge) this.hintBadge.textContent = 'SPRINT';
            if (this.hintText)  this.hintText.textContent  = 'One phrase only. Type as fast and accurately as you can. Results appear instantly.';
            if (subtitle) subtitle.textContent = 'ONE PHRASE SPRINT';

        } else if (this.currentMode === 'infinite') {
            if (watermarkTitle) watermarkTitle.textContent = 'INFINITE PRACTICE';
            if (watermarkSubtitle) watermarkSubtitle.textContent = 'UNLIMITED TYPING \u2022 NO LIVES \u2022 NO KNIFE';
            // Hide lives pips – show "ZEN" label
            if (this.hudLivesContainer) this.hudLivesContainer.style.display = '';
            if (this.hudLivesLabel)     this.hudLivesLabel.textContent = 'ZEN';
            if (this.livesCountText)    this.livesCountText.style.display = 'none';
            // Level box stays; show phrase count
            const label1 = document.getElementById('hudStatLabel1');
            if (label1) label1.textContent = 'PHRASE';
            const box4 = document.getElementById('hudStatBox4');
            if (box4) box4.style.display = '';
            // Footer hint
            if (this.hintBadge) this.hintBadge.textContent = 'ZEN';
            if (this.hintText)  this.hintText.textContent  = 'Infinite practice mode. No lives, no knife, no pressure. Type forever.';
            if (subtitle) subtitle.textContent = 'INFINITE PRACTICE';
        } else if (this.currentMode === 'timer') {
            if (watermarkTitle) watermarkTitle.textContent = '60-SECOND TIMER';
            if (watermarkSubtitle) watermarkSubtitle.textContent = 'TYPE AS MANY WORDS AS YOU CAN';
            if (this.hudLivesContainer) this.hudLivesContainer.style.display = 'none';
            const label1 = document.getElementById('hudStatLabel1');
            if (label1) label1.textContent = 'TIME';
            const label4 = document.getElementById('hudStatLabel4');
            if (label4) label4.textContent = 'WORDS';
            const box4 = document.getElementById('hudStatBox4');
            if (box4) box4.style.display = '';
            if (this.hintBadge) this.hintBadge.textContent = 'TIME ATTACK';
            if (this.hintText) this.hintText.textContent = 'Complete as many words as possible in 60 seconds.';
            if (subtitle) subtitle.textContent = '60-SECOND WORD SPRINT';
        }
    }

    resetFingerVisuals() {
        this.fingerOrder.forEach(finger => {
            const wound = document.getElementById(`wound-${finger}`);
            if (wound) wound.setAttribute('opacity', '0');
        });
        this.handScene.querySelectorAll('.png-hand-wound').forEach(wound => wound.remove());

        this.lifePips.forEach(pip => {
            pip.classList.remove('severed');
            pip.classList.add('active');
        });

        if (this.bladeBloodTip) this.bladeBloodTip.setAttribute('opacity', '0');
        this.updateKnifeTargetPosition();
    }

    loadNewPhrase() {
        // Sprint and timer modes use level-2 phrases for a consistent speed test.
        const level = this.currentMode === 'sprint' || this.currentMode === 'timer' ? 2 : this.level;
        this.currentPhrase = window.getPhraseForLevel(level);
        this.charIndex     = 0;
        this.renderPhrase();
        this.updateTierBadge();
        this.updateProgress();
    }

    updateTierBadge() {
        if (this.currentMode === 'sprint') {
            this.tierBadge.textContent = 'ONE PHRASE • SPRINT BENCHMARK';
            this.hudLevel.textContent  = '—';
            return;
        }
        if (this.currentMode === 'infinite') {
            this.tierBadge.textContent = `PHRASE ${this.phrasesCompleted + 1} • INFINITE`;
            this.hudLevel.textContent  = this.phrasesCompleted + 1;
            return;
        }
        if (this.currentMode === 'timer') {
            this.tierBadge.textContent = '60 SECONDS • WORD SPRINT';
            this.hudLevel.textContent = this.startTime
                ? `${Math.ceil(Math.max(0, 60000 - (Date.now() - this.startTime)) / 1000)}s`
                : '60s';
            return;
        }
        // Survival
        let label = `LEVEL ${this.level} • `;
        if      (this.level === 1) label += 'NOVICE';
        else if (this.level === 2) label += 'APPRENTICE';
        else if (this.level === 3) label += 'CHALLENGER';
        else if (this.level === 4) label += 'MASTER';
        else if (this.level >= 5)  label += 'BLOODBATH';
        this.tierBadge.textContent = label;
        this.hudLevel.textContent  = this.level;
    }

    // ============================================================
    //  RENDERING
    // ============================================================

    renderPhrase() {
        this.phraseDisplay.innerHTML = '';
        for (let i = 0; i < this.currentPhrase.length; i++) {
            const char = this.currentPhrase[i];
            const span = document.createElement('span');
            span.classList.add('char');
            if (i === 0) span.classList.add('current');
            else span.classList.add('pending');

            if (char === ' ') {
                span.classList.add('space-char');
                span.innerHTML = '&nbsp;';
            } else {
                span.textContent = char;
            }
            this.phraseDisplay.appendChild(span);
        }
    }

    // ============================================================
    //  INPUT / TYPING
    // ============================================================

    handleKeyPress(e) {
        if (!this.isPlaying || this.isGameOver) return;
        if (this.currentMode === 'timer' && this.startTime && Date.now() - this.startTime >= 60000) {
            this.triggerTimerResults();
            return;
        }

        // Ignore AltGr ('AltGraph') and modifier/system/control keys
        if (e.key === 'AltGraph' || e.key === 'Alt' || e.key === 'Control' ||
            e.key === 'Shift'    || e.key === 'Meta' || e.key === 'CapsLock' ||
            e.key === 'Tab'      || e.key === 'Escape' || e.key === 'Dead' ||
            e.key === 'ContextMenu' || e.key === 'NumLock' || e.key === 'ScrollLock' ||
            e.key === 'Pause'    || e.key === 'Insert' || e.key === 'Delete' ||
            e.key === 'Home'     || e.key === 'End'    || e.key === 'PageUp' ||
            e.key === 'PageDown' || e.key.startsWith('Arrow') || e.key.startsWith('F')) {
            return;
        }

        // Support Backspace
        if (e.key === 'Backspace') {
            e.preventDefault();
            if (this.charIndex > 0) {
                const charSpans = this.phraseDisplay.querySelectorAll('.char');
                if (charSpans[this.charIndex]) {
                    charSpans[this.charIndex].classList.remove('current');
                    charSpans[this.charIndex].classList.add('pending');
                }
                this.charIndex--;
                if (charSpans[this.charIndex]) {
                    charSpans[this.charIndex].classList.remove('correct', 'incorrect', 'pending');
                    charSpans[this.charIndex].classList.add('current');
                }
                this.updateProgress();
                this.updateMetrics();
            }
            return;
        }

        // Ignore any other non-printable keys (length !== 1)
        if (e.key.length !== 1) return;

        // Initialize session timer on first actual printable keystroke
        if (!this.startTime) this.startTime = Date.now();

        // Prevent browser scrolling on spacebar
        if (e.key === ' ') e.preventDefault();

        const expectedChar = this.currentPhrase[this.charIndex];
        const charSpans    = this.phraseDisplay.querySelectorAll('.char');

        if (e.key === expectedChar) {
            // ---- CORRECT ----
            this.totalKeystrokes++;
            window.soundFX.playKeyClick();

            if (charSpans[this.charIndex]) {
                charSpans[this.charIndex].classList.remove('current', 'pending');
                charSpans[this.charIndex].classList.add('correct');
            }
            this.charIndex++;

            if (this.charIndex >= this.currentPhrase.length) {
                this.handlePhraseCompleted();
                return;
            } else {
                if (charSpans[this.charIndex]) {
                    charSpans[this.charIndex].classList.remove('pending');
                    charSpans[this.charIndex].classList.add('current');
                }
            }
        } else {
            // ---- MISTAKE ----
            this.totalKeystrokes++;
            this.totalErrors++;

            if (charSpans[this.charIndex]) {
                charSpans[this.charIndex].classList.remove('current', 'pending');
                charSpans[this.charIndex].classList.add('incorrect');
            }

            if (this.currentMode === 'survival') {
                this.onTypoError();
            } else {
                this.playMistakeFeedback();
            }

            this.charIndex++;
            if (this.charIndex >= this.currentPhrase.length) {
                this.handlePhraseCompleted();
                return;
            } else {
                if (charSpans[this.charIndex]) {
                    charSpans[this.charIndex].classList.remove('pending');
                    charSpans[this.charIndex].classList.add('current');
                }
            }
        }

        this.updateProgress();
        this.updateMetrics();
    }

    onTypoError() {
        if (this.lives <= 0) return;

        const struckFingerIndex = this.MAX_LIVES - this.lives;
        const targetFinger      = this.fingerOrder[struckFingerIndex];

        this.lives--;

        this.playSurvivalErrorEffects(targetFinger);

        // Update lives HUD
        this.updateLivesHUD(targetFinger);

        // Heartbeat at 1 life
        if (this.lives === 1) {
            this.tableStage.classList.add('danger-vignette');
            window.soundFX.playHeartbeat();
            if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
            this.heartbeatTimer = setInterval(() => {
                if (this.lives === 1 && this.isPlaying) window.soundFX.playHeartbeat();
            }, 1200);
        }

        if (this.lives <= 0) {
            setTimeout(() => this.triggerGameOver(), 450);
        }
    }

    playMistakeFeedback(messages = ['WRONG!']) {
        // Visual feedback
        this.gameContainer.classList.remove('screen-shake');
        void this.gameContainer.offsetWidth;
        this.gameContainer.classList.add('screen-shake');
        this.gameContainer.classList.remove('damaged');
        void this.gameContainer.offsetWidth;
        this.gameContainer.classList.add('damaged');

        this.spawnFloatingText(messages[Math.floor(Math.random() * messages.length)], 'danger');
    }

    playSurvivalErrorEffects(targetFinger) {
        this.playMistakeFeedback(['-1 LIFE! OUCH!', 'SLICED!', 'FINGER HIT!', 'BLEEDING!', 'WATCH OUT!']);
        window.soundFX.playWhoosh();
        setTimeout(() => window.soundFX.playStab(), 70);
        this.strikeFingerWithKnife(targetFinger);
    }

    strikeFingerWithKnife(fingerName) {
        const target = this.getFingerTargetPosition(fingerName);
        if (!target) return;

        let angle = 0;
        if      (fingerName === 'pinky') angle =  18;
        else if (fingerName === 'ring')  angle =   8;
        else if (fingerName === 'index') angle = -10;
        else if (fingerName === 'thumb') angle = -25;

        const tip = this.getKnifeTipOffset();
        const knifeTransition = this.knifeRig.style.transition;
        this.knifeRig.style.transition = 'none';
        this.knifeRig.style.transform = `translate(${target.x - tip.x}px, ${target.y - tip.y}px) rotate(${angle}deg)`;
        void this.knifeRig.offsetWidth;
        this.knifeRig.style.transition = knifeTransition;
        this.knifeInner.classList.remove('knife-stabbing');
        void this.knifeInner.offsetWidth;
        this.knifeInner.classList.add('knife-stabbing');

        setTimeout(() => {
            if (this.bladeBloodTip) this.bladeBloodTip.setAttribute('opacity', '1');
            const wound = this.showHandWound(fingerName, target);
            const woundRect = wound.getBoundingClientRect();

            const stageRect = this.tableStage.getBoundingClientRect();
            const impactStageX = woundRect.left + woundRect.width / 2 - stageRect.left;
            const impactStageY = woundRect.top + woundRect.height / 2 - stageRect.top;
            this.spawnBloodSplatter(impactStageX, impactStageY);

            setTimeout(() => {
                this.knifeInner.classList.remove('knife-stabbing');
                this.updateKnifeTargetPosition();
            }, 250);
        }, 125);
    }

    showHandWound(fingerName, target) {
        const existingWound = this.handScene.querySelector(`.png-hand-wound[data-finger="${fingerName}"]`);
        if (existingWound) return existingWound;

        const wound = document.createElement('span');
        wound.className = 'png-hand-wound';
        wound.dataset.finger = fingerName;
        wound.style.left = `${target.x}px`;
        wound.style.top = `${target.y}px`;
        this.handScene.appendChild(wound);
        return wound;
    }

    getFingerTargetPosition(fingerName) {
        const fingerPoints = {
            pinky: { x: 476 / 677, y: 290 / 369 },
            ring:  { x: 508 / 677, y: 235 / 369 },
            middle:{ x: 533 / 677, y: 190 / 369 },
            index: { x: 505 / 677, y: 125 / 369 },
            thumb: { x: 426 / 670, y: 65 / 369 }
        };
        const point = fingerPoints[fingerName];
        if (!point || !this.handImage || !this.handScene) return null;

        const imageWidth = this.handImage.offsetWidth;
        const imageHeight = this.handImage.offsetHeight;
        if (!imageWidth || !imageHeight) return null;

        return {
            x: this.handImage.offsetLeft + imageWidth * point.x,
            y: this.handImage.offsetTop + imageHeight * point.y
        };
    }

    getKnifeTipOffset() {
        return {
            x: this.knifeRig.offsetWidth / 2,
            y: this.knifeRig.offsetHeight * 16 / 369
        };
    }

    updateKnifeTargetPosition() {
        const nextFingerIndex = Math.min(this.MAX_LIVES - this.lives, this.MAX_LIVES - 1);
        const nextFinger      = this.fingerOrder[nextFingerIndex] || 'thumb';
        const target = this.getFingerTargetPosition(nextFinger);

        if (target && this.knifeRig) {
            const tip = this.getKnifeTipOffset();
            let angle = 0;
            if      (nextFinger === 'pinky') angle =  14;
            else if (nextFinger === 'ring')  angle =   7;
            else if (nextFinger === 'index') angle =  -8;
            else if (nextFinger === 'thumb') angle = -20;

            this.knifeRig.style.transform = `translate(${target.x - tip.x}px, ${target.y - tip.y}px) rotate(${angle}deg)`;
        }
    }

    updateLivesHUD(struckFinger) {
        this.livesCountText.textContent = `${this.lives}/${this.MAX_LIVES}`;
        const struckPipIndex = this.MAX_LIVES - this.lives - 1;
        if (this.lifePips[struckPipIndex]) {
            this.lifePips[struckPipIndex].classList.remove('active');
            this.lifePips[struckPipIndex].classList.add('severed');
        }
    }

    // ============================================================
    //  PHRASE COMPLETION
    // ============================================================

    handlePhraseCompleted() {
        this.phrasesCompleted++;
        if (this.currentMode === 'timer') {
            this.timerWordsCompleted += this.currentPhrase.trim().split(/\s+/).filter(Boolean).length;
        }
        window.soundFX.playLevelClear();

        if (this.currentMode === 'sprint') {
            // Sprint: show results immediately after 1 phrase
            this.spawnFloatingText('PHRASE COMPLETE!', 'success');
            setTimeout(() => this.triggerSprintResults(), 300);
            return;
        }

        if (this.currentMode === 'infinite') {
            this.spawnFloatingText(`PHRASE ${this.phrasesCompleted} DONE!`, 'success');
            this.updateHUD();
            this.loadNewPhrase();
            return;
        }

        if (this.currentMode === 'timer') {
            this.updateHUD();
            this.loadNewPhrase();
            return;
        }

        // Survival
        this.level++;
        this.spawnFloatingText(`+1 PHRASE! LEVEL ${this.level}`, 'success');
        this.updateHUD();
        this.loadNewPhrase();
    }

    // ============================================================
    //  PROGRESS & METRICS
    // ============================================================

    updateProgress() {
        const totalChars = this.currentPhrase.length;
        const current    = Math.min(this.charIndex, totalChars);
        this.charCountLabel.textContent  = `${current} / ${totalChars}`;
        this.progressBarFill.style.width = `${Math.round((current / totalChars) * 100)}%`;
        if (this.currentMode === 'timer') {
            this.hudCompleted.textContent = this.timerWordsCompleted + this.getCompletedWordsInCurrentPhrase();
        }
    }

    getCompletedWordsInCurrentPhrase() {
        const wordPattern = /\S+/g;
        let completedWords = 0;
        let match;

        while ((match = wordPattern.exec(this.currentPhrase)) !== null) {
            if (match.index + match[0].length > this.charIndex) break;
            completedWords++;
        }

        return completedWords;
    }

    updateMetrics() {
        if (this.currentMode === 'timer') {
            if (!this.startTime) {
                this.hudLevel.textContent = '60s';
            } else {
                const elapsedMs = Date.now() - this.startTime;
                if (elapsedMs >= 60000) {
                    this.hudLevel.textContent = '0s';
                    this.triggerTimerResults();
                    return;
                }
                this.hudLevel.textContent = `${Math.ceil((60000 - elapsedMs) / 1000)}s`;
            }
        }

        if (!this.startTime || this.totalKeystrokes === 0) {
            this.hudWpm.textContent      = '0';
            this.hudAccuracy.textContent = '100%';
            return;
        }
        const elapsedMinutes = (Date.now() - this.startTime) / 60000;
        const correctChars   = Math.max(0, this.totalKeystrokes - this.totalErrors);
        const wpm            = elapsedMinutes > 0.02 ? Math.round((correctChars / 5) / elapsedMinutes) : 0;
        const accuracy       = Math.round((correctChars / this.totalKeystrokes) * 100);

        if (wpm > this.peakWpm) this.peakWpm = wpm;

        this.hudWpm.textContent      = wpm;
        this.hudAccuracy.textContent = `${Math.max(0, accuracy)}%`;

        // Sprint: update time stat
        if (this.currentMode === 'sprint') {
            const secs = (Date.now() - this.startTime) / 1000;
            this.hudLevel.textContent = `${secs.toFixed(1)}s`;
        }
    }

    updateHUD() {
        this.hudCompleted.textContent = this.phrasesCompleted;
        if (this.currentMode === 'survival') {
            this.hudLevel.textContent      = this.level;
            this.livesCountText.textContent= `${this.lives} / ${this.MAX_LIVES}`;
        } else if (this.currentMode === 'infinite') {
            this.hudLevel.textContent = this.phrasesCompleted + 1;
        } else if (this.currentMode === 'timer') {
            this.hudCompleted.textContent = this.timerWordsCompleted + this.getCompletedWordsInCurrentPhrase();
        }
    }

    // ============================================================
    //  FLOATING TEXT
    // ============================================================

    spawnFloatingText(text, type = 'danger') {
        const msg = document.createElement('div');
        msg.classList.add('float-msg');
        if (type === 'success') msg.classList.add('success');
        msg.textContent = text;

        const rect   = this.tableStage.getBoundingClientRect();
        msg.style.left = `${rect.width / 2 + (Math.random() * 80 - 40)}px`;
        msg.style.top  = `${rect.height / 2 - 40}px`;
        this.floatingTextLayer.appendChild(msg);

        setTimeout(() => {
            if (msg.parentNode) msg.parentNode.removeChild(msg);
        }, 1200);
    }

    // ============================================================
    //  BLOOD PARTICLE ENGINE
    // ============================================================

    spawnBloodSplatter(x, y) {
        const count  = 35;
        const colors = ['#8a0303', '#b30000', '#dc2626', '#ff1a1a', '#660000'];

        for (let i = 0; i < count; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Math.random() * 9 + 2;
            const size  = Math.random() * 4.5 + 2;
            this.particles.push({
                x, y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed - 1.5,
                radius: size,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: 1,
                decay: Math.random() * 0.02 + 0.015,
                gravity: 0.28
            });
        }

        const stainCount = Math.floor(Math.random() * 4 + 4);
        for (let s = 0; s < stainCount; s++) {
            const sAngle = Math.random() * Math.PI * 2;
            const sDist  = Math.random() * 35;
            this.stains.push({
                x: x + Math.cos(sAngle) * sDist,
                y: y + Math.sin(sAngle) * sDist,
                r: Math.random() * 6 + 3,
                color: colors[Math.floor(Math.random() * colors.length)],
                alpha: Math.random() * 0.4 + 0.5
            });
        }

        if (this.stains.length > 80) this.stains.splice(0, 20);
    }

    particleLoop() {
        this.ctx.clearRect(0, 0, this.particleCanvas.width, this.particleCanvas.height);

        for (const stain of this.stains) {
            this.ctx.beginPath();
            this.ctx.arc(stain.x, stain.y, stain.r, 0, Math.PI * 2);
            this.ctx.fillStyle   = stain.color;
            this.ctx.globalAlpha = stain.alpha;
            this.ctx.fill();
        }

        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            p.x += p.vx;
            p.y += p.vy;
            p.vy += p.gravity;
            p.vx *= 0.95;
            p.alpha -= p.decay;

            if (p.alpha <= 0) { this.particles.splice(i, 1); continue; }

            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            this.ctx.fillStyle   = p.color;
            this.ctx.globalAlpha = Math.max(0, p.alpha);
            this.ctx.fill();
        }

        this.ctx.globalAlpha = 1.0;
        requestAnimationFrame(() => this.particleLoop());
    }

    // ============================================================
    //  GAME OVER / RESULTS
    // ============================================================

    computeStats() {
        const correctChars = Math.max(0, this.totalKeystrokes - this.totalErrors);
        const accuracy     = this.totalKeystrokes > 0
            ? Math.round((correctChars / this.totalKeystrokes) * 100) : 0;
        return { accuracy };
    }

    triggerGameOver() {
        this.isPlaying  = false;
        this.isGameOver = true;
        if (this.wpmTimer) clearInterval(this.wpmTimer);
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);
        this.tableStage.classList.remove('danger-vignette');
        window.soundFX.playGameOver();

        const { accuracy } = this.computeStats();

        // Restore survival card styling
        this.resultsModalCard.classList.remove('sprint-card');
        this.resultsEmblem.classList.remove('sprint-emblem');
        this.resultsTitle.classList.remove('sprint-title');
        this.resultsTitle.textContent    = 'ALL 5 FINGERS LOST';
        this.resultsSubtitle.textContent = 'The blade was faster than your keystrokes.';

        // Restore emblem SVG
        this.resultsEmblem.innerHTML = `
            <svg class="emblem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                <line x1="12" y1="9" x2="12" y2="13"></line>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>`;

        this.resLabel1.textContent = 'LEVEL REACHED';
        this.resLevel.textContent  = this.level;
        this.resLabel2.textContent = 'PEAK SPEED';
        this.resWpm.innerHTML      = `${this.peakWpm} <small>WPM</small>`;
        this.resLabel3.textContent = 'ACCURACY';
        this.resAccuracy.textContent = `${accuracy}%`;
        this.resLabel4.textContent = 'PHRASES CLEARED';
        this.resPhrases.textContent  = this.phrasesCompleted;

        if (this.playAgainBtnText) this.playAgainBtnText.textContent = 'STITCH UP & PLAY AGAIN';

        this.updateHighScore();
        this.gameOverModal.classList.remove('hidden');
    }

    triggerSprintResults() {
        this.isPlaying  = false;
        this.isGameOver = true;
        if (this.wpmTimer) clearInterval(this.wpmTimer);

        const elapsedSecs  = this.startTime ? (Date.now() - this.startTime) / 1000 : 0;
        const { accuracy } = this.computeStats();

        // Sprint styling
        this.resultsModalCard.classList.add('sprint-card');
        this.resultsEmblem.className = 'sprint-emblem';
        this.resultsEmblem.innerHTML = `
            <svg class="emblem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>`;

        this.resultsTitle.textContent    = 'SPRINT COMPLETE';
        this.resultsTitle.classList.add('sprint-title');
        this.resultsSubtitle.textContent = 'One phrase conquered. Here are your results.';

        this.resLabel1.textContent   = 'TIME';
        this.resLevel.textContent    = `${elapsedSecs.toFixed(2)}s`;
        this.resLabel2.textContent   = 'SPEED';
        this.resWpm.innerHTML        = `${this.peakWpm} <small>WPM</small>`;
        this.resLabel3.textContent   = 'ACCURACY';
        this.resAccuracy.textContent = `${accuracy}%`;
        this.resLabel4.textContent   = 'ERRORS';
        this.resPhrases.textContent  = this.totalErrors;

        if (this.playAgainBtnText) this.playAgainBtnText.textContent = 'RUN SPRINT AGAIN';

        this.updateHighScore();
        this.gameOverModal.classList.remove('hidden');
    }

    triggerTimerResults() {
        if (this.isGameOver) return;

        this.timerWordsCompleted += this.getCompletedWordsInCurrentPhrase();
        this.isPlaying = false;
        this.isGameOver = true;
        if (this.wpmTimer) clearInterval(this.wpmTimer);
        if (this.heartbeatTimer) clearInterval(this.heartbeatTimer);

        const { accuracy } = this.computeStats();
        this.resultsModalCard.classList.add('sprint-card');
        this.resultsEmblem.className = 'sprint-emblem';
        this.resultsEmblem.innerHTML = `
            <svg class="emblem-svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="13" r="8"></circle>
                <path d="M12 9v4l2.5 1.5M9 2h6M12 2v3"></path>
            </svg>`;

        this.resultsTitle.textContent = "TIME'S UP";
        this.resultsTitle.classList.add('sprint-title');
        this.resultsSubtitle.textContent = `You completed ${this.timerWordsCompleted} ${this.timerWordsCompleted === 1 ? 'word' : 'words'} in 60 seconds.`;
        this.resLabel1.textContent = 'WORDS TYPED';
        this.resLevel.textContent = this.timerWordsCompleted;
        this.resLabel2.textContent = 'PEAK SPEED';
        this.resWpm.innerHTML = `${this.peakWpm} <small>WPM</small>`;
        this.resLabel3.textContent = 'ACCURACY';
        this.resAccuracy.textContent = `${accuracy}%`;
        this.resLabel4.textContent = 'PHRASES COMPLETED';
        this.resPhrases.textContent = this.phrasesCompleted;

        if (this.playAgainBtnText) this.playAgainBtnText.textContent = 'TRY AGAIN';
        this.updateHighScore();
        this.gameOverModal.classList.remove('hidden');
    }

    updateHighScore() {
        if (this.currentMode === 'timer') {
            if (this.timerWordsCompleted > this.highScoreWords) {
                this.highScoreWords = this.timerWordsCompleted;
                localStorage.setItem('knifehand_timer_highscore_words', this.highScoreWords.toString());
            }
            this.bestWpmVal.textContent = this.highScoreWords;
            this.bestScoreUnit.textContent = 'WORDS';
            return;
        }

        if (this.peakWpm > this.highScoreWpm) {
            this.highScoreWpm = this.peakWpm;
            localStorage.setItem('knifehand_highscore_wpm', this.highScoreWpm.toString());
        }
        this.bestWpmVal.textContent = this.highScoreWpm;
        this.bestScoreUnit.textContent = 'WPM';
    }
}

// Start game when DOM is loaded
window.addEventListener('DOMContentLoaded', () => {
    window.game = new KnifeHandGame();
});
