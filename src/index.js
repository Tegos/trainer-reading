import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

import App from './App';
import Header from './components/Header';

import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App/>, document.getElementById('root'));

ReactDOM.render(<Header name="Tegos"/>, document.getElementById('header'));
ReactDOM.render(<Header/>, document.getElementById('header1'));

registerServiceWorker();
