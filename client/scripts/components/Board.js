import React from 'react';
import { Link } from 'react-router';

import Display from './parts/Display';
import Hand from './Hand';
import Chips from './Chips';
import Buttons from './Buttons';

class Board extends React.Component {
    constructor(props) {
        super(props);
    }

    getMoreCash() {
        this.props.emit('getMoreCash');
    }

    render() {
        return (
            <div className="board-wrap">
                <Link className="pause" to='/menu' />
                <div className="cash">{this.props.game.cash}</div>
                
                <Display If={this.props.game.gameCycle.deal}>
                    <Hand whose={'dealer'} {...this.props} />
                    <Hand whose={'player'} {...this.props} />
                </Display>

                <Display If={this.props.game.gameCycle.placeYourBet && !this.props.game.gameCycle.giveMoreCash}>
                    <div className="place-your-bet">Place Your Bet</div>
                </Display>

                <Display If={this.props.game.gameCycle.giveMoreCash}>
                    <div className="give-more-cash">
                        <div className="message">
                            Take Your Extra<br/>100
                        </div>
                        <div className="button" onClick={() => this.getMoreCash()}>Ok</div>
                    </div>
                </Display>

                <div className="bet">{this.props.game.bet}</div>

                <Chips {...this.props}/>

                <Display If={this.props.game.cash < 5}>
                    <div className="no-chips">No More Chips</div>
                </Display>

                <Buttons {...this.props}/>

                <Display If={this.props.game.gameCycle.newBet}>
                    <Display If={this.props.game.result === 'Lose' || this.props.game.result === 'Dealer has a BlackJack'}>
                        <div className="info">Lose</div>
                    </Display>
                    <Display If={this.props.game.result === 'Win' || this.props.game.result === 'Player has a BlackJack'}>
                        <div className="info">Win</div>
                    </Display>
                    <Display If={this.props.game.result === 'Push'}>
                        <div className="info">Push</div>
                    </Display>
                </Display>

            </div>
        );
    }
}

export default Board;