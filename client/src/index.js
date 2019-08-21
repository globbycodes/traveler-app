import React from 'react';
import ReactDOM from 'react-dom';
import Home from './components/Home';
import * as serviceWorker from './serviceWorker';
import { HashRouter } from 'react-router-dom';

ReactDOM.render(
    <HashRouter>
        <Home />
    </HashRouter>,
    document.getElementById('root'));

serviceWorker.unregister();
