import React from 'react';
import ReactDOM from 'react-dom';
import '..styles/index.css';
import * as serviceWorker from './serviceWorker';
import Routing from './routers/Router'

ReactDOM.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();