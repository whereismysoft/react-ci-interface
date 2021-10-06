import ReactDom from 'react-dom';

import App from './app'
import Block from './block'

const root = document.getElementById('root')

const ComponentApp = () => {
    return (<div>
        123123444
        <App />
        <Block />
    </div>)
}

ReactDom.render(<ComponentApp />, root);