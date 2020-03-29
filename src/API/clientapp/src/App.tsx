import React from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Board } from './components/board/Board';
import { SprintDetail } from './components/admin/SprintDetail';

function App() {
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <SprintDetail />
          </Route>
          <Route path="/board">
            <Board />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
