import React from 'react';
import io from 'socket.io-client';

// images
import '../../assets/images/background-image.jpg';
import '../../assets/images/body.jpg';
import '../../assets/images/icon.png';
import '../../assets/images/clubs.png';
import '../../assets/images/diamonds.png';
import '../../assets/images/hearts.png';
import '../../assets/images/spades.png';
// fonts
import '../../assets/fonts/TitilliumWeb-Light.ttf';
import '../../assets/fonts/TitilliumWeb-Regular.ttf';
import '../../assets/fonts/TitilliumWeb-Bold.ttf';
// styles
import '../../styles/style.scss';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            connected: false,
            game: {
                bet: 0,
                cash: 0,
                lastBet: 0,
                dealer: {
                    cards: [],
                    score: 0
                },
                player: {
                    cards: [],
                    score: 0
                },
                gameCycle: {
                    placeYourBet: false,
                    deal: false,
                    hit: false,
                    stay: false,
                    newBet: false
                },
                result: 'None'
            }
        };
    }

    componentWillMount() {
        document.ontouchmove = function(event) {
            event.preventDefault();
        };

        this.socket = io('http://black-jack-socket.herokuapp.com/');
        this.socket.on('connect', this.connect.bind(this));
        this.socket.on('disconnect', this.disconnect.bind(this));
        this.socket.on('updateState', this.updateState.bind(this));
        this.socket.on('chipAdd', this.updateState.bind(this));
        this.socket.on('betCleared', this.updateState.bind(this));
        this.socket.on('deal', this.updateState.bind(this));
        this.socket.on('doubleBet', this.updateState.bind(this));
        this.socket.on('hit', this.updateState.bind(this));
        this.socket.on('stay', this.updateState.bind(this));
        this.socket.on('newBet', this.updateState.bind(this));
        this.socket.on('giveMoreCash', this.updateState.bind(this));
        this.socket.on('getMoreCash', this.updateState.bind(this));
    }

    emit(eventName, payload) {
        this.socket.emit(eventName, payload);
    }

    connect() {
        this.setState({ connected: true });
        console.log('Game connected.');
    }

    disconnect() {
        this.setState({ connected: false });
        console.log('Game disconnected from server.');
    }

    updateState(game) {
        this.setState({ game });
    }

    render() {
        return (
            <div className="app-wrap">
                {React.cloneElement(this.props.children,
                    {
                        ...this.state,
                        emit: this.emit.bind(this),
                    }
                )}
            </div>
        );
    }
}

export default App;