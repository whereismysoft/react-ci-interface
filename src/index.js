import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";
import { createStore } from 'redux'
import { Provider } from 'react-redux'

import { reducer } from 'store/reducer'

import App from './app'

import './main.css'

const store = createStore(reducer)

const root = document.getElementById('app-root')

ReactDom.render(
    <Provider store={store}>
        <Router>
            <Switch>
                <App />
            </Switch>
        </Router>
    </Provider>,
    root
);