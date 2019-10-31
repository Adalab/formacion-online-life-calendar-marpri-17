import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter } from 'react-router-dom';
import './stylesheets/core/index.scss';
import App from './components/App';

ReactDOM.render(<HashRouter ><App /></HashRouter>, document.getElementById('root'));
