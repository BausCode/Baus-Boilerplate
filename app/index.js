import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App.jsx';
import '../public/css/app.scss';

console.log('%c App Started', 'color:green');

ReactDOM.render(<App />, document.getElementById('main'));
