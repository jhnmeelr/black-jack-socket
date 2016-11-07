import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
    render() {
        return (
            <div className="rules-wrap">
                <div className="rules">
                    <p>
                        Blackjack is a classic card game that you can enjoy in this app. You'll be taking on the dealer and trying to collect a hand with a value of as close to 21 as possible. Don't go over, though, or you'll lose.
                    </p>
                    <p>
                        Your hand value is the total of all the cards you are holding. Cards 2 to 10 are valued as indicated, face cards are all worth 10 and aces can either be 1 or 11, whichever benefits you the most.
                    </p>
                    <p>
                        The game starts with you making a bet. Then, you'll be dealt two cards face up. From here you have got a few options: - If you want another card to try and get you closer to 21, you 'Hit', - To stick with what you have got, you 'Stay', - To receive just one more card and double your bet, hit 'Double'.
                    </p>
                    <p>
                        If you're dealt an ace and 10 as your first two cards, that's blackjack. This is an automatic win for you unless the dealer gets the same. If this happens, it's called a push and no one wins.
                    </p>
                </div>
                <div className="menu-buttons">
                    <Link className="menu-button" to='/menu'>Back</Link>
                </div>
            </div>
        );
    }
}

export default Menu;