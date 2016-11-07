import express from 'express';
import path from 'path';
import compression from 'compression';

import getBlackJackGame from './blackjack/BlackJackGame';

const app = express();
const server = app.listen(process.env.PORT || 3000, () => console.log('Running on localhost:3000'));
const io = require('socket.io').listen(server);

const connections = {};

app.use(function (req, res, next) {
    if (req.headers['x-forwarded-proto'] === 'http') {
        next();
    } else {
        res.redirect('http://' + req.hostname + req.url);
    }
});

app.use(compression());
app.use(express.static('dist'));

app.get('/*', function(req, res) {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

io.sockets.on('connection', function(client) {

    connections[client.id] = {
        socket: client,
        id: client.id
    };

    let game = (connections[client.id].game) ? connections[client.id].game : getBlackJackGame();

    client.emit('updateState', game.toJson());
    console.log('Connected: %s clients connected', Object.keys(connections).length);

    client.once('disconnect', function() {
        delete connections[client.id];
        console.log('Client disconnected. %s clients remaining', Object.keys(connections).length);
    });

    client.on('addChip', function(payload) {
        game.addChip(payload.value);
        client.emit('chipAdd', game.toJson());
        console.log('Client: %s. Bet: %s. Cash: %s', client.id, game.toJson().bet, game.toJson().cash);
    });

    client.on('clearBet', function() {
        game.clearBet();
        client.emit('betCleared', game.toJson());
        console.log('Client: %s. Bet cleared.', client.id);
    });

    client.on('lastBet', function() {
        if (game.toJson().lastBet && game.toJson().cash >= game.toJson().lastBet) {
            game.placeLastBet();
            game.deal();
            client.emit('deal', game.toJson());
            console.log('Client: %s. Deal from last bet. Bet: %s.', client.id, game.toJson().lastBet);
        }
    });

    client.on('deal', function() {
        game.deal();
        client.emit('deal', game.toJson());
        console.log('Client: %s. Deal.', client.id,);
        if (game.toJson().result !== 'None') {
            console.log('Client: %s. %s.', client.id, game.toJson().result);
        }
    });

    client.on('doubleBet', function() {
        if (game.toJson().cash >= game.toJson().bet) {
            game.doubleBet();
            client.emit('doubleBet', game.toJson());
            console.log('Client: %s. Double.', client.id);
            if (game.toJson().result !== 'None') {
                console.log('Client: %s. %s.', client.id, game.toJson().result);
            }
        }
    });

    client.on('hit', function() {
        game.hit();
        client.emit('hit', game.toJson());
        console.log('Client: %s. Hit.', client.id);
        if (game.toJson().result !== 'None') {
            console.log('Client: %s. %s.', client.id, game.toJson().result);
        }
    });

    client.on('stay', function() {
        game.stay();
        client.emit('stay', game.toJson());
        console.log('Client: %s. Stay.', client.id);
        if (game.toJson().result !== 'None') {
            console.log('Client: %s. %s.', client.id, game.toJson().result);
        }
    });

    client.on('newBet', function() {
        game.newBet();
        if (!game.toJson().cash && !game.toJson().bet) {
            game.giveMoreCash();
            client.emit('giveMoreCash', game.toJson());
        } else {
            client.emit('newBet', game.toJson());
            console.log('Client: %s. Place your bet.', client.id);
        }
    });

    client.on('getMoreCash', function() {
        game.getMoreCash();
        client.emit('getMoreCash', game.toJson());
    });
});