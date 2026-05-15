const CONTROL_BOARD_STORAGE_KEY = 'autoworld-control-board';
const CONTROL_BOARD_THEMES = [
    { id: 'black', label: 'BLACK' },
    { id: 'grape', label: 'GRAPE' },
    { id: 'teal', label: 'TEAL' },
    { id: 'berry', label: 'BERRY' },
    { id: 'kiwi', label: 'KIWI' },
    { id: 'dandelion', label: 'DANDELION' },
    { id: 'atomic', label: 'ATOMIC' },
    { id: 'classic-gray', label: 'CLASSIC GRAY' }
];

function getControlBoardThemeIndex() {
    const saved = localStorage.getItem(CONTROL_BOARD_STORAGE_KEY);
    const idx = CONTROL_BOARD_THEMES.findIndex(t => t.id === saved);
    return idx >= 0 ? idx : 0;
}

function applyControlBoardTheme(themeId) {
    const controls = document.getElementById('controls');
    const gameScreen = document.getElementById('game-screen');
    if (!controls || !gameScreen) return;

    CONTROL_BOARD_THEMES.forEach(t => {
        controls.classList.remove(`control-board-${t.id}`);
        gameScreen.classList.remove(`control-board-screen-${t.id}`);
    });

    controls.classList.add(`control-board-${themeId}`);
    gameScreen.classList.add(`control-board-screen-${themeId}`);

    const theme = CONTROL_BOARD_THEMES.find(t => t.id === themeId) || CONTROL_BOARD_THEMES[0];
    const btn = document.getElementById('btn-control-board');
    if (btn) btn.textContent = `CONTROL BOARD: ${theme.label}`;
}

function cycleControlBoard() {
    const next = (getControlBoardThemeIndex() + 1) % CONTROL_BOARD_THEMES.length;
    const themeId = CONTROL_BOARD_THEMES[next].id;
    localStorage.setItem(CONTROL_BOARD_STORAGE_KEY, themeId);
    applyControlBoardTheme(themeId);
}

function initControlBoardSettings() {
    applyControlBoardTheme(CONTROL_BOARD_THEMES[getControlBoardThemeIndex()].id);

    const boardBtn = document.getElementById('btn-control-board');
    if (boardBtn) boardBtn.addEventListener('click', cycleControlBoard);

    const startBtn = document.getElementById('btn-start');
    if (startBtn) {
        startBtn.addEventListener('touchstart', (e) => {
            e.preventDefault();
            if (typeof window.togglePause === 'function') window.togglePause();
        }, { passive: false });
    }
}

document.addEventListener('DOMContentLoaded', initControlBoardSettings);

window.cycleControlBoard = cycleControlBoard;
