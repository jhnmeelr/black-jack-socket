class BlackJackCards {
    constructor() {
        this.cards = this.getShuffledPack();
        this.currentPackLocation = 0;
    }
    getRandomInt(max) {
        return Math.floor(Math.random() * (max + 1));
    }
    getShuffledPack() {
        let cards = [];
        cards[0] = 0;
        for (let i = 1; i < 52; i++) {
            let j = this.getRandomInt(i);
            cards[i] = cards[j];
            cards[j] = i;
        }
        return cards;
    }
    dealNextCard() {
        if (this.currentPackLocation >= this.cards.length) {
            this.cards = this.getShuffledPack();
            this.currentPackLocation = 0;
        }

        let cardNumber = this.cards[this.currentPackLocation];
        this.currentPackLocation = this.currentPackLocation + 1;
        return cardNumber;
    }
}

const getCards = () => {
    return new BlackJackCards();
}

export default getCards;