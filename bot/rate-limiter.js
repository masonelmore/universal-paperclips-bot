class RateLimiter {
    constructor(actionPerSecond) {
        this.tokenBucket = new TokenBucket(actionPerSecond, actionPerSecond);
    }

    do(func) {
        if (!this.tokenBucket.tryConsume()) return;

        const success = func();
        if (!success) {
            this.tokenBucket.refundTokens();
        }
        return success
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

    refundTokens(tokens = 1) {
        this.tokens = Math.min(this.capacity, this.tokens + tokens);
    }
}
