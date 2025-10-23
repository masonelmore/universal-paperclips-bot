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

        window.bot = bot;
        console.log('Bot ready! Use window.bot.start() to begin');
    }

    waitForGame();
})();
