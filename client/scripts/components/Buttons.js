import React from 'react';

import Display from './parts/Display';

class Buttons extends React.Component {
    constructor(props) {
        super(props);
    }

    clearBet() {
        this.props.emit('clearBet');
    }

    lastBet() {
        this.props.emit('lastBet');
    }

    deal() {
        if (this.props.game.bet != 0) {
            this.props.emit('deal');
        }
    }

    getDoubleBetButton() {
        if (!this.props.game.gameCycle.hit) {
            return <button onClick={() => this.doubleBet()}>Double</button>;
        }
    }

    doubleBet() {
        this.props.emit('doubleBet');
    }

    stay() {
        this.props.emit('stay');
    }

    hit() {
        this.props.emit('hit');
    }

    newBet() {
        this.props.emit('newBet');
    }

    render() {
        return (
            <div className="buttons">
                <Display If={this.props.game.gameCycle.placeYourBet}>
                    <button onClick={() => this.clearBet()}>Clear</button>
                    <button onClick={() => this.lastBet()}>Last Bet</button>
                    <button onClick={() => this.deal()}>Deal</button>
                </Display>

                <Display If={this.props.game.gameCycle.deal && !this.props.game.gameCycle.newBet}>
                    {this.getDoubleBetButton()}
                    <button onClick={() => this.stay()}>Stay</button>
                    <button onClick={() => this.hit()}>Hit</button>
                </Display>

                <Display If={this.props.game.gameCycle.newBet}>
                    <button onClick={() => this.newBet()}>New Bet</button>
                </Display>
            </div>
        );
    }
}

export default Buttons;