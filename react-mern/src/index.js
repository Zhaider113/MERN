// =========================================================
// * Task
// =========================================================

// * The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software. Please contact us to request a removal.

import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Switch } from "react-router-dom";

// core styles
import "./css/index.css";
import "./css/App.css";

// vendor styles
import "react-datetime/css/react-datetime.css";

import HomePage from "./pages/HomePage";
import ScrollToTop from "./components/ScrollToTop";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Router>
    <ScrollToTop />
    <Switch>
      <HomePage />
    </Switch>
  </Router>
);