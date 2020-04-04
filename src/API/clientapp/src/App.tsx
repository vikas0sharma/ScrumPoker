import React, { useState } from 'react';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import logo from './logo.svg';
import './App.css';
import Header from './components/common/Header';
import 'bootstrap/dist/css/bootstrap.min.css';

import { Board } from './components/board/Board';
import { SprintDetail } from './components/admin/SprintDetail';
import { CreateUser } from './components/board/user/CreateUser';

function App() {
  const [isAdmin, setAdmin] = useState(false);
  const isAdminHandler = (isAdmin: boolean) => {
    setAdmin(isAdmin);
  };
  return (
    <div className="App">
      <Header />
      <Router>
        <Switch>
          <Route exact path="/">
            <SprintDetail setAdminHandler={isAdminHandler} />
          </Route>
          <Route path="/boards/:id/users/:userId">
            <Board />
          </Route>
          <Route path="/boards/:id">
            <CreateUser isAdmin={isAdmin} />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
