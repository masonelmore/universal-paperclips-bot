class Bot {
    constructor(game, updateRate, actionsPerSecond) {
        this.game = game;
        this.updateRate = updateRate;
        this.tokenBucket = new TokenBucket(actionsPerSecond, actionsPerSecond);
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

        if (this.tokenBucket.tryConsume()) {
            const state = this.game.readState();
            const action = this.decide(state);
            this.log(`executing: ${action}`)
            if (!this.game.executeAction(action)) {
                this.tokenBucket.tokens += 1; // refund token if action failed
            }
        }

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

class TokenBucket {
    constructor(capacity, refillRate) {
        this.capacity = capacity;
        this.refillRate = refillRate;  // tokens per second
        this.tokens = capacity;
        this.lastRefill = Date.now();
    }

    refill() {
        const now = Date.now();
        const elapsed = (now - this.lastRefill) / 1000;
        const tokensToAdd = Math.floor(elapsed * this.refillRate);
        if (tokensToAdd > 0) {
            this.tokens = Math.min(this.capacity, this.tokens + tokensToAdd);
            this.lastRefill = now;
        }
    }

    tryConsume(tokens = 1) {
        this.refill();
        if (this.tokens >= tokens) {
            this.tokens -= tokens;
            return true;
        }
        return false;
    }
}
