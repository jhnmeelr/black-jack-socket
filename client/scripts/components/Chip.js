import React from 'react';
import classNames from 'classnames';

import Display from './parts/Display';

class Chip extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            active: false
        };
    }

    handleChipClick(value) {
        if (!this.props.game.gameCycle.deal) {
            this.props.emit('addChip', { value });
        }
    }

    handleChipMouseDown() {
        this.setState({
            active: true
        });
    }

    handleChipMouseUp() {
        this.setState({
            active: false
        });
    }

    render() {
        let chipClass = classNames({
            active: this.state.active
        });
        return (
            <Display If={this.props.game.cash >= this.props.value}>
                <div className="chip-outer-wrap">
                    <span
                        className={ 'chip-inner-wrap chip-' + this.props.value + ' ' + chipClass}
                        onMouseDown={() => this.handleChipMouseDown()}
                        onMouseUp={() => this.handleChipMouseUp()}
                        onMouseLeave={() => this.handleChipMouseUp()}
                        onTouchStart={() => this.handleChipMouseDown()}
                        onTouchEnd={() => this.handleChipMouseUp()}
                        onTouchCancel={() => this.handleChipMouseUp()}
                        onClick={() => this.handleChipClick(this.props.value)}>
                        {this.props.value}
                    </span>
                </div>
            </Display>
        );
    }
}

export default Chip;