import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Board } from './components/board/Board';
import { SprintDetail } from './components/admin/SprintDetail';
import { CreateUser } from './components/board/user/CreateUser';
import { useAdmin } from './models/adminHook';
import { adminContext } from './models/context';

function App() {
  const admin = useAdmin();
  return (
    <div className="App">
      <adminContext.Provider value={admin}>
        <Header />
        <Router>
          <Switch>
            <Route exact path="/">
              <SprintDetail />
            </Route>
            <Route path="/boards/:id/users/:userId">
              <Board />
            </Route>
            <Route path="/boards/:id">
              <CreateUser />
            </Route>
          </Switch>
        </Router>
      </adminContext.Provider>
    </div>
  );
}

export default App;
