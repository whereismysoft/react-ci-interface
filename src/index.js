import ReactDom from 'react-dom';
import {
    BrowserRouter as Router,
    Switch,
} from "react-router-dom";

import App from './app'

import './main.css'

const root = document.getElementById('app-root')

ReactDom.render(
    <Router>
        <Switch>
            <App />
        </Switch>
    </Router>,
    root
);