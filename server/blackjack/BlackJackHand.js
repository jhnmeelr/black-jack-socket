class BlackJackHand {
    constructor() {
        this.cards = [];
    }
    hasCards() {
        return this.cards.length > 0;
    }
    addCard(card) {
        this.cards.push(card);
    }
    numberToSuit(number) {
        let suits = ['C', 'D', 'H', 'S'];
        let index = Math.floor(number / 13);
        return suits[index];
    }
    numberToCard(number) {
        let rank;

        if ((number % 13) + 1 === 1) {
            rank = 'A';
        } else if ((number % 13) + 1 === 11) {
            rank = 'J';
        } else if ((number % 13) + 1 === 12) {
            rank = 'Q';
        } else if ((number % 13) + 1 === 13) {
            rank = 'K';
        } else {
            rank = (number % 13) + 1;
        }

        return {
          rank,
          suit: this.numberToSuit(number)
        };
    }
    getCards() {
        let convertedCards = [];
        for (let i = 0; i < this.cards.length; i++) {
            let number = this.cards[i];
            convertedCards[i] = this.numberToCard(number);
        }
        return convertedCards;
    }
    getCardScore(card) {
        if (card.rank === 'A') {
            return 11;
        } else if (card.rank === 'J' || card.rank === 'Q' || card.rank === 'K') {
            return 10;
        }
        return card.rank;
    }
    getScore() {
        let score = 0;
        let cards = this.getCards();
        let aces = [];
        // Sum all cards excluding aces.
        for (let i = 0; i < cards.length; ++i) {
            let card = cards[i];
            if (card.rank === 'A') {
                aces.push(card);
            } else {
                score = score + this.getCardScore(card);
            }
        }
        // Add aces.
        if (aces.length > 0) {
            let acesScore = aces.length * 11;
            let acesLeft = aces.length;
            while ((acesLeft > 0) && (acesScore + score) > 21) {
                acesLeft = acesLeft - 1;
                acesScore = acesScore - 10;
            }
            score = score + acesScore;
        }
        return score;
    }
    isLose() {
        return this.getScore() > 21;
    }
    isBlackJack() {
        return this.getScore() === 21;
    }
}

const getBlackJackHand = () => {
    return new BlackJackHand();
}

export default getBlackJackHand;