class Bot {
    constructor(game, updateRate, actionsPerSecond) {
        this.game = game;
        this.updateRate = updateRate;
        this.rateLimiter = new RateLimiter(actionsPerSecond);
        this.running = false;
    }

    start() {
        this.running = true;
        this.loop();
    }

    stop() {
        this.running = false;
    }

    loop() {
        if (!this.running) return;

        const state = this.game.readState();
        const action = this.decide(state);
        this.log(`executing: ${action}`)
        this.rateLimiter.do(() => this.game.executeAction(action));

        setTimeout(() => this.loop(), this.updateRate);
    }

    decide(state) {
        const rules = [
            { condition: s => s.demand < 75, action: "lowerPrice" },
            { condition: s => s.demand > 99, action: "raisePrice" },
            { condition: s => s.wire < 50 && s.funds >= s.wireCost, action: "buyWire" },
            { condition: s => true, action: "makePaperclip" },
        ]

        for (let rule of rules) {
            if (rule.condition(state)) {
                return rule.action;
            }
        }
    }

    log(message) {
        console.log(`[bot] ${message}`);
    }

}
