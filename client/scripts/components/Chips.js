import React from 'react';
import classNames from 'classnames';

import Chip from './Chip';

class Chips extends React.Component {
    constructor(props) {
        super(props);
    }

    handleChipClick(value) {
        if (!this.props.game.gameCycle.deal) {
            this.props.emit('chipClick', { value });
        }
    }

    render() {
        let chipsClass = classNames({
            'chips': true,
            'on-deal': this.props.game.gameCycle.deal
        });
        return (
            <div className={chipsClass}>
                <Chip value={5} {...this.props}/>
                <Chip value={10} {...this.props}/>
                <Chip value={25} {...this.props}/>
                <Chip value={50} {...this.props}/>
                <Chip value={100} {...this.props}/>
            </div>
        );
    }
}

export default Chips;