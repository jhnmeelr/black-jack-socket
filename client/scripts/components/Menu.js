import React from 'react';
import { Link } from 'react-router';

class Menu extends React.Component {
    constructor(props) {
        super(props)
    }

    render() {
        return (
            <div className="menu-wrap">
                <div className="logo-and-buttons">
                    <div className="logo">
                        <div className="number">21</div>
                        <div className="text">BlackJack</div>
                    </div>
                    <div className="menu-buttons">
                        <Link className="menu-button" to='/board'>Play</Link>
                        <Link className="menu-button" to='/rules'>Rules</Link>
                    </div>
                </div>
            </div>
        );
    }
}

export default Menu;