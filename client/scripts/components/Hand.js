import React from 'react';

import Display from './parts/Display';

class Hand extends React.Component {
    constructor(props) {
        super(props);
    }

    getSuit(card) {
        if (card.suit === 'D') {
            return <div className="suit diamonds"></div>;
        } else if (card.suit === 'C') {
            return <div className="suit clubs"></div>;
        } else if (card.suit === 'S') {
            return <div className="suit spades"></div>;
        } else {
            return <div className="suit hearts"></div>;
        }
    }

    getBodyCard() {
        if (this.props.game.dealer.cards.length === 1) {
            return <div className="card body"></div>;
        }
    }

    getCards(whose) {
        if (whose === 'player') {
            return (
                <div className="cards">
                    {
                        this.props.game.player.cards.map((card, i) => {
                            return (
                                <div key={i} className="card">
                                    <div className="rank">{card.rank}</div>
                                    {this.getSuit(card)}
                                </div>
                            );
                        })
                    }
                </div>
            );
        } else if (whose === 'dealer') {
            return (
                <div className="cards">
                    {
                        this.props.game.dealer.cards.map((card, i) => {
                            return (
                                <div key={i} className="card">
                                    <div className="rank">{card.rank}</div>
                                    {this.getSuit(card)}
                                </div>
                            );
                        })
                    }
                    {this.getBodyCard()}
                </div>
            );
        }
    }

    getScore() {
        if (this.props.whose === 'player') {
            return <div className="score">{this.props.game.player.score}</div>;
        } else if (this.props.whose === 'dealer') {
            return <div className="score">{this.props.game.dealer.score}</div>;
        }
    }

    render() {

        let handClass = 'hand ' + this.props.whose + '-hand';

        return (
            <div className={handClass}>
                {this.getCards(this.props.whose)}
                {this.getScore()}
            </div>
        );
    }
}

export default Hand;