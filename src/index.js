import './styles/styles.scss';
import React from 'react';
import ReactDOM from "react-dom/client";
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import ArticlesApp from './apps/ArticlesApp';

const Routing = () => {
  return(
    <Router>
      <Routes>
        <Route exact path="/"  element={<ArticlesApp />} />
        <Route exact path="/articles/"  element={<ArticlesApp />} />
      </Routes>
    </Router>
  )
}

const root = ReactDOM.createRoot(document.getElementById("fromjs"));

root.render(
  <React.StrictMode>
    <Routing />
  </React.StrictMode>,
);

