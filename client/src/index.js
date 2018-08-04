import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Admin from './components/Admin';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route} from 'react-router-dom';

ReactDOM.render((
  <App/>
), document.getElementById('root'));
registerServiceWorker();
