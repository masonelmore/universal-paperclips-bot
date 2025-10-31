export class Game {
    constructor() {
        this.state = new GameState();
    }

    readState() {
        this.state.update({
            funds: this.parseNumber("#funds"),
            demand: this.parseNumber("#demand"),
            wire: this.parseNumber("#wire"),
            wireCost: this.parseNumber("#wireCost"),
            paperclips: this.parseNumber("#clips"),
        });
        return this.state;
    }

    parseNumber(selector) {
        const element = document.querySelector(selector);
        if (!element) return 0;

        const text = element.textContent.trim();
        // Remove currency symbols, commas, etc.
        const cleaned = text.replace(/[$,]/g, '');
        return parseFloat(cleaned) || 0;
    }

    executeAction(action) {
        switch (action) {
            case "buyWire":
                return this.clickButton("#btnBuyWire");
            case "makePaperclip":
                return this.clickButton("#btnMakePaperclip");
            case "raisePrice":
                return this.clickButton("#btnRaisePrice");
            case "lowerPrice":
                return this.clickButton("#btnLowerPrice");
            default:
                console.warn(`Unknown action: ${action}`);
                return false
        }
    }

    clickButton(selector) {
        const button = document.querySelector(selector);
        if (button && !button.disabled) {
            button.click();
            return true;
        }
        return false;
    }
}

class GameState {
    constructor() {
        this.funds = 0;
        this.demand
        this.wire = 0;
        this.wireCost = 0;
        this.paperclips = 0;
    }

    update(state) {
        Object.assign(this, state);
    }
}
