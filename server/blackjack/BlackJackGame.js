import getCards from './BlackJackCards';
import getBlackJackHand from './BlackJackHand';

class BlackJackGame {
    constructor() {
        this.cards = getCards();
        this.dealerHand = getBlackJackHand();
        this.playerHand = getBlackJackHand();
        this.cash = 100;
        this.bet = 0;
        this.lastBet = 0;
        this.result = 'None';
        this.gameCycle = {
            giveMoreCash: false,
            placeYourBet: true,
            deal: false,
            hit: false,
            stay: false,
            newBet: false
        };
    }
    getResultForPlayer() {
        if (this.playerHand.getScore() > 21) {
            return 'Lose';
        } else if (this.playerHand.getScore() === 21) {
            return 'Player has a BlackJack';
        }
        return 'None';
    }
    getResult() {
        if (this.dealerHand.isBlackJack() && !this.playerHand.isBlackJack()) {
            return 'Lose';
        } else if (!this.dealerHand.isBlackJack() && this.playerHand.isBlackJack()) {
            return 'Win'
        } else if (this.dealerHand.isBlackJack() && this.playerHand.isBlackJack()) {
            return 'Push'
        }

        if (this.playerHand.isLose()) {
            return 'Lose';
        } else if (this.dealerHand.isLose()) {
            return 'Win';
        }

        if (this.playerHand.getScore() > this.dealerHand.getScore()) {
            return 'Win';
        } else if (this.playerHand.getScore() === this.dealerHand.getScore()) {
            return 'Push';
        }
        return 'Lose';
    }
    dealerMoves() {
        while (this.dealerHand.getScore() < 17) {
            this.dealerHand.addCard(this.cards.dealNextCard());
        }
        this.result = this.getResult();

        if (this.result === 'Push') {
            this.cash += this.bet;
            this.bet = 0;
        } else if (this.result === 'Win') {
            this.cash += this.bet * 2;
            this.bet = 0;
        } else if (this.result === 'Lose') {
            this.bet = 0;
        }

        this.gameCycle.newBet = true;
    }
    addChip(value) {
        this.cash -= value;
        this.bet += value;
    }
    clearBet() {
        this.cash += this.bet;
        this.bet = 0;
    }
    placeLastBet() {
        // return already bet cash
        this.cash += this.bet;
        // clear current bet
        this.bet = 0;
        // place last bet
        this.cash -= this.lastBet;
        this.bet += this.lastBet;
    }
    deal() {
        this.gameCycle.placeYourBet = false;
        this.gameCycle.deal = true;
        this.dealerHand = getBlackJackHand();
        this.playerHand = getBlackJackHand();
        this.playerHand.addCard(this.cards.dealNextCard());
        this.dealerHand.addCard(this.cards.dealNextCard());
        this.playerHand.addCard(this.cards.dealNextCard());

        if (this.lastBet === 0 || this.lastBet !== this.bet) {
            // clear current last bet
            this.lastBet = 0;
            // set new last bet
            this.lastBet += this.bet;
        } 

        this.result = this.getResultForPlayer();

        if (this.result === 'Lose') {
            this.bet = 0;
            this.gameCycle.newBet = true;
        } else if (this.result === 'Player has a BlackJack') {
            this.dealerMoves();
        }
    }
    doubleBet() {
        this.cash += this.bet;
        this.bet *= 2;
        this.cash -= this.bet;
        this.playerHand.addCard(this.cards.dealNextCard());

        this.result = this.getResultForPlayer();

        if (this.result === 'Lose') {
            this.bet = 0;
            this.gameCycle.newBet = true;
        } else {
            this.dealerMoves();
        }
    }
    hit() {
        this.gameCycle.hit = true;
        this.playerHand.addCard(this.cards.dealNextCard());
        this.result = this.getResultForPlayer();

        if (this.result === 'Lose') {
            this.bet = 0;
            this.gameCycle.newBet = true;
        } else if (this.result === 'Player has a BlackJack') {
            this.dealerMoves();
        }
    }
    stay() {
        this.gameCycle.stay = true;
        this.dealerMoves();
    }
    newBet() {
        this.result = 'None';
        this.gameCycle = {
            giveMoreCash: false,
            placeYourBet: true,
            deal: false,
            hit: false,
            stay: false,
            newBet: false
        };
    }
    giveMoreCash() {
        this.gameCycle.placeYourBet = false;
        this.gameCycle.giveMoreCash = true;
    }
    getMoreCash() {
        this.gameCycle.placeYourBet = true;
        this.gameCycle.giveMoreCash = false;
        this.cash += 100;
    }
    toJson() {
        return {
            cash: this.cash,
            bet: this.bet,
            lastBet: this.lastBet,
            gameCycle: this.gameCycle,
            dealer: {
                cards: this.dealerHand.getCards(),
                score: this.dealerHand.getScore()
            },
            player: {
                cards: this.playerHand.getCards(),
                score: this.playerHand.getScore()
            },
            result: this.result
        };
    }
}

const getBlackJackGame = () => {
    return new BlackJackGame();
}

export default getBlackJackGame;