(function () {
    console.log('Initializing Paperclips Bot...');

    function waitForGame() {
        if (document.querySelector("#clips")) {
            initBot();
        } else {
            setTimeout(waitForGame, 100);
        }
    }

    function initBot() {
        const game = new Game();
        const updateRate = 5; // milliseconds
        const actionsPerSecond = 30;
        const bot = new Bot(game, updateRate, actionsPerSecond);
        bot.start();
        window.bot = bot;
        addBotControls();
    }

    function addBotControls() {
        // Bot controls
        const controlsDiv = document.createElement('div');
        controlsDiv.id = 'bot-controls';
        controlsDiv.style.cssText = `
            position: absolute;
            bottom: 8px;
            right: 8px;
            background: #000;
            padding: 6px 0px 0px;
            font-family: monospace;
            font-size: 12px;
            color: #ccc;
            display: flex;
            align-items: center;
            gap: 8px;
        `;

        // Bot status
        const statusSpan = document.createElement('span');
        statusSpan.id = 'bot-status';
        statusSpan.textContent = 'Bot: Running';
        statusSpan.style.cssText = `
            margin-right: 8px;
            color: #66ff66;
        `;

        // Start button
        const startBtn = document.createElement('button');
        startBtn.disabled = true;
        startBtn.textContent = '▶ Start';
        startBtn.style.cssText = `
            background: #1a1a1a;
            color: #4CAF50;
            border: 1px solid #4CAF50;
            padding: 6px 12px;
            margin: 0;
            cursor: pointer;
        `;
        startBtn.style.opacity = '0.5';
        startBtn.onmouseover = () => startBtn.style.background = '#2a2a2a';
        startBtn.onmouseout = () => startBtn.style.background = '#1a1a1a';
        startBtn.onclick = () => {
            if (!window.bot.running) {
                window.bot.start();
                statusSpan.textContent = 'Bot: Running';
                statusSpan.style.color = '#66ff66';
                startBtn.disabled = true;
                startBtn.style.opacity = '0.5';
                stopBtn.disabled = false;
                stopBtn.style.opacity = '1';
            }
        };

        // Stop button
        const stopBtn = document.createElement('button');
        stopBtn.textContent = '⏹ Stop';
        stopBtn.style.cssText = `
            background: #1a1a1a;
            color: #f44336;
            border: 1px solid #f44336;
            padding: 6px 12px;
            margin: 0;
            cursor: pointer;
        `;
        stopBtn.onmouseover = () => { if (!stopBtn.disabled) stopBtn.style.background = '#2a2a2a'; };
        stopBtn.onmouseout = () => stopBtn.style.background = '#1a1a1a';
        stopBtn.onclick = () => {
            if (window.bot.running) {
                window.bot.stop();
                statusSpan.textContent = 'Bot: Stopped';
                statusSpan.style.color = '#ff6666';
                startBtn.disabled = false;
                startBtn.style.opacity = '1';
                stopBtn.disabled = true;
                stopBtn.style.opacity = '0.5';
            }
        };

        // Restart button
        const restartBtn = document.createElement('button');
        restartBtn.textContent = '↻ Restart';
        restartBtn.style.cssText = `
            background: #1a1a1a;
            color: #FFC107;
            border: 1px solid #FFC107;
            padding: 6px;
            margin: 0;
            cursor: pointer;
        `;
        restartBtn.onmouseover = () => restartBtn.style.background = '#2a2a2a';
        restartBtn.onmouseout = () => restartBtn.style.background = '#1a1a1a';
        restartBtn.onclick = () => reset();

        controlsDiv.appendChild(statusSpan);
        controlsDiv.appendChild(startBtn);
        controlsDiv.appendChild(stopBtn);
        controlsDiv.appendChild(restartBtn);

        const consoleDiv = document.getElementById('consoleDiv');
        consoleDiv.style.position = 'relative';
        consoleDiv.appendChild(controlsDiv);
    }

    waitForGame();
})();
