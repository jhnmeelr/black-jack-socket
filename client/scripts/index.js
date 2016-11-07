import React from 'react';
import { render } from 'react-dom';
import { Router, Route, IndexRoute, Redirect, browserHistory } from 'react-router';

import App from './components/App';
import Menu from './components/Menu';
import Rules from './components/Rules';
import Board from './components/Board';

const routes = (
    <Route path='/' component={App}>
        <IndexRoute component={Menu} />
        <Route path='/menu' component={Menu} />
        <Route path='/rules' component={Rules} />
        <Route path='/board' component={Board} />
        <Redirect from='*' to='/menu' />
    </Route>
);

render(<Router routes={routes} history={browserHistory} />, document.getElementById('app'));